"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Check, Code } from 'lucide-react';
import { ComponentSnippet } from '@/lib/component-data';

interface ComponentCardProps {
  component: ComponentSnippet;
  isSelected: boolean;
  onSelect: (component: ComponentSnippet) => void;
  onShowCode: (component: ComponentSnippet) => void;
}

export default function ComponentCard({ 
  component, 
  isSelected, 
  onSelect, 
  onShowCode 
}: ComponentCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`relative rounded-lg overflow-hidden shadow-md transition-all duration-300 ${
        isSelected ? 'ring-2 ring-blue-600 scale-[1.02]' : 'hover:shadow-lg'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-40 bg-gray-200 overflow-hidden">
        <Image 
          src={component.thumbnail} 
          alt={component.title}
          fill
          className="object-cover transition-transform duration-500 ease-in-out hover:scale-110"
        />
        
        {/* Selection indicator */}
        {isSelected && (
          <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1">
            <Check size={16} />
          </div>
        )}
        
        {/* Hover overlay */}
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-300 flex flex-col items-center justify-center gap-2 ${
            isHovered ? 'opacity-80' : 'opacity-0'
          }`}
        >
          <button
            onClick={() => onSelect(component)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isSelected 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isSelected ? 'Remove' : 'Add to Project'}
          </button>
          
          <button
            onClick={() => onShowCode(component)}
            className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-800 text-white text-sm font-medium transition-colors flex items-center gap-1"
          >
            <Code size={14} /> View Code
          </button>
        </div>
      </div>
      
      <div className="p-4 bg-white">
        <h3 className="font-semibold text-gray-900">{component.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{component.description}</p>
      </div>
    </div>
  );
}