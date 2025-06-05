'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface BeginingProps {
  onDataChange: (data: { title: string; description: string }) => void;
  initialData?: { title: string; description: string };
}

export default function Begining({ onDataChange, initialData }: BeginingProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');

  // initialData değiştiğinde state'leri güncellemek için useEffect
  useEffect(() => {
    setTitle(initialData?.title || '');
    setDescription(initialData?.description || '');
  }, [initialData]);

  // Bileşen state'i değiştiğinde üst bileşene haber ver
  useEffect(() => {
    onDataChange({ title, description });
  }, [title, description, onDataChange]);

  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  const handleDescriptionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-700 mb-5 border-b pb-3 border-gray-200">Hero Bölümü</h2>
      <div className="space-y-5">
        <div>
          <label htmlFor="heroTitle" className="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
          <input 
            type="text" 
            id="heroTitle" 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Ana Başlık"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="heroDescription" className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
          <textarea 
            id="heroDescription" 
            rows={3} 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Hero bölümü açıklaması"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
        </div>
      </div>
    </div>
  );
} 