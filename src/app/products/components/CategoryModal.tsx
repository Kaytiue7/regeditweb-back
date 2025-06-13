"use client";

import React, { useState } from 'react';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  category: {
    name: string;
    image: string;
  };
  setCategory: React.Dispatch<React.SetStateAction<{
    name: string;
    image: string;
  }>>;
}

export default function CategoryModal({ 
  isOpen, 
  onClose, 
  onSave,
  category,
  setCategory 
}: CategoryModalProps) {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave();
    } catch (error) {
      console.error('Kayıt hatası:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div 
      className={`fixed inset-0 transition-all duration-300 ease-in-out
        ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/30 transition-opacity duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      />
      
      {/* Modal */}
      <div 
        className={`fixed right-0 top-0 h-full w-1/5 bg-white shadow-lg
          transform transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Yeni Kategori Ekle
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transform transition-all duration-200
                hover:rotate-90"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Kategori Adı"
              value={category.name}
              onChange={(e) => setCategory(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                transform transition-all duration-300 hover:border-blue-500"
            />

            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md
                  transform transition-all duration-200 hover:scale-105"
              >
                İptal
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`px-4 py-2 text-sm font-medium text-white rounded-md
                  transform transition-all duration-200 hover:scale-105
                  ${isSaving ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-950 hover:bg-blue-900'}`}
              >
                {isSaving ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2 border-2 border-white rounded-full border-t-transparent" viewBox="0 0 24 24"></svg>
                    Kaydediliyor...
                  </div>
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