import React from 'react';
import { motion } from 'framer-motion';
import { Github, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-primary">
            <span className="text-sm font-bold text-primary-foreground">DG</span>
          </div>
          <span className="text-xl font-bold text-gradient-primary">DesignGuard</span>
        </motion.div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Button 
            variant="ghost" 
            className="text-muted-foreground hover:text-foreground"
            onClick={() => window.open('https://docs.lovable.dev', '_blank')}
          >
            <FileText className="w-4 h-4 mr-2" />
            Docs
          </Button>
          <Button 
            variant="ghost" 
            className="text-muted-foreground hover:text-foreground"
            onClick={() => window.open('https://github.com', '_blank')}
          >
            <Github className="w-4 h-4 mr-2" />
            GitHub
          </Button>
        </nav>

        {/* Mobile menu button */}
        <Button variant="ghost" size="sm" className="md:hidden">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Button>
      </div>
    </motion.header>
  );
};

export default Header;