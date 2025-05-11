import Image from "next/image";
import { Check } from "lucide-react";
import { Section } from "../layout/Section";
import { Container } from "../layout/Container";

const features = [
  "Trained on thousands of real-world plant disease images",
  "Uses deep learning & computer vision",
  "Identifies 50+ common plant diseases",
  "Provides precise treatment recommendations",
  "Continuously improving via user feedback",
  "95% accuracy in controlled tests"
];

export function AboutAI() {
  return (
    <Section id="technology">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[350px] md:h-[450px] rounded-xl overflow-hidden order-1 lg:order-1">
            <img
              src="https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="AI Neural Network Visualization"
              className="object-cover"
              style={{ maxWidth: "100%", height: "auto" }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 mix-blend-overlay rounded-xl"></div>
          </div>

          <div className="order-2 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              About Our AI Technology
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Our advanced deep learning algorithms can identify plant diseases with remarkable accuracy. We've built a system that gets smarter with every scan.
            </p>

            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="ml-3 text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
