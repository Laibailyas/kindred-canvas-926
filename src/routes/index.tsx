import { createFileRoute } from "@tanstack/react-router";
import { CustomCursor } from "@/components/CustomCursor";
import { Preloader } from "@/components/Preloader";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { ChooseCause } from "@/components/ChooseCause";
import { SecurityControl } from "@/components/SecurityControl";
import { SocialProof } from "@/components/SocialProof";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { LegalFooter } from "@/components/LegalFooter";
import { SubmitBand } from "@/components/SubmitBand";
import { SubmitCharityModal } from "@/components/SubmitCharityModal";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dotis | Support Verified Charities Worldwide" },
      { name: "description", content: "Free forever: support a verified charity of your choice worldwide without spending one cent. Turn Dotis off in one tap." },
      { property: "og:title", content: "Dotis | Support Verified Charities Worldwide" },
      { property: "og:description", content: "Support verified charities and projects worldwide without spending one cent." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <Preloader />
      <CustomCursor />
      <Hero />
      <HowItWorks />
      <ChooseCause />
      <SecurityControl />
      <SocialProof />
      <SubmitBand />
      <Faq />
      <FinalCta />
      <LegalFooter />
      <SubmitCharityModal />
      <Toaster position="top-center" />
    </main>
  );
}
