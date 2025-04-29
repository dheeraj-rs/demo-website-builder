"use client";

import { useState } from 'react';
import { ComponentSnippet } from '@/lib/component-data';
import ComponentLibrary from '@/components/ComponentLibrary';
import Preview from '@/components/Preview';
import { Download, Github, Laptop, LayoutGrid, Moon, RefreshCw, Sun } from 'lucide-react';
import { generateHTMLZip, generateNextJSZip, generateViteReactZip, generateAstroZip } from '@/lib/utils/zip-generator';
import { useTheme } from 'next-themes';

export default function Home() {
  const [selectedComponents, setSelectedComponents] = useState<ComponentSnippet[]>([]);
  const [activeTab, setActiveTab] = useState<'library' | 'preview'>('library');
  const [isGenerating, setIsGenerating] = useState(false);
  const { theme, setTheme } = useTheme();
  
  const handleSelectComponent = (component: ComponentSnippet) => {
    const isAlreadySelected = selectedComponents.some(c => c.id === component.id);
    
    if (isAlreadySelected) {
      setSelectedComponents(selectedComponents.filter(c => c.id !== component.id));
    } else {
      setSelectedComponents([...selectedComponents, component]);
    }
  };
  
  const handleRemoveComponent = (index: number) => {
    const updatedComponents = [...selectedComponents];
    updatedComponents.splice(index, 1);
    setSelectedComponents(updatedComponents);
  };
  
  const handleMoveComponent = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= selectedComponents.length) return;
    
    const updatedComponents = [...selectedComponents];
    const [movedComponent] = updatedComponents.splice(fromIndex, 1);
    updatedComponents.splice(toIndex, 0, movedComponent);
    
    setSelectedComponents(updatedComponents);
  };
  
  const handleDownload = async (format: 'html' | 'nextjs' | 'vite' | 'astro') => {
    if (selectedComponents.length === 0) return;
    
    setIsGenerating(true);
    
    try {
      switch (format) {
        case 'html':
          await generateHTMLZip(selectedComponents);
          break;
        case 'nextjs':
          await generateNextJSZip(selectedComponents);
          break;
        case 'vite':
          await generateViteReactZip(selectedComponents);
          break;
        case 'astro':
          await generateAstroZip(selectedComponents);
          break;
      }
    } catch (error) {
      console.error('Error generating zip file:', error);
    }
    
    setIsGenerating(false);
  };
  
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <LayoutGrid className="h-6 w-6" />
              <h1 className="text-xl font-bold">Component Builder</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Github size={20} />
              </a>
              
              <div className="hidden sm:block">
                <button
                  disabled={selectedComponents.length === 0}
                  onClick={() => setSelectedComponents([])}
                  className={`px-3 py-1.5 text-sm rounded-md border ${
                    selectedComponents.length === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-500'
                      : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <RefreshCw size={14} className="inline-block mr-1" />
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex flex-col md:flex-row">
        {/* Mobile Tabs */}
        <div className="md:hidden flex border-b">
          <button
            onClick={() => setActiveTab('library')}
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === 'library' 
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            Component Library
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-3 text-center font-medium relative ${
              activeTab === 'preview' 
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            Preview
            {selectedComponents.length > 0 && (
              <span className="absolute top-2 right-16 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {selectedComponents.length}
              </span>
            )}
          </button>
        </div>
        
        {/* Component Library */}
        <div className={`${activeTab === 'library' ? 'block' : 'hidden'} md:block md:w-2/3 border-r dark:border-gray-700 h-full`}>
          <ComponentLibrary 
            selectedComponents={selectedComponents}
            onSelectComponent={handleSelectComponent}
          />
        </div>
        
        {/* Preview Section */}
        <div className={`${activeTab === 'preview' ? 'block' : 'hidden'} md:block md:w-1/3 h-full flex flex-col dark:bg-gray-800`}>
          <div className="flex-1 overflow-hidden">
            <Preview 
              selectedComponents={selectedComponents}
              onRemove={handleRemoveComponent}
              onMove={handleMoveComponent}
            />
          </div>
          
          {/* Download Options */}
          <div className="p-4 border-t dark:border-gray-700">
            <p className="text-sm text-gray-600 mb-3 dark:text-gray-400">
              Download your project as a complete website
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                disabled={selectedComponents.length === 0 || isGenerating}
                onClick={() => handleDownload('html')}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium ${
                  selectedComponents.length === 0 || isGenerating
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isGenerating ? <RefreshCw size={16} className="animate-spin" /> : <Download size={16} />}
                HTML
              </button>
              
              <button
                disabled={selectedComponents.length === 0 || isGenerating}
                onClick={() => handleDownload('nextjs')}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium ${
                  selectedComponents.length === 0 || isGenerating
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                    : 'bg-gray-800 text-white hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600'
                }`}
              >
                {isGenerating ? <RefreshCw size={16} className="animate-spin" /> : <Laptop size={16} />}
                Next.js
              </button>
              
              <button
                disabled={selectedComponents.length === 0 || isGenerating}
                onClick={() => handleDownload('vite')}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium ${
                  selectedComponents.length === 0 || isGenerating
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                {isGenerating ? <RefreshCw size={16} className="animate-spin" /> : <Download size={16} />}
                Vite React
              </button>
              
              <button
                disabled={selectedComponents.length === 0 || isGenerating}
                onClick={() => handleDownload('astro')}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium ${
                  selectedComponents.length === 0 || isGenerating
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                    : 'bg-orange-600 text-white hover:bg-orange-700'
                }`}
              >
                {isGenerating ? <RefreshCw size={16} className="animate-spin" /> : <Download size={16} />}
                Astro
              </button>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t py-4 text-center text-gray-600 text-sm dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400">
        Component Builder - Create beautiful websites by selecting and arranging pre-built components
      </footer>
    </div>
  );
}