import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, CheckCircle, AlertCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useDesignGuardStore } from '@/store/designGuardStore';
import type { DesignSystemDNA } from '@/store/designGuardStore';

const JSONUpload: React.FC = () => {
  const { designSystemDNA, setDesignSystemDNA } = useDesignGuardStore();
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateJSON = (data: any): data is DesignSystemDNA => {
    return (
      data &&
      typeof data === 'object' &&
      typeof data.name === 'string' &&
      typeof data.version === 'string' &&
      Array.isArray(data.rules) &&
      data.rules.every((rule: any) => 
        rule.id && rule.type && rule.property && rule.expectedValue !== undefined
      )
    );
  };

  const handleFile = useCallback((file: File) => {
    if (file.type !== 'application/json') {
      setError('Please upload a JSON file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (validateJSON(data)) {
          setDesignSystemDNA(data);
          setError(null);
        } else {
          setError('Invalid design system format. Please check the JSON structure.');
        }
      } catch {
        setError('Invalid JSON file. Please check the file format.');
      }
    };
    reader.readAsText(file);
  }, [setDesignSystemDNA]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const downloadSampleJSON = () => {
    const sampleDNA: DesignSystemDNA = {
      name: "Sample Design System",
      version: "1.0.0",
      rules: [
        {
          id: "primary-color",
          type: "color",
          property: "background-color",
          expectedValue: "#0066FF",
          description: "Primary buttons should use brand blue"
        },
        {
          id: "heading-font-weight",
          type: "typography", 
          property: "font-weight",
          expectedValue: 600,
          tolerance: 50,
          description: "Headings should be semi-bold"
        },
        {
          id: "button-border-radius",
          type: "layout",
          property: "border-radius",
          expectedValue: "8px",
          description: "Buttons should have 8px border radius"
        }
      ],
      metadata: {
        author: "Design Team",
        description: "Sample design system validation rules",
        created: new Date().toISOString()
      }
    };

    const blob = new Blob([JSON.stringify(sampleDNA, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample-design-system.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="bg-card-elevated border-border shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center text-foreground">
          <FileText className="w-5 h-5 mr-2 text-secondary" />
          Design System DNA
        </CardTitle>
        <CardDescription>
          Upload a JSON file containing your design system validation rules.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload area */}
        <motion.div
          className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive 
              ? 'border-primary bg-primary/5' 
              : designSystemDNA 
                ? 'border-secondary bg-secondary/5'
                : 'border-muted-foreground/30 hover:border-muted-foreground/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <input
            type="file"
            accept=".json"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          {designSystemDNA ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-2"
            >
              <CheckCircle className="w-12 h-12 text-secondary mx-auto" />
              <h3 className="font-medium text-foreground">{designSystemDNA.name}</h3>
              <p className="text-sm text-muted-foreground">
                Version {designSystemDNA.version} • {designSystemDNA.rules.length} rules
              </p>
            </motion.div>
          ) : (
            <div className="space-y-2">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
              <h3 className="font-medium text-foreground">
                Drop your JSON file here
              </h3>
              <p className="text-sm text-muted-foreground">
                or click to browse files
              </p>
            </div>
          )}
        </motion.div>

        {/* Error message */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center p-3 bg-destructive/10 text-destructive rounded-lg border border-destructive/20"
          >
            <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </motion.div>
        )}

        {/* Sample download */}
        <div className="pt-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            onClick={downloadSampleJSON}
            className="w-full text-sm hover:bg-accent"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Sample JSON
          </Button>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            New to DesignGuard? Start with our sample format
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default JSONUpload;