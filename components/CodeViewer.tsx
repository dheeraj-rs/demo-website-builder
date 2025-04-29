"use client";

import { useState } from 'react';
import { ComponentSnippet, frameworks } from '@/lib/component-data';
import { X, Copy, Check } from 'lucide-react';

interface CodeViewerProps {
  component: ComponentSnippet;
  onClose: () => void;
}

export default function CodeViewer({ component, onClose }: CodeViewerProps) {
  const [selectedFramework, setSelectedFramework] = useState<'nextjs' | 'html'>('nextjs');
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(component.code[selectedFramework]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  if (!component) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between border-b p-4">
          <div>
            <h3 className="font-bold text-xl">{component.title}</h3>
            <p className="text-sm text-gray-600">{component.category} component</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex rounded-md overflow-hidden border">
              {frameworks.map((framework) => (
                <button
                  key={framework.id}
                  className={`px-3 py-1 text-sm ${
                    selectedFramework === framework.id
                      ? 'bg-gray-100 font-medium'
                      : 'bg-white'
                  }`}
                  onClick={() => setSelectedFramework(framework.id as 'nextjs' | 'html')}
                >
                  {framework.name}
                </button>
              ))}
            </div>
            
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-sm transition-colors"
            >
              {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-900"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        
        <div className="overflow-auto flex-1 p-4 bg-gray-900 text-gray-200 font-mono text-sm">
          <pre>{component.code[selectedFramework]}</pre>
        </div>
      </div>
    </div>
  );
}