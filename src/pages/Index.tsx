import { TopBar, Nav } from "@/components/Navigation";
import Hero from "@/components/Hero";
import ClientLogos from "@/components/ClientLogos";
import Platform from "@/components/Platform";
import { ForShippers, ForTransporters } from "@/components/Sections";
import IntelStats from "@/components/IntelStats";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="font-outfit bg-background text-foreground min-h-screen">
      <TopBar />
      <Nav />
      <Hero />
      <ClientLogos />
      <Platform />
      <ForShippers />
      <ForTransporters />
      <IntelStats />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
