import { Hero } from "@/components/landingPage/sections/Hero";
import { HowItWorks } from "@/components/landingPage/sections/HowItWorks";
import { AboutAI } from "@/components/landingPage/sections/AboutAI";
import { Benefits } from "@/components/landingPage/sections/Benefits";
import { Testimonials } from "@/components/landingPage/sections/Testimonials";
import { FAQ } from "@/components/landingPage/sections/FAQ";
import { CtaBanner } from "@/components/landingPage/sections/CtaBanner";
import { Navbar } from "@/components/landingPage/layout/Navbar";
import { Footer } from "@/components/landingPage/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <AboutAI />
      <Benefits />
      <Testimonials />
      <FAQ />
      <CtaBanner />
      <Footer />
    </>
  );
}
