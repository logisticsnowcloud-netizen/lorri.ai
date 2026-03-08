import { useState, useEffect } from "react";
import { TopBar, Nav } from "@/components/Navigation";
import Hero from "@/components/Hero";
import ClientLogos from "@/components/ClientLogos";
import Platform from "@/components/Platform";
import { ForShippers, ForTransporters } from "@/components/Sections";
import IntelStats from "@/components/IntelStats";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import DemoModal from "@/components/DemoModal";
import { DemoModalProvider } from "@/hooks/use-demo-modal";

const Index = () => {
  const [dark, setDark] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    document.body.className = dark ? "dark" : "light";
  }, [dark]);

  return (
    <DemoModalProvider value={() => setModalOpen(true)}>
      <div>
        <TopBar dark={dark} setDark={setDark} />
        <Nav />
        <Hero dark={dark} />
        <ClientLogos />
        <Platform />
        <ForShippers />
        <ForTransporters />
        <IntelStats />
        <Testimonials />
        <CTASection />
        <Footer />
        <Chatbot />
        <DemoModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </DemoModalProvider>
  );
};

export default Index;
