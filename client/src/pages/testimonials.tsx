import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star, ArrowLeft, Quote } from "lucide-react";
import { Link } from "wouter";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const testimonials = [
  {
    id: 1,
    quote: "After my prostate surgery, I was terrified about managing catheters on my own. But Liberator made it so easy - they walked me through everything, handled all my insurance paperwork, and now my supplies arrive right when I need them.",
    name: "Robert M.",
    role: "Catheter Customer since 2023",
    rating: 5,
    initials: "RM",
    category: "First-Time User",
  },
  {
    id: 2,
    quote: "As a caregiver for my mother, I was overwhelmed trying to figure out her medical supply needs. The team at Liberator took that stress away completely. They're patient, knowledgeable, and truly care about helping families like ours.",
    name: "Susan T.",
    role: "Caregiver since 2022",
    rating: 5,
    initials: "ST",
    category: "Caregiver",
  },
  {
    id: 3,
    quote: "Getting an ostomy was life-changing, and honestly scary at first. Liberator helped me find products that actually fit my lifestyle. Now I'm back to hiking, traveling, and living my life with confidence.",
    name: "Michael K.",
    role: "Ostomy Customer since 2021",
    rating: 5,
    initials: "MK",
    category: "Ostomy",
  },
  {
    id: 4,
    quote: "I was so nervous about the cost - I'm on a fixed income and didn't know if Medicare would cover my supplies. The Liberator team handled everything with my insurance. I didn't have to make a single call to Medicare myself. Zero out-of-pocket cost for me!",
    name: "Dorothy H.",
    role: "Incontinence Customer since 2022",
    rating: 5,
    initials: "DH",
    category: "First-Time User",
  },
  {
    id: 5,
    quote: "My father was just diagnosed and needed catheter supplies urgently. I called Liberator on a Friday afternoon, and they had supplies at his door by Monday. They even followed up with his doctor to get the prescription sorted. Incredible service!",
    name: "James L.",
    role: "Caregiver for Father",
    rating: 5,
    initials: "JL",
    category: "Caregiver",
  },
  {
    id: 6,
    quote: "I've been reordering my ostomy supplies through Liberator for 3 years now. They remind me when it's time to reorder, and everything arrives discreetly packaged. I never have to think about it - it just works perfectly every single time.",
    name: "Patricia W.",
    role: "Loyal Customer since 2021",
    rating: 5,
    initials: "PW",
    category: "Reorder",
  },
  {
    id: 7,
    quote: "What I love most is the automatic refill program. I set it up once, and now my incontinence supplies arrive every month like clockwork. No phone calls, no hassle, no running out. It's one less thing I have to worry about.",
    name: "Harold B.",
    role: "Auto-Refill Customer since 2020",
    rating: 5,
    initials: "HB",
    category: "Reorder",
  },
  {
    id: 8,
    quote: "When I first needed catheters, I had no idea where to start. A friend recommended Liberator and I'm so glad she did. They explained all my options, worked with my doctor on the prescription, and even helped me try different products until we found the perfect fit.",
    name: "Margaret C.",
    role: "Catheter Customer since 2023",
    rating: 5,
    initials: "MC",
    category: "First-Time User",
  },
];

const categories = ["All", "First-Time User", "Caregiver", "Reorder", "Ostomy"];

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="py-16 lg:py-24 text-center bg-accent"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Real Stories From Real People
            </h1>
            <p className="text-lg lg:text-xl text-white/90 max-w-2xl mx-auto">
              Hear from customers who trust Liberator Medical for their healthcare needs. 
              Their experiences show why we're rated A+ by the Better Business Bureau.
            </p>
          </div>
        </section>

        {/* Back Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/">
            <Button variant="ghost" className="gap-2" data-testid="button-back-home">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Testimonials Grid */}
        <section className="pb-16 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={testimonial.id}
                  className="bg-white dark:bg-gray-800 border-none shadow-md hover:shadow-lg transition-shadow"
                  data-testid={`card-testimonial-${index}`}
                >
                  <CardContent className="p-6 lg:p-8 relative">
                    {/* Quote Icon */}
                    <Quote
                      className="absolute top-4 right-4 h-8 w-8 opacity-10 text-accent"
                    />

                    {/* Category Badge */}
                    <span
                      className="inline-block text-xs font-semibold px-3 py-1 rounded-full text-white mb-4 bg-primary"
                    >
                      {testimonial.category}
                    </span>

                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <Avatar
                        className="h-12 w-12 border-2 border-accent"
                      >
                        <AvatarFallback
                          className="font-bold text-white bg-accent"
                        >
                          {testimonial.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </div>
                        <div
                          className="text-sm font-medium text-primary"
                        >
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTA Section */}
            <div
              className="mt-16 rounded-2xl p-8 lg:p-12 text-center bg-accent"
            >
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Ready to Experience the Liberator Difference?
              </h2>
              <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
                Join over 500,000 satisfied customers. We handle the paperwork, 
                work with your doctor, and deliver discreetly to your door.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products">
                  <Button
                    className="px-8 py-6 text-lg font-semibold text-white bg-primary hover:opacity-90"
                    data-testid="button-browse-products"
                  >
                    Browse Products
                  </Button>
                </Link>
                <a href="tel:1-877-899-9208">
                  <Button
                    variant="outline"
                    className="px-8 py-6 text-lg font-semibold bg-white/10 border-white text-white hover:bg-white/20"
                    data-testid="button-call-now"
                  >
                    Call 1-877-899-9208
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
