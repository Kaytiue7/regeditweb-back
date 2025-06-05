'use client';

import React, { useState, useEffect, useCallback } from 'react';
import ImageUpload from '@/tools/ImageUpload';

interface MiddlePageSecondProps {
  onDataChange: (data: { title: string; description: string; description2: string; btn_text: string; image: string }) => void;
  initialData?: { title: string; description: string; description2: string; btn_text: string; image: string };
}

export default function MiddlePageSecond({ onDataChange, initialData }: MiddlePageSecondProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [description2, setDescription2] = useState(initialData?.description2 || '');
  const [btn_text, setBtn_text] = useState(initialData?.btn_text || '');
  const [image, setImage] = useState(initialData?.image || '');

  useEffect(() => {
    setTitle(initialData?.title || '');
    setDescription(initialData?.description || '');
    setDescription2(initialData?.description2 || '');
    setBtn_text(initialData?.btn_text || '');
    setImage(initialData?.image || '');
  }, [initialData]);

  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  const handleDescriptionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  }, []);

  const handleDescription2Change = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription2(e.target.value);
  }, []); 

  const handleBtn_textChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setBtn_text(e.target.value);
  }, []);

  const handleImageChange = useCallback((base64Image: string) => {
    setImage(base64Image);
  }, []);

  useEffect(() => {
    onDataChange({ title, description, description2, btn_text, image });
  }, [title, description, description2, btn_text, image, onDataChange]);

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-700 mb-5 border-b pb-3 border-gray-200">Her Zaman Bir Adım Önde</h2>
      <div className="space-y-5">
        <div>
          <label htmlFor="alwaysAheadTitle" className="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
          <input 
            type="text" 
            id="alwaysAheadTitle" 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Her Zaman Bir Adım Önde"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="alwaysAheadDescription" className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
          <textarea 
            id="alwaysAheadDescription" 
            rows={3} 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Her zaman bir adım önde olma stratejimiz hakkında açıklama"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="alwaysAheadDescription2" className="block text-sm font-medium text-gray-700 mb-1">Açıklama 2</label>
          <input 
            type="text" 
            id="alwaysAheadDescription2" 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Açıklama 2"
            value={description2}
            onChange={handleDescription2Change}
          />
        </div>
        <div>
          <label htmlFor="alwaysAheadButtonText" className="block text-sm font-medium text-gray-700 mb-1">Buton Metni</label>
          <input 
            type="text" 
            id="alwaysAheadButtonText" 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Tüm Ürünler"
            value={btn_text}
            onChange={handleBtn_textChange}
          />
        </div>
        <div className="mt-4 max-w-80 aspect-square">
          <ImageUpload onImageChange={handleImageChange} id="alwaysAheadImage" initialImageUrl={image} />
        </div>
      </div>
    </div>
  );
} 