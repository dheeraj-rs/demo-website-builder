"use client";

import { useState } from 'react';
import { ComponentSnippet } from '@/lib/component-data';
import { ArrowDown, ArrowUp, Eye, Trash } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface PreviewProps {
  selectedComponents: ComponentSnippet[];
  onRemove: (index: number) => void;
  onMove: (from: number, to: number) => void;
}

interface SortableItemProps {
  component: ComponentSnippet;
  index: number;
  onRemove: (index: number) => void;
  onPreview: (index: number) => void;
}

function SortableItem({ component, index, onRemove, onPreview }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: component.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="border-b border-gray-200 relative hover:bg-gray-50 cursor-move"
    >
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 text-xs mr-3">
            {index + 1}
          </span>
          <div>
            <h4 className="font-medium text-gray-900">{component.title}</h4>
            <p className="text-xs text-gray-600 capitalize">{component.category}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <button
            onClick={() => onPreview(index)}
            className="p-1.5 rounded-md text-gray-600 hover:bg-gray-200"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => onRemove(index)}
            className="p-1.5 rounded-md text-red-600 hover:bg-red-100"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Preview({ selectedComponents, onRemove, onMove }: PreviewProps) {
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      const oldIndex = selectedComponents.findIndex((item) => item.id === active.id);
      const newIndex = selectedComponents.findIndex((item) => item.id === over.id);
      onMove(oldIndex, newIndex);
    }
  };

  if (selectedComponents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2z"
            />
          </svg>
          <div>
            <h3 className="text-lg font-medium text-gray-900">No components selected</h3>
            <p className="text-sm text-gray-600 mt-1">
              Select components from the library to start building your website
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 flex justify-between items-center rounded-t-lg">
        <h3 className="font-medium text-gray-900">Selected Components</h3>
        <span className="text-sm text-gray-600">{selectedComponents.length} components</span>
      </div>
      
      <div className="flex-1 overflow-auto">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={selectedComponents.map(item => item.id)}
            strategy={verticalListSortingStrategy}
          >
            {selectedComponents.map((component, index) => (
              <SortableItem
                key={component.id}
                component={component}
                index={index}
                onRemove={onRemove}
                onPreview={(index) => setPreviewIndex(index)}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
      
      {previewIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-bold text-xl">
                {selectedComponents[previewIndex].title}
              </h3>
              <button
                onClick={() => setPreviewIndex(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-auto max-h-[calc(90vh-100px)]">
              <div dangerouslySetInnerHTML={{ 
                __html: selectedComponents[previewIndex].code.html 
              }} />
            </div>
          </div>
        </div>
      )}
      
      <div className="border-t border-gray-200 bg-gray-50 p-4 rounded-b-lg text-sm text-gray-600">
        Drag components to reorder • Click preview icon to see component
      </div>
    </div>
  );
}