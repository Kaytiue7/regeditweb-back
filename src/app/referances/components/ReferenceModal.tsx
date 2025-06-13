"use client";

import React, { useState } from 'react';
import ImageUpload from '@/tools/ImageUpload';

interface ReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  reference: {
    title: string;
    image: string;
  };
  setReference: React.Dispatch<React.SetStateAction<{
    title: string;
    image: string;
  }>>;
}

export default function ReferenceModal({
  isOpen,
  onClose,
  onSave,
  reference,
  setReference
}: ReferenceModalProps) {
  const [isSaving, setIsSaving] = useState(false);

  const handleImageChange = (base64Image: string) => {
    setReference(prev => ({ ...prev, image: base64Image }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await onSave();
    setIsSaving(false);
  };

  return (
    <div
      className={`fixed inset-0 transition-all duration-300 ease-in-out
        ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      onClick={onClose}
    >
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      />
      <div
        className={`fixed right-0 top-0 h-full w-1/5 bg-white shadow-lg
          transform transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Yeni Referans Ekle
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transform transition-all duration-200 hover:rotate-90"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Referans Başlığı"
              value={reference.title}
              onChange={(e) => setReference(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="space-y-2">
              <ImageUpload
                onImageChange={handleImageChange}
                id="reference-image"
                initialImageUrl={reference.image}
              />
              {reference.image && (
                <div className="flex items-center gap-2">
                  <img src={reference.image} alt="Reference" className="w-16 h-16 object-cover rounded-md border" />
                </div>
              )}
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                İptal
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-950 hover:bg-blue-900 rounded-md flex items-center gap-2"
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Kaydediliyor...
                  </>
                ) : (
                  'Kaydet'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 