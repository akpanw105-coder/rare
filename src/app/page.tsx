import { Hero } from "@/components/Hero";
import { ShirtRack } from "@/components/ShirtRack";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { BrandIntroduction } from "@/components/BrandIntroduction";
import { Lookbook } from "@/components/Lookbook";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";

export default function Home() {
  return (
    <>
      {/* 1. Editorial Hero */}
      <Hero />

      {/* 2. Interactive Vintage Shirt Rack */}
      <div id="shirt-rack">
        <ShirtRack />
      </div>

      {/* 3. Featured Shirt Selection */}
      <FeaturedProducts />

      {/* 4. RARE Brand Introduction */}
      <BrandIntroduction />

      {/* 5. Editorial Lookbook */}
      <Lookbook />

      {/* 6. WhatsApp Ordering Section */}
      <WhatsAppCTA />
    </>
  );
}
