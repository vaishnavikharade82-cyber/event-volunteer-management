"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import HeroSection from "../components/hero-section";
import FeaturesSection from "../components/features-section";
import FeaturedEventsSection from "../components/featured-events-section";
import CTASection from "../components/cta-section";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      router.push("/signup");
    }
  };

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <FeaturedEventsSection />
      <CTASection />
    </>
  );
}