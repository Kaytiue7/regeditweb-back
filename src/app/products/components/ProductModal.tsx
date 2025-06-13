"use client";

import React, { useState } from 'react';
import ImageUpload from '@/tools/ImageUploadMulti';

interface Category {
  id: string;
  name: string;
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  product: {
    name: string;
    description: string;
    categoryId: string;
    images: { img: string; default: boolean }[];
  };
  setProduct: React.Dispatch<React.SetStateAction<{
    name: string;
    description: string;
    categoryId: string;
    images: { img: string; default: boolean }[];
  }>>;
  categories: Category[];
}

export default function ProductModal({ 
  isOpen, 
  onClose, 
  onSave,
  product,
  setProduct,
  categories
}: ProductModalProps) {
  const [isSaving, setIsSaving] = useState(false);

  const handleImageChange = (base64Image: string) => {
    setProduct(prev => {
      const isDefault = prev.images.length === 0;
      return {
        ...prev,
        images: [...prev.images, { img: base64Image, default: isDefault }]
      };
    });
  };

  const handleDefaultChange = (index: number) => {
    setProduct(prev => ({
      ...prev,
      images: prev.images.map((img, i) => ({
        ...img,
        default: i === index
      }))
    }));
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
              Yeni Ürün Ekle
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
              placeholder="Ürün Adı"
              value={product.name}
              onChange={(e) => setProduct(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Ürün Açıklaması"
              value={product.description}
              onChange={(e) => setProduct(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={product.categoryId}
              onChange={(e) => setProduct(prev => ({ ...prev, categoryId: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Kategori Seçin</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Çoklu Görsel Yükleme */}
            <div className="space-y-2">
              <ImageUpload
                onImageChange={handleImageChange}
                id="product-image"
              />
              {product.images.map((img, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <img src={img.img} alt={`Image ${idx}`} className="w-16 h-16 object-cover rounded-md border" />
                  <label className="flex items-center gap-1 text-sm">
                    <input
                      type="radio"
                      name="defaultImage"
                      checked={img.default}
                      onChange={() => handleDefaultChange(idx)}
                    />
                    Varsayılan
                  </label>
                </div>
              ))}
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
