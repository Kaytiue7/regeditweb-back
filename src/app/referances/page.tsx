"use client";

import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import ReferenceModal from './components/ReferenceModal';

interface Reference {
  id: number;
  title: string;
  image: string;
}

export default function ReferencesPage() {
  const [references, setReferences] = useState<Reference[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReference, setNewReference] = useState({
    title: '',
    image: ''
  });

  // Referansları yükle
  const loadReferences = async () => {
    try {
      const response = await fetch('/api/references');
      const data = await response.json();
      if (response.ok) {
        setReferences(data);
      } else {
        toast.error(data.error || 'Referanslar yüklenemedi');
      }
    } catch (error) {
      toast.error('Referanslar yüklenirken bir hata oluştu');
    }
  };

  useEffect(() => {
    loadReferences();
  }, []);

  // Referans ekle
  const handleAddReference = async () => {
    try {
      const response = await fetch('/api/references', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReference),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Referans başarıyla eklendi');
        setIsModalOpen(false);
        setNewReference({ title: '', image: '' });
        loadReferences();
      } else {
        toast.error(data.error || 'Referans eklenemedi');
      }
    } catch (error) {
      toast.error('Referans eklenirken bir hata oluştu');
    }
  };

  // Referans sil
  const handleDeleteReference = async (id: number) => {
    if (!confirm('Bu referansı silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch(`/api/references?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Referans başarıyla silindi');
        loadReferences();
      } else {
        toast.error(data.error || 'Referans silinemedi');
      }
    } catch (error) {
      toast.error('Referans silinirken bir hata oluştu');
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Referanslar</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-950 text-white rounded-md hover:bg-blue-900 transition-colors"
        >
          Yeni Referans Ekle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {references.map((reference) => (
          <div
            key={reference.id}
            className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-800">{reference.title}</h3>
              </div>
              <button
                onClick={() => handleDeleteReference(reference.id)}
                className="text-red-500 hover:text-red-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
            {reference.image && (
              <div className="mt-4">
                <img
                  src={reference.image}
                  alt={reference.title}
                  className="w-full h-48 object-cover rounded-md"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <ReferenceModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setNewReference({ title: '', image: '' });
        }}
        onSave={handleAddReference}
        reference={newReference}
        setReference={setNewReference}
      />
    </div>
  );
} 