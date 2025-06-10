"use client";

import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import CategoryModal from '../components/CategoryModal';

interface Category {
  id: string;
  name: string;
  image?: string;
  products: any[];
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', image: '' });

  // Kategorileri yükle
  const loadCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      if (response.ok) {
        setCategories(data);
      } else {
        toast.error(data.error || 'Kategoriler yüklenemedi');
      }
    } catch (error) {
      toast.error('Kategoriler yüklenirken bir hata oluştu');
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // Kategori ekle
  const handleAddCategory = async () => {
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCategory),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Kategori başarıyla eklendi');
        setIsModalOpen(false);
        setNewCategory({ name: '', image: '' });
        loadCategories();
      } else {
        toast.error(data.error || 'Kategori eklenemedi');
      }
    } catch (error) {
      toast.error('Kategori eklenirken bir hata oluştu');
    }
  };

  // Kategori sil
  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch(`/api/categories?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Kategori başarıyla silindi');
        loadCategories();
      } else {
        toast.error(data.error || 'Kategori silinemedi');
      }
    } catch (error) {
      toast.error('Kategori silinirken bir hata oluştu');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Kategoriler</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-950 text-white rounded-md hover:bg-blue-900 transition-colors"
        >
          Yeni Kategori Ekle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-800">{category.name}</h3>
                <p className="text-sm text-gray-500">
                  {category.products.length} ürün
                </p>
              </div>
              <button
                onClick={() => handleDeleteCategory(category.id)}
                className="text-red-500 hover:text-red-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
            {category.image && (
              <div className="mt-4">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-32 object-cover rounded-md"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setNewCategory({ name: '', image: '' });
        }}
        onSave={handleAddCategory}
        category={newCategory}
        setCategory={setNewCategory}
      />
    </div>
  );
} 