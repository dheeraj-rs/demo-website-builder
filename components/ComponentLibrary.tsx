"use client";

import { useState } from 'react';
import { ComponentCategory, ComponentSnippet, componentSnippets } from '@/lib/component-data';
import ComponentCard from './ComponentCard';
import CodeViewer from './CodeViewer';

interface ComponentLibraryProps {
  selectedComponents: ComponentSnippet[];
  onSelectComponent: (component: ComponentSnippet) => void;
}

export default function ComponentLibrary({ 
  selectedComponents, 
  onSelectComponent 
}: ComponentLibraryProps) {
  const [activeCategory, setActiveCategory] = useState<ComponentCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [codeViewComponent, setCodeViewComponent] = useState<ComponentSnippet | null>(null);
  
  const categories: { id: ComponentCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Components' },
    { id: 'navbar', label: 'Navigation' },
    { id: 'hero', label: 'Hero' },
    { id: 'about', label: 'About' },
    { id: 'content', label: 'Content' },
    { id: 'contact', label: 'Contact' },
    { id: 'footer', label: 'Footer' }
  ];
  
  const filteredComponents = componentSnippets.filter((component) => {
    const matchesCategory = activeCategory === 'all' || component.category === activeCategory;
    const matchesSearch = component.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         component.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  const isComponentSelected = (component: ComponentSnippet) => {
    return selectedComponents.some(c => c.id === component.id);
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="bg-white p-4 border-b">
        <div className="flex items-center">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search components..."
              className="w-full pl-10 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 border-b">
        <div className="flex px-2 py-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-3 py-1.5 text-sm rounded-md whitespace-nowrap mr-2 ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {filteredComponents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredComponents.map((component) => (
              <ComponentCard
                key={component.id}
                component={component}
                isSelected={isComponentSelected(component)}
                onSelect={onSelectComponent}
                onShowCode={() => setCodeViewComponent(component)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-12 w-12 text-gray-400 mb-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 13.5V15m-6 4h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z" 
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900">No components found</h3>
            <p className="text-sm text-gray-600 mt-1">
              Try adjusting your search or category filter
            </p>
          </div>
        )}
      </div>
      
      {codeViewComponent && (
        <CodeViewer 
          component={codeViewComponent} 
          onClose={() => setCodeViewComponent(null)} 
        />
      )}
    </div>
  );
}