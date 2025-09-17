import React from 'react';
import { motion } from 'framer-motion';
import { Play, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useDesignGuardStore } from '@/store/designGuardStore';

const AnalysisProgress: React.FC = () => {
  const { 
    websiteUrl, 
    designSystemDNA, 
    isAnalyzing, 
    analysisProgress, 
    startAnalysis 
  } = useDesignGuardStore();

  const canAnalyze = websiteUrl && designSystemDNA && !isAnalyzing;

  const handleStartAnalysis = () => {
    if (canAnalyze) {
      startAnalysis();
    }
  };

  const getProgressText = (progress: number): string => {
    if (progress < 20) return 'Loading website...';
    if (progress < 40) return 'Capturing DOM structure...';
    if (progress < 60) return 'Analyzing CSS properties...';
    if (progress < 80) return 'Running accessibility checks...';
    if (progress < 95) return 'Validating against design system...';
    return 'Generating report...';
  };

  return (
    <Card className="bg-card-elevated border-border shadow-card">
      <CardContent className="p-6">
        {!isAnalyzing ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">Ready to Analyze</h3>
              <p className="text-muted-foreground">
                {!websiteUrl && !designSystemDNA 
                  ? 'Enter a website URL and upload your design system JSON to get started.'
                  : !websiteUrl 
                  ? 'Enter a website URL to begin analysis.'
                  : !designSystemDNA 
                  ? 'Upload your design system JSON file to continue.'
                  : 'Click the button below to start the validation process.'
                }
              </p>
            </div>

            <Button
              size="lg"
              onClick={handleStartAnalysis}
              disabled={!canAnalyze}
              className={`px-8 py-3 ${canAnalyze 
                ? 'bg-primary hover:bg-primary-glow text-primary-foreground glow-hover' 
                : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <Play className="w-5 h-5 mr-2" />
              Start Analysis
            </Button>

            {canAnalyze && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-4 p-3 bg-secondary/10 rounded-lg border border-secondary/20"
              >
                <div className="flex items-center justify-center text-sm text-secondary">
                  <div className="w-2 h-2 bg-secondary rounded-full mr-2 animate-pulse" />
                  Everything looks good! Ready to validate {designSystemDNA?.rules.length} rules.
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Progress header */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-primary animate-spin mr-2" />
                <h3 className="text-lg font-semibold text-foreground">Analyzing Website</h3>
              </div>
              <p className="text-muted-foreground">{getProgressText(analysisProgress)}</p>
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
              <Progress 
                value={analysisProgress} 
                className="h-3 bg-muted"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{Math.round(analysisProgress)}% Complete</span>
                <span>
                  {new URL(websiteUrl).hostname}
                </span>
              </div>
            </div>

            {/* Analysis steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {[
                { step: 'Load Page', progress: 20 },
                { step: 'Capture DOM', progress: 40 },
                { step: 'Analyze CSS', progress: 60 },
                { step: 'Check A11y', progress: 80 },
                { step: 'Validate Rules', progress: 95 },
                { step: 'Generate Report', progress: 100 },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center p-2 rounded ${
                    analysisProgress >= item.progress 
                      ? 'bg-secondary/20 text-secondary' 
                      : analysisProgress >= item.progress - 20
                      ? 'bg-primary/20 text-primary'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full mr-3 ${
                    analysisProgress >= item.progress 
                      ? 'bg-secondary' 
                      : analysisProgress >= item.progress - 20
                      ? 'bg-primary animate-pulse'
                      : 'bg-muted-foreground/50'
                  }`} />
                  {item.step}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnalysisProgress;