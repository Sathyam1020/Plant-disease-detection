
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { Section } from "../layout/Section";
import { Container } from "../layout/Container";

const testimonials = [
  {
    quote: "I thought my tomato plants were dying, but this tool identified early blight and suggested a treatment that saved my entire crop!",
    author: "Sarah Johnson",
    role: "Home Gardener",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    stars: 5
  },
  {
    quote: "As a small-scale farmer, this tool has been invaluable. I used to guess what was wrong with my plants, but now I trust AI to tell me exactly what's happening.",
    author: "Michael Chen",
    role: "Organic Farmer",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    stars: 5
  },
  {
    quote: "The speed and accuracy of the disease detection is impressive. It's like having a plant pathologist in my pocket at all times.",
    author: "Emily Rodriguez",
    role: "Horticultural Therapist",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    stars: 4
  }
];

export function Testimonials() {
  return (
    <Section>
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Success Stories
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from plant lovers who&#39;ve saved their greenery with our technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonial.stars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <p className="text-gray-700 italic mb-6 flex-grow">{testimonial.quote}</p>

              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full overflow-hidden mr-4 relative">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
