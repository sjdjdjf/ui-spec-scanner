import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useDesignGuardStore } from '@/store/designGuardStore';

const URLInputForm: React.FC = () => {
  const { websiteUrl, setWebsiteUrl } = useDesignGuardStore();
  const [isValid, setIsValid] = useState(true);

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return url.startsWith('http://') || url.startsWith('https://');
    } catch {
      return false;
    }
  };

  const handleUrlChange = (value: string) => {
    setWebsiteUrl(value);
    if (value) {
      setIsValid(validateUrl(value));
    } else {
      setIsValid(true);
    }
  };

  const handlePresetUrl = (url: string) => {
    handleUrlChange(url);
  };

  const presetUrls = [
    { label: 'Stripe', url: 'https://stripe.com' },
    { label: 'Linear', url: 'https://linear.app' },
    { label: 'Vercel', url: 'https://vercel.com' },
  ];

  return (
    <Card className="bg-card-elevated border-border shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center text-foreground">
          <Globe className="w-5 h-5 mr-2 text-primary" />
          Website URL
        </CardTitle>
        <CardDescription>
          Enter the URL of the website you want to validate against your design system.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            type="url"
            placeholder="https://example.com"
            value={websiteUrl}
            onChange={(e) => handleUrlChange(e.target.value)}
            className={`bg-input border-border ${!isValid ? 'border-destructive focus:ring-destructive' : 'focus:ring-primary'}`}
          />
          {!isValid && websiteUrl && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-destructive"
            >
              Please enter a valid URL starting with http:// or https://
            </motion.p>
          )}
        </div>

        {/* Quick presets */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Try these examples:</p>
          <div className="flex flex-wrap gap-2">
            {presetUrls.map((preset, index) => (
              <motion.div
                key={preset.url}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePresetUrl(preset.url)}
                  className="text-xs hover:bg-accent hover:text-accent-foreground group"
                >
                  {preset.label}
                  <ExternalLink className="w-3 h-3 ml-1 group-hover:scale-110 transition-transform" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {websiteUrl && isValid && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-secondary/10 rounded-lg border border-secondary/20"
          >
            <div className="flex items-center text-sm text-secondary">
              <div className="w-2 h-2 bg-secondary rounded-full mr-2 animate-pulse" />
              Ready to analyze: {new URL(websiteUrl).hostname}
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default URLInputForm;