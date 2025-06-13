"use client";

import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import ProductModal from './components/ProductModal';
import ProductGalleryModal from './components/ProductGalleryModal';

interface Product {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  category: {
    id: string;
    name: string;
  };
  images: {
    id: string;
    url: string;
    isDefault: boolean;
  }[];
}

interface Category {
  id: string;
  name: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    categoryId: '',
    images: [] as { img: string; default: boolean }[]
  });

  // Ürünleri ve kategorileri yükle
  const loadData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/categories')
      ]);

      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();

      if (productsRes.ok && categoriesRes.ok) {
        setProducts(productsData);
        setCategories(categoriesData);
      } else {
        toast.error('Veriler yüklenirken bir hata oluştu');
      }
    } catch (error) {
      toast.error('Veriler yüklenirken bir hata oluştu');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Ürün ekle
  const handleAddProduct = async () => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Ürün başarıyla eklendi');
        setIsModalOpen(false);
        setNewProduct({ name: '', description: '', categoryId: '', images: [] });
        loadData();
      } else {
        toast.error(data.error || 'Ürün eklenemedi');
      }
    } catch (error) {
      toast.error('Ürün eklenirken bir hata oluştu');
    }
  };

  // Ürün sil
  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Bu ürünü silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Ürün başarıyla silindi');
        loadData();
      } else {
        toast.error(data.error || 'Ürün silinemedi');
      }
    } catch (error) {
      toast.error('Ürün silinirken bir hata oluştu');
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsGalleryModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Ürünler</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-950 text-white rounded-md hover:bg-blue-900 transition-colors"
        >
          Yeni Ürün Ekle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => {
          const defaultImage = product.images.find(img => img.isDefault) || product.images[0];
          
          return (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-800">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.category.name}</p>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteProduct(product.id);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              {defaultImage && (
                <div className="mt-4">
                  <img
                    src={defaultImage.url}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded-md"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setNewProduct({ name: '', description: '', categoryId: '', images: [] });
        }}
        onSave={handleAddProduct}
        product={newProduct}
        setProduct={setNewProduct}
        categories={categories}
      />

      <ProductGalleryModal
        product={selectedProduct}
        isOpen={isGalleryModalOpen}
        onClose={() => {
          setIsGalleryModalOpen(false);
          setSelectedProduct(null);
        }}
      />
    </div>
  );
} 