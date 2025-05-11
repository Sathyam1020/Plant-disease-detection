'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, History, Leaf, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="container max-w-6xl py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl py-8 mx-auto">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {session?.user?.name}!
          </h1>
          <p className="mt-2 text-muted-foreground">
            Monitor your plants&#39; health and get instant disease detection
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Camera className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Scan New Plant</h3>
                <p className="text-sm text-muted-foreground">
                  Upload images for instant analysis
                </p>
              </div>
            </div>
            <Button asChild className="w-full mt-4">
              <Link href="/scan">
                Start Scanning
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-500/10">
                <Leaf className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Plant Health</h3>
                <p className="text-sm text-muted-foreground">
                  View your plants&#39; health status
                </p>
              </div>
            </div>
            <Button variant="outline" asChild className="w-full mt-4">
              <Link href="/history">
                View Health Status
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-500/10">
                <History className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Scan History</h3>
                <p className="text-sm text-muted-foreground">
                  View your past plant analyses
                </p>
              </div>
            </div>
            <Button variant="outline" asChild className="w-full mt-4">
              <Link href="/history">
                View History
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h2>
          <Card className="p-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No recent activity. Start by scanning your plants!
              </p>
              <Button asChild className="mt-4">
                <Link href="/scan">
                  Scan Your First Plant
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
