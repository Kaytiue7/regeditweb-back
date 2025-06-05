'use client';

import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  TouchSensor,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import SaveButton from '@/components/SaveButton';
import { toast } from 'react-hot-toast';

interface Component {
  id: string;
  title: string;
  description: string;
  isVisible: boolean;
}

function SortableItem({ component, index, onToggleVisibility }: { 
  component: Component; 
  index: number;
  onToggleVisibility: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
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
      className={`p-4 rounded-lg border ${
        isDragging
          ? 'bg-blue-50 border-blue-200 shadow-lg'
          : 'bg-white border-gray-200'
      } transition-all duration-300 ease-in-out cursor-move relative hover:shadow-md`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-medium text-sm transition-transform duration-300 hover:scale-110">
            {index + 1}
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800">
              {component.title}
            </h3>
            <p className="text-sm text-gray-600">{component.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleVisibility(component.id);
            }}
            className={`p-2 rounded-md transition-all duration-300 ease-in-out transform hover:scale-110 ${
              component.isVisible 
                ? 'bg-green-200 text-green-600 hover:bg-green-300' 
                : 'bg-red-100 text-gray-600 hover:bg-red-200'
            }`}
          >
            <div className="relative w-5 h-5">
              {component.isVisible ? (
                <svg 
                  className="w-5 h-5 transition-all duration-300 ease-in-out transform hover:rotate-12" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                <svg 
                  className="w-5 h-5 transition-all duration-300 ease-in-out transform hover:rotate-12" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              )}
            </div>
          </button>
          <svg
            className="w-6 h-6 text-gray-400 transition-transform duration-300 hover:rotate-90"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function MainPageOrder() {
  const [components, setComponents] = useState<Component[]>([
    { id: 'Begining', title: 'Başlangıç Bölümü', description: 'Sayfanın başlangıç kısmı', isVisible: true },
    { id: 'MiddlePageFirst', title: 'Orta Bölüm 1', description: 'Sayfanın orta bölümü 1', isVisible: true },
    { id: 'MiddlePageSecond', title: 'Orta Bölüm 2', description: 'Sayfanın orta bölümü 2', isVisible: true },
    { id: 'MiddlePageThird', title: 'Orta Bölüm 3', description: 'Sayfanın orta bölümü 3', isVisible: true },
    { id: 'CompanyInfo', title: 'Şirket Bilgileri', description: 'Şirket tanıtım bilgileri', isVisible: true },
  ]);

  const [isSaving, setIsSaving] = useState(false);

  const sensors = useSensors(
    useSensor(TouchSensor, {
      activationConstraint: { delay: 0, tolerance: 5 },
    }),
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setComponents((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleToggleVisibility = (id: string) => {
    setComponents((items) =>
      items.map((item) =>
        item.id === id ? { ...item, isVisible: !item.isVisible } : item
      )
    );
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const order = components.map((component, index) => ({
        sectionId: component.id,
        sectionName: component.title,
        order: index,
        isVisible: component.isVisible,
      }));

      const response = await fetch('/api/main-page-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orders: order }),
      });

      if (!response.ok) {
        throw new Error('Kaydetme işlemi başarısız oldu');
      }

      toast.success('Sıralama başarıyla kaydedildi');
    } catch (error) {
      console.error('Kaydetme hatası:', error);
      toast.error('Kaydetme işlemi sırasında bir hata oluştu');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-4 md:p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
          <p className="text-gray-600 mb-6">
            Bileşenleri sürükleyip bırakarak sıralayabilirsiniz. Sıralama, anasayfada görünecek sırayı belirler.
            Görünürlük durumunu değiştirmek için göz ikonuna tıklayabilirsiniz.
          </p>

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={components.map((c) => c.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-4">
                {components.map((component, index) => (
                  <SortableItem 
                    key={component.id} 
                    component={component} 
                    index={index} 
                    onToggleVisibility={handleToggleVisibility}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          <div className="mt-10 flex justify-end fixed bottom-5 right-5 transition-transform duration-300 hover:scale-105">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`relative ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <SaveButton />
              {isSaving && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
