import React from 'react';
import { motion } from 'framer-motion';
import { Github, FileText, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-primary">
                <span className="text-sm font-bold text-primary-foreground">DG</span>
              </div>
              <span className="text-xl font-bold text-gradient-primary">DesignGuard</span>
            </motion.div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Open-source design system validation tool. Like ESLint, but for your UI.
            </p>
            <div className="flex items-center text-sm text-muted-foreground">
              Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> by the community
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
              <li><a href="#roadmap" className="text-muted-foreground hover:text-foreground transition-colors">Roadmap</a></li>
              <li><a href="#changelog" className="text-muted-foreground hover:text-foreground transition-colors">Changelog</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#docs" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="#examples" className="text-muted-foreground hover:text-foreground transition-colors">Examples</a></li>
              <li><a href="#community" className="text-muted-foreground hover:text-foreground transition-colors">Community</a></li>
              <li><a href="#support" className="text-muted-foreground hover:text-foreground transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Connect</h3>
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="hover:bg-accent"
                onClick={() => window.open('https://github.com', '_blank')}
              >
                <Github className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="hover:bg-accent"
                onClick={() => window.open('https://docs.lovable.dev', '_blank')}
              >
                <FileText className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 DesignGuard. Released under the MIT License.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <button 
              onClick={() => window.open('#privacy', '_blank')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => window.open('#terms', '_blank')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;