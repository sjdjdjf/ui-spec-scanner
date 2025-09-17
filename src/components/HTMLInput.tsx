import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDesignGuardStore } from '@/store/designGuardStore';

const HTMLInput: React.FC = () => {
  const { setWebsiteUrl } = useDesignGuardStore();
  const [htmlContent, setHtmlContent] = useState('');
  const [cssContent, setCssContent] = useState('');

  const handleAnalyzeHTML = () => {
    // Create a data URL for the HTML content
    const fullHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>${cssContent}</style>
      </head>
      <body>
        ${htmlContent}
      </body>
      </html>
    `;
    
    const dataUrl = `data:text/html;base64,${btoa(fullHTML)}`;
    setWebsiteUrl(dataUrl);
  };

  const loadSampleHTML = () => {
    setHtmlContent(`<div class="hero-section">
  <h1 class="main-heading">Welcome to Our Product</h1>
  <p class="description">Experience the future of design systems</p>
  <button class="btn-primary">Get Started</button>
  <button class="btn-secondary">Learn More</button>
</div>

<div class="feature-grid">
  <div class="feature-card">
    <h3>Fast Performance</h3>
    <p>Lightning-fast load times</p>
  </div>
  <div class="feature-card">
    <h3>Secure</h3>
    <p>Enterprise-grade security</p>
  </div>
</div>`);

    setCssContent(`.hero-section {
  padding: 60px 20px;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.main-heading {
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 20px;
}

.description {
  font-size: 1.2rem;
  color: #f0f0f0;
  margin-bottom: 40px;
}

.btn-primary {
  background-color: #ff6b6b;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  margin: 0 10px;
}

.btn-secondary {
  background-color: transparent;
  color: white;
  padding: 15px 30px;
  border: 2px solid white;
  border-radius: 8px;
  font-weight: 600;
  margin: 0 10px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  padding: 60px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  padding: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.feature-card h3 {
  font-size: 1.5rem;
  font-weight: 400;
  color: #333;
  margin-bottom: 15px;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}`);
  };

  return (
    <Card className="bg-card-elevated border-border shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center text-foreground">
          <Code className="w-5 h-5 mr-2 text-primary" />
          HTML/CSS Analysis
        </CardTitle>
        <CardDescription>
          Paste your HTML and CSS code directly for immediate analysis without CORS limitations.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="html" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-muted">
            <TabsTrigger value="html">HTML Content</TabsTrigger>
            <TabsTrigger value="css">CSS Styles</TabsTrigger>
          </TabsList>
          
          <TabsContent value="html" className="mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">HTML Code</label>
              <Textarea
                placeholder="Paste your HTML content here..."
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
                className="min-h-[200px] bg-input border-border font-mono text-sm"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="css" className="mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">CSS Code</label>
              <Textarea
                placeholder="Paste your CSS styles here..."
                value={cssContent}
                onChange={(e) => setCssContent(e.target.value)}
                className="min-h-[200px] bg-input border-border font-mono text-sm"
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            onClick={handleAnalyzeHTML}
            disabled={!htmlContent.trim()}
            className="bg-primary hover:bg-primary-glow text-primary-foreground flex-1"
          >
            <Upload className="w-4 h-4 mr-2" />
            Analyze This Code
          </Button>
          
          <Button
            variant="outline"
            onClick={loadSampleHTML}
            className="hover:bg-accent"
          >
            Load Sample Code
          </Button>
        </div>

        {htmlContent && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-primary/10 rounded-lg border border-primary/20 text-sm"
          >
            <div className="flex items-center text-primary">
              <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
              Ready to analyze {htmlContent.split('\n').length} lines of HTML
              {cssContent && ` and ${cssContent.split('\n').length} lines of CSS`}
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default HTMLInput;