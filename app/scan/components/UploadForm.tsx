import React from 'react';
import {Card} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import Image from "next/image";
import {AlertCircle, Camera, CheckCircle2, Loader2, Upload, X} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {Button} from "@/components/ui/button";


interface ImagePreview {
    file: File;
    preview: string;
}

interface UploadFormProps {
    images: ImagePreview[];
    isAnalyzing: boolean;
    error: string;
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    onRemoveImage: (index: number) => void;
    step: string;
}

const UploadForm = ({
    images,
    isAnalyzing,
    error,
    onImageChange,
    onSubmit,
    onRemoveImage,
    step
}: UploadFormProps) => {
    return (
        <div>
            <div className="container max-w-4xl py-8 mx-auto">
                <div className="space-y-8">
                    {/* Header */}
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-foreground">Scan Your Plant</h1>
                        <p className="mt-2 text-muted-foreground">
                            Upload one or more clear images of your plant for instant disease detection
                        </p>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex items-center justify-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                step === 'upload' ? 'bg-primary text-primary-foreground' :
                                    step === 'analyzing' || step === 'results' ? 'bg-primary/20 text-primary' :
                                        'bg-muted text-muted-foreground'
                            }`}>
                                1
                            </div>
                            <span className="text-sm font-medium text-foreground">Upload</span>
                        </div>
                        <div className="h-0.5 w-16 bg-border" />
                        <div className="flex items-center gap-2">
                            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                step === 'analyzing' ? 'bg-primary text-primary-foreground' :
                                    step === 'results' ? 'bg-primary/20 text-primary' :
                                        'bg-muted text-muted-foreground'
                            }`}>
                                2
                            </div>
                            <span className="text-sm font-medium text-foreground">Analyzing</span>
                        </div>
                        <div className="h-0.5 w-16 bg-border" />
                        <div className="flex items-center gap-2">
                            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                step === 'results' ? 'bg-primary text-primary-foreground' :
                                    'bg-muted text-muted-foreground'
                            }`}>
                                3
                            </div>
                            <span className="text-sm font-medium text-foreground">Results</span>
                        </div>
                    </div>

                    {/* Upload Form */}
                    <Card className="p-6">
                        <form onSubmit={onSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="images">Plant Images</Label>
                                <div className="flex flex-col items-center justify-center gap-4">
                                    {images.length > 0 ? (
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
                                            {images.map((image, index) => (
                                                <div key={index} className="relative aspect-square rounded-lg border overflow-hidden group">
                                                    <Image
                                                        src={image.preview}
                                                        alt={`Plant preview ${index + 1}`}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => onRemoveImage(index)}
                                                        className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            ))}
                                            <div
                                                className="flex aspect-square flex-col items-center justify-center rounded-lg border border-dashed bg-muted/50 hover:bg-muted/70 transition-colors cursor-pointer"
                                                onClick={() => document.getElementById('images')?.click()}
                                            >
                                                <Camera className="h-8 w-8 text-muted-foreground" />
                                                <p className="mt-2 text-sm text-muted-foreground">
                                                    Add more images
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            className="flex h-64 w-full flex-col items-center justify-center rounded-lg border border-dashed bg-muted/50 hover:bg-muted/70 transition-colors cursor-pointer"
                                            onClick={() => document.getElementById('images')?.click()}
                                        >
                                            <Camera className="h-12 w-12 text-muted-foreground" />
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                Click to upload or drag and drop
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                PNG, JPG up to 5MB
                                            </p>
                                        </div>
                                    )}
                                    <Input
                                        id="images"
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={onImageChange}
                                        className="hidden"
                                    />
                                </div>
                            </div>

                            {error && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={images.length === 0 || isAnalyzing}
                            >
                                {isAnalyzing ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Analyzing...
                                    </>
                                ) : (
                                    <>
                                        <Upload className="mr-2 h-4 w-4" />
                                        Start Analysis
                                    </>
                                )}
                            </Button>
                        </form>
                    </Card>

                    {/* Tips */}
                    <Card className="p-6 bg-muted/50">
                        <h3 className="font-semibold text-foreground mb-2">Tips for Best Results</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                                <span>Ensure good lighting for clear visibility</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                                <span>Focus on the affected area of the plant</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                                <span>Keep the image steady and well-focused</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                                <span>Upload multiple angles for better analysis</span>
                            </li>
                        </ul>
                    </Card>
                </div>
            </div>
            {isAnalyzing && (
                <div className="fixed inset-0 z-50 bg-white/70 backdrop-blur-sm flex items-center justify-center">
                    <Loader2 className="h-10 w-10 animate-spin text-gray-700" />
                </div>
            )}
        </div>
    );
};

export default UploadForm;