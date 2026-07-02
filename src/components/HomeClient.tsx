"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import AboutAndAreas from "@/components/AboutAndAreas";
import RoiCalculator from "@/components/RoiCalculator";
import TrafficPipeline from "@/components/TrafficPipeline";
import Needs from "@/components/Needs";
import CaseStudies from "@/components/CaseStudies";
import HowWeWork from "@/components/HowWeWork";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";

export default function HomeClient() {
  return (
    <main className="relative min-h-screen bg-background select-none">
      <Navbar />
      <Hero />
      <Marquee />
      <AboutAndAreas />
      <RoiCalculator />
      <Needs />
      <CaseStudies />
      <TrafficPipeline />
      <HowWeWork />
      <FAQ />
      <ContactForm />
    </main>
  );
}
