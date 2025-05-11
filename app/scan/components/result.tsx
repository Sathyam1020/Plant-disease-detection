'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

type PlantHealthProps = {
    hasDisease: boolean
    diseaseName?: string | null
    plantType: string
    confidence: number
    description?: string | null
    causes?: string[]
    symptoms?: string[]
    treatment?: string[]
    recommendations: {
        nextSteps?: string[]
        preventiveTips?: string[]
        routineCareTips?: string[]
    }
    image: string[]
}

export default function PlantHealthCard({
    hasDisease,
    diseaseName,
    plantType,
    confidence,
    description,
    causes = [],
    symptoms = [],
    treatment = [],
    recommendations,
    image,
}: PlantHealthProps) {
    return (
        <div className="max-w-4xl mx-auto bg-card text-card-foreground shadow-xl rounded-2xl p-6 md:p-8 space-y-6 border border-border transition-colors">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="relative w-full md:w-1/2 aspect-video rounded-xl overflow-hidden border">
                    {/* Displaying all images from the image array */}
                    <div className="grid grid-cols-2 gap-2">
                        {image.map((imgSrc, idx) => (
                            <div key={idx} className="relative w-full aspect-video">
                                <Image
                                    src={imgSrc}
                                    alt={`Plant Image ${idx + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col justify-between md:w-1/2">
                    <h2 className="text-2xl font-bold mb-2">{plantType || 'Unknown Plant'}</h2>
                    <p className={cn('text-sm font-medium px-3 py-1 rounded-full w-fit', hasDisease ? 'bg-destructive text-destructive-foreground' : 'bg-green-500 text-white')}>
                        {hasDisease ? `Disease Detected: ${diseaseName}` : 'Healthy Plant'}
                    </p>
                    <p className="text-muted-foreground mt-2">
                        Confidence: <span className="font-semibold">{confidence}%</span>
                    </p>
                    {description && <p className="mt-3 text-sm">{description}</p>}
                </div>
            </div>

            {hasDisease && (
                <>
                    {causes.length > 0 && (
                        <Section title="Causes" items={causes} />
                    )}
                    {symptoms.length > 0 && (
                        <Section title="Symptoms" items={symptoms} />
                    )}
                    {treatment.length > 0 && (
                        <Section title="Treatment Plan" items={treatment} />
                    )}
                </>
            )}

            {(recommendations?.nextSteps ?? []).length > 0 && (
                <Section title="Next Steps" items={recommendations.nextSteps!} />
            )}
            {(recommendations?.preventiveTips ?? []).length > 0 && (
                <Section title="Preventive Tips" items={recommendations.preventiveTips!} />
            )}
            {(recommendations?.routineCareTips ?? []).length > 0 && (
                <Section title="Routine Care Tips" items={recommendations.routineCareTips!} />
            )}
        </div>
    )
}

function Section({ title, items }: { title: string; items: string[] }) {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
                {items.map((item, idx) => (
                    <li key={idx} className="text-foreground">{item}</li>
                ))}
            </ul>
        </div>
    )
}
