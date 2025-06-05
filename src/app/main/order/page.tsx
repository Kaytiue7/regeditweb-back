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
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Component {
  id: string;
  title: string;
  description: string;
}
import SaveButton from '@/components/SaveButton';

function SortableItem({ component, index }: { component: Component; index: number }) {
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
      } transition-all duration-200 cursor-move relative`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-medium text-sm">
            {index}
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800">
              {component.title}
            </h3>
            <p className="text-sm text-gray-600">
              {component.description}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <svg
            className="w-6 h-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 8h16M4 16h16"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function MainPageOrder() {
  const [components, setComponents] = useState<Component[]>([
    { id: 'Begining', title: 'Başlangıç Bölümü', description: 'Sayfanın başlangıç kısmı' },
    { id: 'MiddlePageFirst', title: 'Orta Bölüm 1', description: 'Sayfanın orta bölümü 1' },
    { id: 'MiddlePageSecond', title: 'Orta Bölüm 2', description: 'Sayfanın orta bölümü 2' },
    { id: 'MiddlePageThird', title: 'Orta Bölüm 3', description: 'Sayfanın orta bölümü 3' },
    { id: 'CompanyInfo', title: 'Şirket Bilgileri', description: 'Şirket tanıtım bilgileri' },
  ]);

  const sensors = useSensors(
    useSensor(TouchSensor, {
      // Dokunmatik ekran hassasiyetini artır
      activationConstraint: {
        delay: 0,
        tolerance: 5,
      },
    }),
    useSensor(PointerSensor, {
      // Fare hassasiyetini artır
      activationConstraint: {
        distance: 5,
      },
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

  const handleSave = () => {
    const order = components.map((component, index) => ({
      id: component.id,
      title: component.title,
      order: index
    }));
    console.log('Yeni sıralama:', order);
  };

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-4 md:p-8 rounded-xl shadow-lg">
          <p className="text-gray-600 mb-6">
            Bileşenleri sürükleyip bırakarak sıralayabilirsiniz. Sıralama, anasayfada görünecek sırayı belirler.
          </p>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={components.map((c) => c.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-4">
                {components.map((component, index) => (
                  <SortableItem
                    key={component.id}
                    component={component}
                    index={index}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          <div onClick={handleSave} className="mt-10 flex justify-end fixed bottom-5 right-5">
            <SaveButton/>
          </div>
        </div>
      </div>
    </div>
  );
} 