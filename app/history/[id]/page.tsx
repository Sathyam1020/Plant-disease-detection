'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import {useParams, useSearchParams} from "next/navigation";

type ScanResultProps = {
    id: string
}

type ScanResult = {
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
    images: string[]
}

export default function ScanResultPage() {
    const [scanResult, setScanResult] = useState<ScanResult | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const params = useParams()
    const id = params.id
    console.log("Id------:", id);

    useEffect(() => {
        async function fetchScanResult() {
            try {
                const response = await fetch(`/api/scan/${id}`)
                const data = await response.json()

                if (response.ok) {
                    setScanResult(data)
                } else {
                    console.error('Error fetching scan result:', data.error)
                }
            } catch (error) {
                console.error('Error:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchScanResult()
    }, [id])

    if (loading) {
        return <div className="text-center">Loading...</div>
    }

    if (!scanResult) {
        return <div className="text-center">No scan result found</div>
    }

    return (
        <div className="max-w-4xl mx-auto bg-card text-card-foreground shadow-xl rounded-2xl p-6 md:p-8 space-y-6 border border-border transition-colors">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="relative w-full md:w-1/2 aspect-video rounded-xl overflow-hidden border">
                    {/* Displaying all images from the image array */}
                    <div className="grid grid-cols-2 gap-2">
                        {scanResult.images.map((imgSrc, idx) => (
                            <div key={idx} className="relative w-full aspect-video">
                                <Image
                                    src={imgSrc}
                                    alt={`Scan Image ${idx + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col justify-between md:w-1/2">
                    <h2 className="text-2xl font-bold mb-2">{scanResult.plantType || 'Unknown Plant'}</h2>
                    <p className={scanResult.hasDisease ? 'bg-destructive text-destructive-foreground rounded-full p-2' : 'bg-green-500 text-white rounded-2xl p-2'}>
                        {scanResult.hasDisease ? `Disease Detected: ${scanResult.diseaseName}` : 'Healthy Plant'}
                    </p>
                    <p className="text-muted-foreground mt-2">
                        Confidence: <span className="font-semibold">{scanResult.confidence}%</span>
                    </p>
                    {scanResult.description && <p className="mt-3 text-sm">{scanResult.description}</p>}
                </div>
            </div>

            {scanResult.hasDisease && (
                <>
                    {scanResult.causes && scanResult.causes.length > 0 && (
                        <Section title="Causes" items={scanResult.causes} />
                    )}
                    {scanResult.symptoms && scanResult.symptoms.length > 0 && (
                        <Section title="Symptoms" items={scanResult.symptoms} />
                    )}
                    {scanResult.treatment && scanResult.treatment.length > 0 && (
                        <Section title="Treatment Plan" items={scanResult.treatment} />
                    )}
                </>
            )}

            {scanResult.recommendations?.nextSteps && scanResult.recommendations.nextSteps.length > 0 && (
                <Section title="Next Steps" items={scanResult.recommendations.nextSteps} />
            )}
            {scanResult.recommendations?.preventiveTips && scanResult.recommendations.preventiveTips.length > 0 && (
                <Section title="Preventive Tips" items={scanResult.recommendations.preventiveTips} />
            )}
            {scanResult.recommendations?.routineCareTips && scanResult.recommendations.routineCareTips.length > 0 && (
                <Section title="Routine Care Tips" items={scanResult.recommendations.routineCareTips} />
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
