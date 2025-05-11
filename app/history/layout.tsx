import { Navbar } from '@/components/landingPage/layout/Navbar';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

export default async function HistoryLayout({
  children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession();

    if (!session) {
        redirect('/auth/signin');
    }

    return (
        <div className="min-h-screen">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
}
