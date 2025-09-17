import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDesignGuardStore } from '@/store/designGuardStore';
import heroImage from '@/assets/hero-hologram.jpg';

const HeroSection: React.FC = () => {
  const { setActiveTab } = useDesignGuardStore();

  const handleAnalyzeClick = () => {
    setActiveTab('analyze');
    // Scroll to analyze section
    document.getElementById('analyze-section')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-hero">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src={heroImage} 
          alt="Holographic UI Analysis" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/10 blur-xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-24 h-24 rounded-full bg-secondary/10 blur-xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-card-elevated border border-border mb-8"
          >
            <div className="w-2 h-2 bg-secondary rounded-full mr-2 animate-pulse-glow" />
            <span className="text-sm text-muted-foreground">Open Source Design Validation</span>
          </motion.div>

          {/* Main headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="text-gradient-primary">DesignGuard</span>
            <br />
            <span className="text-foreground">Design System</span>
            <br />
            <span className="text-gradient-secondary">Validator</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Like ESLint, but for your UI. Automatically validate live websites against your design system specifications.
          </motion.p>

          {/* CTA buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              size="lg"
              onClick={handleAnalyzeClick}
              className="bg-primary hover:bg-primary-glow text-primary-foreground px-8 py-4 text-lg font-semibold glow-hover group"
            >
              <Search className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Analyze Website
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-border hover:bg-card-elevated px-8 py-4 text-lg font-semibold group"
            >
              <Github className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              View on GitHub
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="grid grid-cols-3 gap-8 max-w-md mx-auto mt-16 pt-8 border-t border-border"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-gradient-primary">50+</div>
              <div className="text-sm text-muted-foreground">Validation Rules</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gradient-secondary">100%</div>
              <div className="text-sm text-muted-foreground">Open Source</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">0s</div>
              <div className="text-sm text-muted-foreground">Setup Time</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;