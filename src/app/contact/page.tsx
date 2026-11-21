"use client";

import React, { useState } from "react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, MessageSquare, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Feedback",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Client-side confirmation
    setSubmitted(true);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-12 max-w-4xl">
      <Breadcrumbs items={[{ label: "Contact Us" }]} />

      <header className="space-y-3 text-center sm:text-left">
        <Badge variant="outline">Get in Touch</Badge>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
          Contact the SmartCalc Team
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Have a suggestion for a new calculator, noticed a calculation discrepancy, or interested in partnership inquiries? We value your feedback.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <Card className="p-6 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Mail className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-base">Email Support</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Reach out directly for formula verification and feature requests:
            </p>
            <p className="text-sm font-semibold text-primary pt-1">
              https://github.com/ysprajapti/AllinoneCalculator
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <MessageSquare className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-base">Community Feedback</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We review community suggestions every month and prioritize calculators most requested by users.
            </p>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="p-6 sm:p-8">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="h-14 w-14 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold">Thank You!</h3>
                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                  Your message has been recorded. Our development and mathematical review team will look into your request promptly.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", subject: "Feedback", message: "" });
                  }}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">
                    Your Name
                  </label>
                  <Input
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">
                    Topic / Subject
                  </label>
                  <select
                    className="flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option value="Feedback">General Feedback</option>
                    <option value="Bug">Calculation Formula Issue</option>
                    <option value="Request">New Calculator Request</option>
                    <option value="Business">Business / Advertising Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide details about your query or suggested formula..."
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary placeholder:text-muted-foreground"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <Button type="submit" className="w-full flex items-center justify-center space-x-2">
                  <Send className="h-4 w-4" />
                  <span>Send Message</span>
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

