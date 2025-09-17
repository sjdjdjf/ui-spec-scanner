// Update this page (the content is just a fallback if you fail to update the page)

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeatureHighlight from '@/components/FeatureHighlight';
import AnalyzeSection from '@/components/AnalyzeSection';
import ResultsReport from '@/components/ResultsReport';
import Footer from '@/components/Footer';
import { useDesignGuardStore } from '@/store/designGuardStore';

const Index = () => {
  const { currentReport, isAnalyzing } = useDesignGuardStore();

  useEffect(() => {
    // Set dark theme by default
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="relative">
        {/* Hero Section - always visible */}
        {!currentReport && !isAnalyzing && (
          <>
            <HeroSection />
            <FeatureHighlight />
          </>
        )}
        
        {/* Analysis Section */}
        <AnalyzeSection />
        
        {/* Results Section */}
        <ResultsReport />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
