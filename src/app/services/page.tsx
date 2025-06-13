"use client";

import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import ServiceModal from './components/ServiceModal';

interface Service {
  id: number;
  title: string;
  image: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newService, setNewService] = useState({
    title: '',
    image: ''
  });

  // Servisleri yükle
  const loadServices = async () => {
    try {
      const response = await fetch('/api/services');
      const data = await response.json();
      if (response.ok) {
        setServices(data);
      } else {
        toast.error(data.error || 'Servisler yüklenemedi');
      }
    } catch (error) {
      toast.error('Servisler yüklenirken bir hata oluştu');
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  // Servis ekle
  const handleAddService = async () => {
    try {
      const response = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newService),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Servis başarıyla eklendi');
        setIsModalOpen(false);
        setNewService({ title: '', image: '' });
        loadServices();
      } else {
        toast.error(data.error || 'Servis eklenemedi');
      }
    } catch (error) {
      toast.error('Servis eklenirken bir hata oluştu');
    }
  };

  // Servis sil
  const handleDeleteService = async (id: number) => {
    if (!confirm('Bu servisi silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch(`/api/services?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Servis başarıyla silindi');
        loadServices();
      } else {
        toast.error(data.error || 'Servis silinemedi');
      }
    } catch (error) {
      toast.error('Servis silinirken bir hata oluştu');
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Örnek Projeler</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-950 text-white rounded-md hover:bg-blue-900 transition-colors"
        >
          Yeni Proje Ekle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-800">{service.title}</h3>
              </div>
              <button
                onClick={() => handleDeleteService(service.id)}
                className="text-red-500 hover:text-red-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
            {service.image && (
              <div className="mt-4">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover rounded-md"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setNewService({ title: '', image: '' });
        }}
        onSave={handleAddService}
        service={newService}
        setService={setNewService}
      />

    </div>
  );
} 