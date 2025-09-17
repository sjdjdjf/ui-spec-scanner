import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Code, Zap, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const FeatureHighlight: React.FC = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-Time Analysis",
      description: "Actual CSS parsing and DOM analysis, not just mock data",
      color: "text-yellow-400"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "HTML/CSS Direct Input",
      description: "Paste code directly to bypass CORS limitations",
      color: "text-primary"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "A11y Validation", 
      description: "Accessibility checks included in every analysis",
      color: "text-secondary"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Custom Rules",
      description: "Upload your own design system specifications",
      color: "text-green-400"
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient-primary">Real Analysis Engine</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            No more mock data. DesignGuard now performs actual website analysis with real CSS parsing and validation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
            >
              <Card className="bg-card-elevated border-border shadow-card hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6 text-center space-y-4">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-muted ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlight;