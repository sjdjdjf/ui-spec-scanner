import { create } from 'zustand';

export interface DesignSystemRule {
  id: string;
  type: 'color' | 'typography' | 'spacing' | 'accessibility' | 'layout';
  property: string;
  expectedValue: string | number | string[];
  tolerance?: number;
  description: string;
}

export interface DesignSystemDNA {
  name: string;
  version: string;
  rules: DesignSystemRule[];
  metadata?: {
    author?: string;
    description?: string;
    created?: string;
  };
}

export interface ValidationResult {
  id: string;
  ruleId: string;
  element: string;
  status: 'correct' | 'warning' | 'error';
  message: string;
  actualValue: string | number;
  expectedValue: string | number;
  screenshot?: string;
  position?: { x: number; y: number; width: number; height: number };
}

export interface AnalysisReport {
  url: string;
  timestamp: string;
  summary: {
    correct: number;
    warnings: number;
    errors: number;
    total: number;
  };
  results: ValidationResult[];
  screenshot?: string;
}

interface DesignGuardState {
  // Form state
  websiteUrl: string;
  designSystemDNA: DesignSystemDNA | null;
  
  // Analysis state
  isAnalyzing: boolean;
  analysisProgress: number;
  currentReport: AnalysisReport | null;
  
  // UI state
  activeTab: 'analyze' | 'results';
  selectedResult: ValidationResult | null;
  
  // Actions
  setWebsiteUrl: (url: string) => void;
  setDesignSystemDNA: (dna: DesignSystemDNA | null) => void;
  startAnalysis: () => Promise<void>;
  setAnalysisProgress: (progress: number) => void;
  setCurrentReport: (report: AnalysisReport | null) => void;
  setActiveTab: (tab: 'analyze' | 'results') => void;
  setSelectedResult: (result: ValidationResult | null) => void;
  resetState: () => void;
}

// Mock analysis function - replace with real Playwright integration later
const mockAnalysis = async (
  url: string, 
  dna: DesignSystemDNA, 
  onProgress: (progress: number) => void
): Promise<AnalysisReport> => {
  const steps = [
    'Loading website...',
    'Capturing DOM structure...',
    'Analyzing CSS properties...',
    'Running accessibility checks...',
    'Validating against design system...',
    'Generating report...'
  ];

  for (let i = 0; i < steps.length; i++) {
    await new Promise(resolve => setTimeout(resolve, 800));
    onProgress(((i + 1) / steps.length) * 100);
  }

  // Generate mock results
  const mockResults: ValidationResult[] = [
    {
      id: '1',
      ruleId: 'color-primary',
      element: 'button.primary',
      status: 'correct',
      message: 'Primary button uses correct brand color',
      actualValue: '#0066FF',
      expectedValue: '#0066FF',
      position: { x: 100, y: 200, width: 120, height: 40 }
    },
    {
      id: '2', 
      ruleId: 'typography-heading',
      element: 'h1',
      status: 'warning',
      message: 'Heading font weight is lighter than expected',
      actualValue: '400',
      expectedValue: '600',
      position: { x: 50, y: 50, width: 300, height: 60 }
    },
    {
      id: '3',
      ruleId: 'accessibility-contrast',
      element: 'p.description',
      status: 'error',
      message: 'Text contrast ratio too low (2.1:1, minimum 4.5:1)',
      actualValue: '2.1',
      expectedValue: '4.5',
      position: { x: 50, y: 150, width: 250, height: 20 }
    },
    {
      id: '4',
      ruleId: 'spacing-margin',
      element: 'div.card',
      status: 'correct',
      message: 'Card margins follow spacing scale',
      actualValue: '24px',
      expectedValue: '24px',
      position: { x: 300, y: 100, width: 200, height: 300 }
    }
  ];

  const summary = {
    correct: mockResults.filter(r => r.status === 'correct').length,
    warnings: mockResults.filter(r => r.status === 'warning').length,
    errors: mockResults.filter(r => r.status === 'error').length,
    total: mockResults.length
  };

  return {
    url,
    timestamp: new Date().toISOString(),
    summary,
    results: mockResults,
    screenshot: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk1vY2sgU2NyZWVuc2hvdDwvdGV4dD48L3N2Zz4='
  };
};

export const useDesignGuardStore = create<DesignGuardState>((set, get) => ({
  // Initial state
  websiteUrl: '',
  designSystemDNA: null,
  isAnalyzing: false,
  analysisProgress: 0,
  currentReport: null,
  activeTab: 'analyze',
  selectedResult: null,

  // Actions
  setWebsiteUrl: (url: string) => set({ websiteUrl: url }),
  
  setDesignSystemDNA: (dna: DesignSystemDNA | null) => set({ designSystemDNA: dna }),
  
  startAnalysis: async () => {
    const { websiteUrl, designSystemDNA } = get();
    
    if (!websiteUrl || !designSystemDNA) {
      console.error('URL and Design System DNA are required for analysis');
      return;
    }

    set({ 
      isAnalyzing: true, 
      analysisProgress: 0, 
      currentReport: null,
      activeTab: 'results' 
    });

    try {
      const report = await mockAnalysis(
        websiteUrl, 
        designSystemDNA, 
        (progress) => set({ analysisProgress: progress })
      );
      
      set({ 
        currentReport: report, 
        isAnalyzing: false, 
        analysisProgress: 100 
      });
    } catch (error) {
      console.error('Analysis failed:', error);
      set({ 
        isAnalyzing: false, 
        analysisProgress: 0 
      });
    }
  },

  setAnalysisProgress: (progress: number) => set({ analysisProgress: progress }),
  
  setCurrentReport: (report: AnalysisReport | null) => set({ currentReport: report }),
  
  setActiveTab: (tab: 'analyze' | 'results') => set({ activeTab: tab }),
  
  setSelectedResult: (result: ValidationResult | null) => set({ selectedResult: result }),
  
  resetState: () => set({
    websiteUrl: '',
    designSystemDNA: null,
    isAnalyzing: false,
    analysisProgress: 0,
    currentReport: null,
    activeTab: 'analyze',
    selectedResult: null,
  }),
}));