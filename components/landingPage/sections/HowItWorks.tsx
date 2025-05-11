
import { Camera, Cpu, Leaf } from "lucide-react";
import { Section } from "../layout/Section";
import { Container } from "../layout/Container";

const steps = [
  {
    title: "Capture or Upload a Photo",
    description: "Take a clear picture of your plant's affected area.",
    icon: Camera,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  {
    title: "AI Scans for Symptoms",
    description: "Our machine learning model instantly analyzes the image to detect diseases.",
    icon: Cpu,
    iconColor: "text-indigo-500",
    bgColor: "bg-indigo-100",
  },
  {
    title: "Receive Smart Remedies",
    description: "Get tailored treatment suggestions and product recommendations.",
    icon: Leaf,
    iconColor: "text-green-500",
    bgColor: "bg-green-100",
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" >
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Our technology makes plant disease detection simple, fast, and accurate
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center text-center p-6"
            >
              <div className={`flex items-center justify-center h-16 w-16 rounded-full ${step.bgColor} mb-6`}>
                <step.icon className={`h-8 w-8 ${step.iconColor}`} />
              </div>

              {/* Connection lines between steps (only on desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[calc(100%_-_24px)] w-[calc(100%_-_60px)] h-px bg-gray-200" />
              )}

              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
