"use client"

import { useState } from "react"
import {
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  ChevronDown,
  ExternalLink,
  Search,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/colapsible"

const faqs = [
  {
    question: "How do I book a ride for my child?",
    answer:
      "To book a ride, go to the 'Book a Ride' section from the dashboard. Select your child, choose an available route, set your pickup location and schedule, then confirm your booking. You'll receive a confirmation email once the booking is complete.",
  },
  {
    question: "Can I track my child's bus in real-time?",
    answer:
      "Yes! Once your child's bus is en route, you can track its location in real-time from the dashboard. You'll also receive push notifications when the bus is approaching your pickup location and when your child has been picked up or dropped off.",
  },
  {
    question: "How do I cancel or modify a booking?",
    answer:
      "You can cancel or modify a booking from the 'My Bookings' section. Click on the booking you want to change and select either 'Modify' or 'Cancel'. Please note that cancellations made less than 24 hours before the scheduled pickup may incur a fee.",
  },
  {
    question: "What safety measures are in place?",
    answer:
      "All our drivers undergo thorough background checks and are professionally trained. Buses are equipped with GPS tracking, security cameras, and meet all safety standards. We also have a check-in/check-out system to ensure your child's safety at all times.",
  },
  {
    question: "How do I add another child to my account?",
    answer:
      "Go to your Profile page and click 'Add Child' in the 'My Children' section. Fill in your child's details including their name, school, grade, and date of birth. Once added, you can book rides for them immediately.",
  },
  {
    question: "What are the payment options?",
    answer:
      "We accept all major credit cards, debit cards, and digital wallets. You can manage your payment methods in the Settings section. We also offer monthly subscription plans for recurring bookings at discounted rates.",
  },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [openItems, setOpenItems] = useState<string[]>([])

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleItem = (question: string) => {
    setOpenItems((prev) =>
      prev.includes(question)
        ? prev.filter((q) => q !== question)
        : [...prev, question]
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Help & Support</h1>
        <p className="text-muted-foreground">
          Find answers to common questions or get in touch
        </p>
      </div>

      {/* Contact Options */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex flex-col items-center p-6 text-center">
            <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10">
              <MessageCircle className="size-6 text-primary" />
            </div>
            <h3 className="font-medium">Live Chat</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Chat with our support team
            </p>
            <Button className="mt-4 w-full" size="sm">
              Start Chat
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center p-6 text-center">
            <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10">
              <Phone className="size-6 text-primary" />
            </div>
            <h3 className="font-medium">Phone Support</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Mon-Fri, 8AM - 6PM
            </p>
            <Button variant="outline" className="mt-4 w-full bg-transparent" size="sm">
              +1 (800) 123-4567
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center p-6 text-center">
            <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10">
              <Mail className="size-6 text-primary" />
            </div>
            <h3 className="font-medium">Email Us</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              We reply within 24 hours
            </p>
            <Button variant="outline" className="mt-4 w-full bg-transparent" size="sm">
              support@schoolride.com
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <HelpCircle className="size-5" />
            <CardTitle>Frequently Asked Questions</CardTitle>
          </div>
          <CardDescription>Quick answers to common questions</CardDescription>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredFaqs.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                No FAQs found matching your search
              </div>
            ) : (
              filteredFaqs.map((faq) => (
                <Collapsible
                  key={faq.question}
                  open={openItems.includes(faq.question)}
                  onOpenChange={() => toggleItem(faq.question)}
                >
                  <CollapsibleTrigger asChild>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between rounded-lg border p-4 text-left transition-colors hover:bg-muted/50"
                    >
                      <span className="font-medium">{faq.question}</span>
                      <ChevronDown
                        className={`size-5 text-muted-foreground transition-transform ${
                          openItems.includes(faq.question) ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-4 pb-4 pt-2 text-muted-foreground">
                      {faq.answer}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Additional Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Resources</CardTitle>
          <CardDescription>Helpful guides and documentation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <Button
              variant="ghost"
              className="h-auto justify-between p-4"
              asChild
            >
              <a href="#" className="flex items-center">
                <span>Getting Started Guide</span>
                <ExternalLink className="size-4" />
              </a>
            </Button>
            <Button
              variant="ghost"
              className="h-auto justify-between p-4"
              asChild
            >
              <a href="#" className="flex items-center">
                <span>Safety Guidelines</span>
                <ExternalLink className="size-4" />
              </a>
            </Button>
            <Button
              variant="ghost"
              className="h-auto justify-between p-4"
              asChild
            >
              <a href="#" className="flex items-center">
                <span>Terms of Service</span>
                <ExternalLink className="size-4" />
              </a>
            </Button>
            <Button
              variant="ghost"
              className="h-auto justify-between p-4"
              asChild
            >
              <a href="#" className="flex items-center">
                <span>Privacy Policy</span>
                <ExternalLink className="size-4" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}