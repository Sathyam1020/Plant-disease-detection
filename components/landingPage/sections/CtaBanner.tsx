import { Button } from "@/components/ui/button";
import { Container } from "../layout/Container";


export function CtaBanner() {
  return (
    <div className="bg-blue-600 py-16">
      <Container>
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join 10,000+ plant lovers using AI to keep their greenery healthy
          </h2>
          <p className="text-blue-100 text-lg max-w-2xl mb-8">
            From backyard gardens to commercial farms, our plant disease detection helps growers of all levels save time, money, and plants.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
            Get Started Free
          </Button>
        </div>
      </Container>
    </div>
  );
}
