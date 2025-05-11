"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section } from "../layout/Section";
import { Container } from "../layout/Container";

const faqItems = [
  {
    question: "Is it free to use?",
    answer: "Yes, our basic plant disease detection service is completely free to use. We offer premium features for professional growers with additional needs like historical tracking and batch processing."
  },
  {
    question: "What plants does it support?",
    answer: "Our AI currently recognizes diseases for over 30 common plants including tomatoes, potatoes, peppers, corn, wheat, apples, grapes, strawberries, citrus, roses, and many common houseplants. We're constantly expanding our database."
  },
  {
    question: "How accurate is it?",
    answer: "Our AI has a 95% accuracy rate in controlled tests for the most common plant diseases. The accuracy depends on image quality and whether the disease is in our database. We're continuously improving with each scan."
  },
  {
    question: "Can I use it offline?",
    answer: "Currently, an internet connection is required for analysis since the AI processing happens on our secure cloud servers. We're exploring options for a limited offline mode in the future."
  },
  {
    question: "How do I take the best photo for analysis?",
    answer: "For best results, take photos in natural daylight, focus clearly on the affected area, ensure the image isn't blurry, and include both healthy and diseased parts of the plant for comparison."
  },
  {
    question: "Is my data private and secure?",
    answer: "Absolutely. We take data privacy seriously. Your plant images are only used to provide you with analysis results and, with your permission, to improve our AI models. We never share your personal information with third parties."
  }
];

export function FAQ() {
  return (
    <Section id="faq" className="bg-muted/50">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about our plant disease detection service
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium text-foreground">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </Section>
  );
}
