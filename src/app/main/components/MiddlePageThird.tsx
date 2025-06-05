'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface MiddlePageThirdProps {
  onDataChange: (data: { description: string; btn_text: string }) => void;
  initialData?: { description: string; btn_text: string };
}

export default function MiddlePageThird({ onDataChange, initialData }: MiddlePageThirdProps) {
  
  const [description, setDescription] = useState(initialData?.description || '');
  const [btn_text, setBtn_text] = useState(initialData?.btn_text || '');

  useEffect(() => {
    setDescription(initialData?.description || '');
    setBtn_text(initialData?.btn_text || '');
  }, [initialData]);

  const handleBtn_textChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setBtn_text(e.target.value);
  }, []);

  const handleDescriptionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  }, []);

  useEffect(() => {
    onDataChange({ description, btn_text });
  }, [description, btn_text, onDataChange]);

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-700 mb-5 border-b pb-3 border-gray-200">Neden Biz?</h2>
      <div className="space-y-5">
        
        <div>
          <label htmlFor="whyUsDescription" className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
          <textarea 
            id="whyUsDescription" 
            rows={3} 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Neden bizi tercih etmelisiniz?"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
        </div>

        <div>
          <label htmlFor="whyUsTitle" className="block text-sm font-medium text-gray-700 mb-1">Buton Metni</label>
          <input 
            type="text" 
            id="whyUsTitle" 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Neden Biz?"
            value={btn_text}
            onChange={handleBtn_textChange}
          />
        </div>
      </div>
    </div>
  );
} 