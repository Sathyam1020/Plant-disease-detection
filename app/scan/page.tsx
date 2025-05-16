'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Camera, Upload, Loader2, CheckCircle2, AlertCircle, X } from 'lucide-react';
import Image from 'next/image';
import { Alert, AlertDescription } from '@/components/ui/alert';
import UploadForm from "@/app/scan/components/UploadForm";
import ScanResults from "@/app/scan/components/result";

type Step = 'upload' | 'analyzing' | 'results';

interface ImagePreview {
  file: File;
  preview: string;
}

export default function ScanPage() {
  const [step, setStep] = useState<Step>('upload');
  const [images, setImages] = useState<ImagePreview[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string>('');
  const [result, setResults] = useState<any>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Check file size for each image
    const invalidFiles = files.filter(file => file.size > 5 * 1024 * 1024); // 5MB limit
    if (invalidFiles.length > 0) {
      setError('Some images exceed the 5MB size limit');
      return;
    }

    // Create preview URLs for new images
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    setImages(prev => [...prev, ...newImages]);
    setError('');
  };

  const removeImage = (index: number) => {
    setImages(prev => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview); // Clean up the preview URL
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) {
      setError('Please select at least one image');
      return;
    }

    setIsAnalyzing(true);
    setStep('analyzing');

    try {
      const formData = new FormData();
      images.forEach(image => {
        formData.append('images', image.file);
      });

      console.log('Sending request to /api/analyze');
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('Received response:', data);

      if (!response.ok) {
        throw new Error(data.error || data.details || 'Failed to analyze images');
      }

      if (!data.id) {
        throw new Error('Invalid response: missing scan result ID');
      }
      setResults(data);
    } catch (err) {
      console.error('Scan error:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze images. Please try again.');
      setStep('upload');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    result ? (
        <ScanResults
            image={result?.images}
            confidence={result?.confidence}
            hasDisease={result?.hasDisease}
            plantType={result?.plantType}
            recommendations={result?.recommendations}
            causes={result?.causes}
            description={result?.description}
            diseaseName={result?.diseaseName}
            symptoms={result?.symptoms}
            treatment={result?.treatment}
        />
    ) : (
        <UploadForm
            images={images}
            isAnalyzing={isAnalyzing}
            error={error}
            onImageChange={handleImageChange}
            onSubmit={handleSubmit}
            onRemoveImage={removeImage}
            step={step}
        />
    )
  );
}
