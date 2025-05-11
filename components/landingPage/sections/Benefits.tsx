import { AlertTriangle, Smartphone, Clock, Users, BarChart, Leaf } from "lucide-react";
import { Section } from "../layout/Section";
import { Container } from "../layout/Container";

const benefitItems = [
  {
    title: "Prevent plant loss early",
    description: "Detect diseases before they spread and cause irreversible damage to your plants.",
    icon: AlertTriangle,
    iconColor: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    title: "Fast & accurate AI analysis",
    description: "Get precise disease identification and treatment recommendations in seconds.",
    icon: Clock,
    iconColor: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Built for farmers & gardeners",
    description: "Designed with input from professional growers and home gardening enthusiasts.",
    icon: Users,
    iconColor: "text-green-600",
    bgColor: "bg-green-100 dark:bg-green-900/20",
  },
  {
    title: "Simple, mobile-friendly interface",
    description: "Use our tool on any device, wherever you are in your garden or field.",
    icon: Smartphone,
    iconColor: "text-purple-500",
    bgColor: "bg-purple-100 dark:bg-purple-900/20",
  },
  {
    title: "Track plant health over time",
    description: "Monitor the effectiveness of treatments with our progress tracking system.",
    icon: BarChart,
    iconColor: "text-amber-500",
    bgColor: "bg-amber-100 dark:bg-amber-900/20",
  },
  {
    title: "No app download required",
    description: "Access all features directly through your web browser without installation.",
    icon: Leaf,
    iconColor: "text-teal-500",
    bgColor: "bg-teal-100 dark:bg-teal-900/20",
  },
];

export function Benefits() {
  return (
    <Section id="benefits" className="">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Why Use This Tool?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered solution gives you the edge in plant care
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefitItems.map((item, index) => (
            <div
              key={index}
              className="bg-card rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md hover:translate-y-[-4px] border border-border"
            >
              <div className={`h-12 w-12 rounded-full ${item.bgColor} flex items-center justify-center mb-5`}>
                <item.icon className={`h-6 w-6 ${item.iconColor}`} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
