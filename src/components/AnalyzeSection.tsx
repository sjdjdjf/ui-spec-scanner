import React from 'react';
import { motion } from 'framer-motion';
import URLInputForm from './URLInputForm';
import JSONUpload from './JSONUpload';
import AnalysisProgress from './AnalysisProgress';
import { useDesignGuardStore } from '@/store/designGuardStore';

const AnalyzeSection: React.FC = () => {
  const { activeTab } = useDesignGuardStore();

  if (activeTab !== 'analyze') return null;

  return (
    <section id="analyze-section" className="py-20 relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Section header */}
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              <span className="text-gradient-primary">Analyze Your Website</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Enter a website URL and upload your design system specifications to start the validation process.
            </motion.p>
          </div>

          {/* Form grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <URLInputForm />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <JSONUpload />
            </motion.div>
          </div>

          {/* Analysis progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <AnalysisProgress />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AnalyzeSection;