"use client";

import React from 'react';
import ImageUpload from '@/tools/ImageUpload';

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
    image: string;
  };
  setProduct: React.Dispatch<React.SetStateAction<{
    name: string;
    description: string;
    categoryId: string;
    image: string;
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
  const handleImageChange = (base64Image: string) => {
    setProduct(prev => ({ ...prev, image: base64Image }));
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
        className={`fixed right-0 top-0 h-full min-w-64 max-w-1/4 bg-white shadow-lg
          transform transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800 transform transition-all duration-300
              ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}">
              Yeni Ürün Ekle
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
              placeholder="Ürün Adı"
              value={product.name}
              onChange={(e) => setProduct(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                transform transition-all duration-300 hover:border-blue-500"
            />
            <textarea
              placeholder="Ürün Açıklaması"
              value={product.description}
              onChange={(e) => setProduct(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                transform transition-all duration-300 hover:border-blue-500"
            />
            <select
              value={product.categoryId}
              onChange={(e) => setProduct(prev => ({ ...prev, categoryId: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                transform transition-all duration-300 hover:border-blue-500"
            >
              <option value="">Kategori Seçin</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            
            {/* Image Upload Section */}
            <div className="space-y-2">
              <ImageUpload
                onImageChange={handleImageChange}
                id="product-image"
                initialImageUrl={product.image}
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md
                  transform transition-all duration-200 hover:scale-105"
              >
                İptal
              </button>
              <button
                onClick={onSave}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-950 hover:bg-blue-900 rounded-md
                  transform transition-all duration-200 hover:scale-105"
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 