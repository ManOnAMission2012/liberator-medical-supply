import { useState } from "react";
import { Link } from "wouter";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  Heart, 
  Users, 
  Compass, 
  Clock, 
  ArrowRight,
  Search,
  Calendar
} from "lucide-react";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  featured?: boolean;
}

const articles: Article[] = [
  {
    id: "living-with-confidence",
    title: "Living with Confidence: Your Guide to Independence with Medical Supplies",
    excerpt: "Discover how the right medical supplies can help you maintain your active lifestyle. From travel tips to daily routines, learn how thousands of people just like you are living life on their terms.",
    category: "Lifestyle",
    readTime: "5 min read",
    date: "December 15, 2024",
    image: "lifestyle",
    featured: true,
  },
  {
    id: "caregiver-guide",
    title: "A Caregiver's Guide: Supporting Your Loved One with Dignity",
    excerpt: "Caring for a family member is an act of love. Learn practical tips for managing medical supplies, maintaining routines, and ensuring comfort while preserving your loved one's independence.",
    category: "Caregiving",
    readTime: "7 min read",
    date: "December 10, 2024",
    image: "caregiving",
  },
  {
    id: "choosing-right-catheter",
    title: "Choosing the Right Catheter: A Simple Guide for New Users",
    excerpt: "Starting catheterization can feel overwhelming. This beginner-friendly guide walks you through the different types of catheters and helps you find what works best for your lifestyle.",
    category: "Product Guide",
    readTime: "6 min read",
    date: "December 5, 2024",
    image: "product",
  },
  {
    id: "travel-with-ostomy",
    title: "Traveling with an Ostomy: Freedom to Explore",
    excerpt: "Don't let your ostomy hold you back from seeing the world. Get practical packing tips, TSA guidance, and advice from experienced travelers who've been there.",
    category: "Lifestyle",
    readTime: "8 min read",
    date: "November 28, 2024",
    image: "travel",
  },
  {
    id: "skin-health-tips",
    title: "Skin Health 101: Preventing Irritation and Staying Comfortable",
    excerpt: "Healthy skin is essential for comfort and confidence. Learn expert tips for preventing irritation, choosing the right products, and maintaining skin integrity.",
    category: "Health Tips",
    readTime: "4 min read",
    date: "November 20, 2024",
    image: "health",
  },
  {
    id: "insurance-made-simple",
    title: "Medicare & Insurance Made Simple: Getting Your Supplies Covered",
    excerpt: "Navigating insurance doesn't have to be complicated. We break down Medicare coverage, explain what's covered, and show you how we handle the paperwork so you don't have to.",
    category: "Insurance",
    readTime: "5 min read",
    date: "November 15, 2024",
    image: "insurance",
  },
];

const categories = [
  { name: "All", icon: BookOpen },
  { name: "Lifestyle", icon: Compass },
  { name: "Caregiving", icon: Users },
  { name: "Product Guide", icon: Heart },
  { name: "Health Tips", icon: Heart },
  { name: "Insurance", icon: BookOpen },
];

export default function Resources() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = articles.find((a) => a.featured);
  const regularArticles = filteredArticles.filter((a) => !a.featured || selectedCategory !== "All");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-accent">
          <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
            <Badge className="mb-4 bg-white/20 text-white border-0">
              Resources & Guides
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Live Life on Your Terms
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Expert advice, practical tips, and inspiring stories to help you maintain 
              independence and confidence every day.
            </p>
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg bg-white border-0"
                data-testid="input-search-articles"
              />
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <Button
                key={cat.name}
                variant={selectedCategory === cat.name ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat.name)}
                className={selectedCategory === cat.name ? "text-white bg-accent" : ""}
                data-testid={`filter-${cat.name.toLowerCase().replace(" ", "-")}`}
              >
                {cat.name}
              </Button>
            ))}
          </div>

          {/* Featured Article */}
          {selectedCategory === "All" && featuredArticle && !searchQuery && (
            <Card className="mb-10 overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div 
                  className="aspect-video md:aspect-auto md:min-h-[300px] flex items-center justify-center bg-accent"
                >
                  <div className="text-center p-8">
                    <Compass className="w-16 h-16 text-white/60 mx-auto mb-4" />
                    <p className="text-white/60 text-sm">Featured Article Image</p>
                  </div>
                </div>
                <CardContent className="p-6 md:p-8 flex flex-col justify-center">
                  <Badge className="w-fit mb-4 bg-primary text-white">
                    Featured
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredArticle.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {featuredArticle.date}
                    </span>
                  </div>
                  <Link href={`/resources/${featuredArticle.id}`}>
                    <Button 
                      className="w-fit text-white bg-primary hover:opacity-90"
                      data-testid="button-read-featured"
                    >
                      Read Article
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </div>
            </Card>
          )}

          {/* Article Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularArticles.map((article) => (
              <Card 
                key={article.id} 
                className="overflow-hidden hover:shadow-lg transition-shadow"
                data-testid={`card-article-${article.id}`}
              >
                <div 
                  className={`aspect-video flex items-center justify-center ${article.category === "Caregiving" ? "bg-primary" : "bg-accent"}`}
                >
                  <div className="text-center p-4">
                    {article.category === "Lifestyle" && <Compass className="w-10 h-10 text-white/60 mx-auto" />}
                    {article.category === "Caregiving" && <Users className="w-10 h-10 text-white/60 mx-auto" />}
                    {article.category === "Product Guide" && <Heart className="w-10 h-10 text-white/60 mx-auto" />}
                    {article.category === "Health Tips" && <Heart className="w-10 h-10 text-white/60 mx-auto" />}
                    {article.category === "Insurance" && <BookOpen className="w-10 h-10 text-white/60 mx-auto" />}
                  </div>
                </div>
                <CardContent className="p-5">
                  <Badge variant="secondary" className="mb-3">
                    {article.category}
                  </Badge>
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                    <Link href={`/resources/${article.id}`}>
                      <Button variant="ghost" size="sm" className="text-sm text-accent">
                        Read More
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No articles found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter.</p>
            </div>
          )}

          {/* Newsletter CTA */}
          <div 
            className="mt-16 rounded-2xl p-8 md:p-12 text-center text-white bg-accent"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Get Health Tips Delivered to Your Inbox
            </h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              Join thousands of subscribers who receive our weekly newsletter with 
              practical advice, product updates, and inspiring stories.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                data-testid="input-newsletter-resources"
              />
              <Button 
                className="text-white whitespace-nowrap bg-primary hover:opacity-90"
                data-testid="button-subscribe-resources"
              >
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
