import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, XCircle, ArrowLeft, Search, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDesignGuardStore } from '@/store/designGuardStore';
import type { ValidationResult } from '@/store/designGuardStore';

const ResultsReport: React.FC = () => {
  const { 
    activeTab, 
    currentReport, 
    selectedResult, 
    setActiveTab, 
    setSelectedResult,
    resetState 
  } = useDesignGuardStore();

  if (activeTab !== 'results' || !currentReport) return null;

  const { summary, results, url, timestamp, screenshot } = currentReport;

  const getStatusIcon = (status: ValidationResult['status']) => {
    switch (status) {
      case 'correct':
        return <CheckCircle className="w-4 h-4 text-secondary" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-destructive" />;
    }
  };

  const getStatusColor = (status: ValidationResult['status']) => {
    switch (status) {
      case 'correct':
        return 'bg-secondary/20 text-secondary border-secondary/30';
      case 'warning':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'error':
        return 'bg-destructive/20 text-destructive border-destructive/30';
    }
  };

  const filteredResults = (status: ValidationResult['status']) => 
    results.filter(result => result.status === status);

  const handleResultClick = (result: ValidationResult) => {
    setSelectedResult(selectedResult?.id === result.id ? null : result);
  };

  const handleNewAnalysis = () => {
    resetState();
    setActiveTab('analyze');
  };

  const ResultsList = ({ results, status }: { results: ValidationResult[], status: ValidationResult['status'] }) => (
    <div className="space-y-3">
      {results.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
            {getStatusIcon(status)}
          </div>
          <p>No {status} issues found</p>
        </div>
      ) : (
        results.map((result, index) => (
          <motion.div
            key={result.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedResult?.id === result.id 
                  ? 'ring-2 ring-primary bg-primary/5' 
                  : 'bg-card-elevated hover:bg-card-hover'
              }`}
              onClick={() => handleResultClick(result)}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {getStatusIcon(result.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getStatusColor(result.status)}`}
                      >
                        {result.element}
                      </Badge>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
                        <Eye className="w-3 h-3" />
                      </Button>
                    </div>
                    <p className="text-sm font-medium text-foreground mb-1">{result.message}</p>
                    <div className="text-xs text-muted-foreground">
                      Expected: <code className="bg-muted px-1 rounded">{result.expectedValue}</code>
                      {result.status !== 'correct' && (
                        <>
                          {' • '}
                          Actual: <code className="bg-muted px-1 rounded">{result.actualValue}</code>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                {selectedResult?.id === result.id && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 pt-4 border-t border-border"
                  >
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-muted-foreground">Rule ID:</span>
                        <div className="font-mono">{result.ruleId}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Element:</span>
                        <div className="font-mono">{result.element}</div>
                      </div>
                      {result.position && (
                        <div className="col-span-2">
                          <span className="text-muted-foreground">Position:</span>
                          <div className="font-mono">
                            {result.position.x}, {result.position.y} ({result.position.width}×{result.position.height})
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))
      )}
    </div>
  );

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold mb-2"
              >
                <span className="text-gradient-primary">Analysis Report</span>
              </motion.h2>
              <p className="text-muted-foreground">
                {new URL(url).hostname} • {new Date(timestamp).toLocaleString()}
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={handleNewAnalysis}
              className="hover:bg-accent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              New Analysis
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Summary Cards */}
            <div className="lg:col-span-1 space-y-4">
              <Card className="bg-card-elevated border-border shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-secondary/10 rounded-lg">
                      <div className="text-2xl font-bold text-secondary">{summary.correct}</div>
                      <div className="text-xs text-muted-foreground">Correct</div>
                    </div>
                    <div className="text-center p-3 bg-yellow-500/10 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-400">{summary.warnings}</div>
                      <div className="text-xs text-muted-foreground">Warnings</div>
                    </div>
                    <div className="text-center p-3 bg-destructive/10 rounded-lg">
                      <div className="text-2xl font-bold text-destructive">{summary.errors}</div>
                      <div className="text-xs text-muted-foreground">Errors</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-foreground">{summary.total}</div>
                      <div className="text-xs text-muted-foreground">Total</div>
                    </div>
                  </div>
                  
                  {/* Score */}
                  <div className="pt-4 border-t border-border">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gradient-primary">
                        {Math.round((summary.correct / summary.total) * 100)}%
                      </div>
                      <div className="text-sm text-muted-foreground">Design System Compliance</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Screenshot */}
              {screenshot && (
                <Card className="bg-card-elevated border-border shadow-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Screenshot</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img 
                      src={screenshot} 
                      alt="Website screenshot"
                      className="w-full rounded-lg border border-border"
                    />
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Results */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-muted">
                  <TabsTrigger value="all">All ({summary.total})</TabsTrigger>
                  <TabsTrigger value="correct" className="text-secondary">
                    Correct ({summary.correct})
                  </TabsTrigger>
                  <TabsTrigger value="warning" className="text-yellow-400">
                    Warnings ({summary.warnings})
                  </TabsTrigger>
                  <TabsTrigger value="error" className="text-destructive">
                    Errors ({summary.errors})
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="mt-6">
                  <ResultsList results={results} status="correct" />
                </TabsContent>
                <TabsContent value="correct" className="mt-6">
                  <ResultsList results={filteredResults('correct')} status="correct" />
                </TabsContent>
                <TabsContent value="warning" className="mt-6">
                  <ResultsList results={filteredResults('warning')} status="warning" />
                </TabsContent>
                <TabsContent value="error" className="mt-6">
                  <ResultsList results={filteredResults('error')} status="error" />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResultsReport;