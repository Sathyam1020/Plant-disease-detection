'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle2, ChevronRight, Leaf } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ScanImage {
  id: string;
  imageUrl: string;
  createdAt: string;
}

interface ScanHistory {
  id: string;
  hasDisease: boolean;
  diseaseName?: string;
  plantType: string;
  confidence: number;
  description?: string;
  createdAt: string;
  images: string[];
}

export default function HistoryPage() {
  const [history, setHistory] = useState<ScanHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('/api/history');
        if (!response.ok) {
          throw new Error('Failed to fetch history');
        }
        const data = await response.json();
        setHistory(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch history');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="container max-w-4xl py-8 mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Scan History</h1>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container max-w-4xl py-8 mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Scan History</h1>
          <p className="mt-2 text-destructive">{error}</p>
          <Button asChild className="mt-4">
            <Link href="/scan">Try Again</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="container max-w-4xl py-8 mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Scan History</h1>
          <p className="mt-2 text-muted-foreground">
            No scans found. Start by scanning your plants!
          </p>
          <Button asChild className="mt-4">
            <Link href="/scan">Start Scanning</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-8 mx-auto">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Scan History</h1>
          <Button asChild>
            <Link href="/scan">New Scan</Link>
          </Button>
        </div>

        <div className="space-y-4">
          {history.map((scan) => (
            <Card key={scan.id} className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {scan.hasDisease ? (
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                  ) : (
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                  )}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">
                        {scan.hasDisease ? scan.diseaseName : 'Healthy Plant'}
                      </h2>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Leaf className="h-4 w-4" />
                        <span>{scan.plantType}</span>
                        <span>•</span>
                        <span>{new Date(scan.createdAt).toLocaleString()}</span>
                      </div>
                      {scan.description && (
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                          {scan.description}
                        </p>
                      )}
                    </div>
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/history/${scan.id}`}>
                        View Details
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  {scan.images.length > 0 && (
                    <div className="relative h-32 w-32 overflow-hidden rounded-lg border">
                      <Image
                        src={scan.images[0]}
                        alt="Plant scan"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
