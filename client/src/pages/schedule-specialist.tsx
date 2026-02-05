import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Phone, 
  Calendar, 
  Clock, 
  User, 
  Mail,
  CheckCircle,
  Headphones,
  Heart,
  Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
];

const topics = [
  { value: "new-patient", label: "I'm new and need help getting started" },
  { value: "product-questions", label: "Questions about products" },
  { value: "insurance", label: "Insurance and billing questions" },
  { value: "reorder", label: "Help with reordering" },
  { value: "other", label: "Other" },
];

const specialists = [
  { name: "Sarah M.", title: "Patient Care Specialist", years: 8, image: "S" },
  { name: "Michael R.", title: "Product Consultant", years: 12, image: "M" },
  { name: "Jennifer L.", title: "Insurance Coordinator", years: 6, image: "J" },
];

export default function ScheduleSpecialist() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    topic: "",
    notes: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date || !formData.time || !formData.topic) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  // Generate next 14 days for date selection
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push({
          value: date.toISOString().split("T")[0],
          label: date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
        });
      }
    }
    return dates;
  };

  const availableDates = getAvailableDates();

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 py-16">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div 
              className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ backgroundColor: "#22c55e" }}
            >
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Your Call is Scheduled!</h1>
            <p className="text-muted-foreground mb-8">
              We've confirmed your appointment. You'll receive a confirmation email shortly.
            </p>
            
            <Card className="text-left mb-8">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Date</p>
                    <p className="text-muted-foreground">
                      {new Date(formData.date).toLocaleDateString("en-US", { 
                        weekday: "long", month: "long", day: "numeric", year: "numeric" 
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Time</p>
                    <p className="text-muted-foreground">{formData.time} (Eastern Time)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">We'll call you at</p>
                    <p className="text-muted-foreground">{formData.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => window.location.href = "/"}
                variant="outline"
              >
                Return Home
              </Button>
              <Button 
                onClick={() => window.location.href = "/products"}
                className="text-white bg-primary hover:opacity-90"
              >
                Browse Products
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-12 md:py-16 bg-accent">
          <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-6">
              <Headphones className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Talk to a Product Specialist
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Get personalized guidance from our expert team. We'll help you find the right 
              products, answer your questions, and handle all the insurance details.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Schedule Your Free Consultation</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Contact Info */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Smith"
                          required
                          data-testid="input-schedule-name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          Phone Number *
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="(555) 123-4567"
                          required
                          data-testid="input-schedule-phone"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        data-testid="input-schedule-email"
                      />
                    </div>

                    {/* Date & Time */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          Preferred Date *
                        </Label>
                        <Select
                          value={formData.date}
                          onValueChange={(value) => setFormData({ ...formData, date: value })}
                        >
                          <SelectTrigger data-testid="select-schedule-date">
                            <SelectValue placeholder="Select a date" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableDates.map((date) => (
                              <SelectItem key={date.value} value={date.value}>
                                {date.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          Preferred Time *
                        </Label>
                        <Select
                          value={formData.time}
                          onValueChange={(value) => setFormData({ ...formData, time: value })}
                        >
                          <SelectTrigger data-testid="select-schedule-time">
                            <SelectValue placeholder="Select a time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Topic */}
                    <div>
                      <Label className="mb-2 block">What would you like to discuss? *</Label>
                      <Select
                        value={formData.topic}
                        onValueChange={(value) => setFormData({ ...formData, topic: value })}
                      >
                        <SelectTrigger data-testid="select-schedule-topic">
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                        <SelectContent>
                          {topics.map((topic) => (
                            <SelectItem key={topic.value} value={topic.value}>
                              {topic.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Notes */}
                    <div>
                      <Label htmlFor="notes" className="mb-2 block">
                        Additional Notes (Optional)
                      </Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Tell us more about what you need help with..."
                        rows={4}
                        data-testid="input-schedule-notes"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full text-white bg-primary hover:opacity-90"
                      data-testid="button-schedule-submit"
                    >
                      {isSubmitting ? "Scheduling..." : "Schedule My Call"}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      All times are Eastern Time (ET). We'll call you at the number provided.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Meet Our Team */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Meet Our Specialists</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {specialists.map((specialist, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold bg-accent"
                      >
                        {specialist.image}
                      </div>
                      <div>
                        <p className="font-medium">{specialist.name}</p>
                        <p className="text-sm text-muted-foreground">{specialist.title}</p>
                        <p className="text-xs text-muted-foreground">{specialist.years} years experience</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Why Call */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Why Talk to a Specialist?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Heart className="w-5 h-5 mt-0.5 text-primary" />
                    <div>
                      <p className="font-medium">Personalized Guidance</p>
                      <p className="text-sm text-muted-foreground">Get product recommendations tailored to your needs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 mt-0.5 text-primary" />
                    <div>
                      <p className="font-medium">Insurance Help</p>
                      <p className="text-sm text-muted-foreground">We handle all the paperwork for you</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 mt-0.5 text-primary" />
                    <div>
                      <p className="font-medium">No Wait Times</p>
                      <p className="text-sm text-muted-foreground">We call you at your scheduled time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Call Now */}
              <Card className="text-white bg-accent">
                <CardContent className="p-6 text-center">
                  <Phone className="w-8 h-8 mx-auto mb-3" />
                  <p className="font-medium mb-1">Need help now?</p>
                  <p className="text-2xl font-bold mb-2">1-877-899-9208</p>
                  <p className="text-sm text-white/80">Mon-Fri 8am-8pm ET</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
