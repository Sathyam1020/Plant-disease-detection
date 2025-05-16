import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "../layout/Container";
import Link from "next/link";


export function Hero() {
  return (
    <div className="relative overflow-hidden pt-16 pb-8 md:pb-16 lg:pb-24">
      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              <span className="block">AI-Powered Plant</span>
              <span className="block text-primary">Disease Detection</span>
              <span className="block">at Your Fingertips</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-md">
              Simply upload a photo of your plant — our intelligent system will identify the disease and recommend treatment within seconds.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/auth/signin">Scan your plant now</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Learn How It Works
              </Button>
            </div>
          </div>
          <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
            <img
              src="https://images.pexels.com/photos/7656132/pexels-photo-7656132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="AI Plant Analysis Illustration"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-green-500/30 mix-blend-overlay rounded-xl"></div>
          </div>
        </div>
      </Container>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -z-10 transform translate-x-1/2 opacity-20">
        <svg width="404" height="384" fill="none" viewBox="0 0 404 384">
          <defs>
            <pattern id="bedc54bc-7371-44a2-a2bc-dc68d819ae60" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="4" height="4" className="text-muted" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="384" fill="url(#bedc54bc-7371-44a2-a2bc-dc68d819ae60)" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 -z-10 transform -translate-x-1/2 opacity-20">
        <svg width="404" height="384" fill="none" viewBox="0 0 404 384">
          <defs>
            <pattern id="74b3fd99-0a6f-4271-bef2-e80eeafdf357" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="4" height="4" className="text-muted" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="384" fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)" />
        </svg>
      </div>
    </div>
  );
}
