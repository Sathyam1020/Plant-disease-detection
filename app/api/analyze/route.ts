import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import cloudinary from '@/lib/cloudinary';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

async function fileToBase64(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  return buffer.toString('base64');
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const email = session.user.email;

    // Ensure user exists
    let dbUser = await prisma.user.findUnique({ where: { email } });
    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          email,
          name: session.user.name || null,
          image: session.user.image || null,
        },
      });
    }

    const formData = await request.formData();
    const images = formData.getAll('images') as File[];

    if (!images || images.length === 0) {
      return NextResponse.json({ error: 'No images provided' }, { status: 400 });
    }

    // Use only the first image (Gemini limitation)
    const base64Image = await fileToBase64(images[0]);

    // Analyze with Gemini
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: 'image/jpeg', // Adjust if needed
          data: base64Image,
        },
      },
      {
        text: `Please Carefully analyze the plant image and give a comprehensive diagnosis of the plant’s health. Respond ONLY with a raw JSON object with this structure:

{
  hasDisease: boolean,
  diseaseName?: string,
  plantType: string,
  confidence: number, in percentage
  description?: string,
  causes?: string[],
  symptoms?: string[],
  treatment?: string[],
  recommendations: {
    nextSteps?: string[],
    preventiveTips?: string[],
    routineCareTips?: string[]
  },
  timestamp: string
}`,
      },
    ]);

    const geminiResponse = await result.response;
    const rawContent = geminiResponse.text();
    console.log("Gemini raw output:", rawContent);

    const cleanJson = rawContent?.replace(/```(?:json)?\s*([\s\S]*?)\s*```/, '$1');
    const consolidatedAnalysis = JSON.parse(cleanJson || '{}');

    // Upload all images to Cloudinary (optional but useful for DB storage)
    const uploadPromises = images.map(async (image) => {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      return new Promise<{ secure_url: string }>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ resource_type: 'image' }, (error: any, result: any) => {
            if (error || !result) reject(error);
            else resolve(result as any);
          })
          .end(buffer);
      });
    });

    const uploadResults = await Promise.all(uploadPromises);
    const imageUrls = uploadResults.map(result => result.secure_url);

    const scanResult = await prisma.scanResult.create({
      data: {
        userId: dbUser.id,
        hasDisease: consolidatedAnalysis.hasDisease,
        diseaseName: consolidatedAnalysis.diseaseName || null,
        plantType: consolidatedAnalysis.plantType,
        confidence: consolidatedAnalysis.confidence,
        description: consolidatedAnalysis.description || null,
        causes: consolidatedAnalysis.causes || [],
        symptoms: consolidatedAnalysis.symptoms || [],
        treatment: consolidatedAnalysis.treatment || [],
        recommendations: consolidatedAnalysis.recommendations || {},
        images: imageUrls,
      },
    });

    return NextResponse.json({
      id: scanResult.id,
      hasDisease: scanResult.hasDisease,
      diseaseName: scanResult.diseaseName,
      plantType: scanResult.plantType,
      confidence: scanResult.confidence,
      description: scanResult.description,
      causes: scanResult.causes,
      symptoms: scanResult.symptoms,
      treatment: scanResult.treatment,
      recommendations: scanResult.recommendations,
      images: scanResult.images,
      createdAt: scanResult.createdAt,
    });

  } catch (error) {
    console.error('Gemini Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to analyze image with Gemini',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
