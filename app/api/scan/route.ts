import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import cloudinary from '@/lib/cloudinary';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    console.log('Session:', session);

    // Check if the user is authenticated
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const email = session.user.email;

    // Check if the user exists in the database or create a new user
    let dbUser = await prisma.user.findUnique({
      where: { email },
    });

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

    // Ensure images are provided
    if (!images || images.length === 0) {
      return NextResponse.json({ error: 'No images provided' }, { status: 400 });
    }

    // Upload images to Cloudinary
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

    // Send all image URLs to OpenAI for analysis
    const analysisResponse = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "user",
          content: `Please analyze the provided plant images and give a single comprehensive analysis of the plant health based on all images combined.
            If any disease or health issues are found, provide detailed information about the disease, including its name, causes, symptoms, and suggested treatments.
            If no disease is found, provide a clear explanation of the plant's current healthy state and general care recommendations.
            Respond ONLY with a raw JSON object. Do NOT include markdown code block formatting.
            The structure should be:
            {
              hasDisease: boolean,
              diseaseName?: string,
              plantType: string,
              confidence: number,
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
            }`
        },
        {
          role: "system",
          content: `Analyze the following images for plant health and disease information:
                    ${imageUrls.join(', ')}`
        }
      ],
      max_tokens: 1000,
    });

    const content = analysisResponse.choices[0].message.content;

    // Extracting the raw JSON from the response
    const cleanJson = content?.replace(/```(?:json)?\s*([\s\S]*?)\s*```/, '$1');
    console.log('Raw OpenAI response:', content);
    console.log('Cleaned JSON:', cleanJson);

    const consolidatedAnalysis = JSON.parse(cleanJson || '{}');
    console.log('Parsed analysis:', consolidatedAnalysis);

    // Save the analysis to the database
    try {
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

      console.log('Successfully created scan result:', scanResult);

      // Return the saved data
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
        createdAt: scanResult.createdAt
      });
    } catch (error) {
      console.error('Database Error:', error);
      throw error; // Re-throw to be caught by the outer try-catch
    }

  } catch (error) {
    console.error('Scan Error:', error);
    return NextResponse.json({
      error: 'Failed to analyze image',
      details: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
