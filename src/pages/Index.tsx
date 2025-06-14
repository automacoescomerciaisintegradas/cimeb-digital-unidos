
import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Association from '@/components/Association';
import Testimonials from '@/components/Testimonials';
import Radio from '@/components/Radio';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <Services />
      <Association />
      <Testimonials />
      <Radio />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
