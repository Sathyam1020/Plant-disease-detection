import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const image = formData.get('image') as File;

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    // Convert image to base64
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');

    // Call OpenAI API for analysis
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this plant image for diseases. Provide a detailed response including: 1) The disease name (if any), 2) Confidence level (0-1), 3) Description of the disease, 4) Treatment steps, and 5) Prevention tips. If the plant appears healthy, indicate that and provide general care tips."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${image.type};base64,${base64Image}`
              }
            }
          ]
        }
      ],
      max_tokens: 1000
    });

    // Parse the response
    const analysis = response.choices[0].message.content;
    if (!analysis) {
      throw new Error('No analysis received from OpenAI');
    }

    // Extract information from the analysis
    const diseaseMatch = analysis.match(/Disease:\s*([^\n]+)/i);
    const confidenceMatch = analysis.match(/Confidence:\s*([0-9.]+)/i);
    const descriptionMatch = analysis.match(/Description:\s*([^\n]+)/i);
    const treatmentMatch = analysis.match(/Treatment:\s*([\s\S]+?)(?=Prevention:|$)/i);
    const preventionMatch = analysis.match(/Prevention:\s*([\s\S]+?)(?=$)/i);

    const result = {
      disease: diseaseMatch ? diseaseMatch[1].trim() : 'Healthy',
      confidence: confidenceMatch ? parseFloat(confidenceMatch[1]) : 1.0,
      description: descriptionMatch ? descriptionMatch[1].trim() : 'Plant appears healthy',
      treatment: treatmentMatch
        ? treatmentMatch[1].split('\n')
            .map(step => step.trim())
            .filter(step => step && !step.startsWith('-'))
        : ['No treatment needed'],
      prevention: preventionMatch
        ? preventionMatch[1].split('\n')
            .map(step => step.trim())
            .filter(step => step && !step.startsWith('-'))
        : ['Continue regular plant care'],
      image: `data:${image.type};base64,${base64Image}`
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze image' },
      { status: 500 }
    );
  }
}
