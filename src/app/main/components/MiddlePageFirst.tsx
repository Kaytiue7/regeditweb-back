'use client';

import React, { useState, useEffect, useCallback } from 'react';
import ImageUpload from '@/tools/ImageUpload';

interface MiddlePageFirstProps {
  onDataChange: (data: { title: string; description: string, description2: string, title2: string, description3: string, image: string }) => void;
  initialData?: { title: string; description: string, description2: string, title2: string, description3: string, image: string };
}

export default function MiddlePageFirst({ onDataChange, initialData }: MiddlePageFirstProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [description2, setDescription2] = useState(initialData?.description2 || '');
  const [title2, setTitle2] = useState(initialData?.title2 || '');
  const [description3, setDescription3] = useState(initialData?.description3 || '');
  const [image, setImage] = useState(initialData?.image || '');

  // initialData değiştiğinde state'leri güncellemek için useEffect
  useEffect(() => {
    setTitle(initialData?.title || '');
    setDescription(initialData?.description || '');
    setDescription2(initialData?.description2 || '');
    setTitle2(initialData?.title2 || '');
    setDescription3(initialData?.description3 || '');
    setImage(initialData?.image || '');
  }, [initialData]);

  // Bileşen state'i değiştiğinde üst bileşene haber ver
  useEffect(() => {
    onDataChange({ title, description, description2, title2, description3, image });
  }, [title, description, description2, title2, description3, image, onDataChange]);

  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  const handleDescriptionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  }, []);

  const handleDescription2Change = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription2(e.target.value);
  }, []);

  const handleTitle2Change = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle2(e.target.value);
  }, []);

  const handleDescription3Change = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription3(e.target.value);
  }, []);

  const handleImageChange = useCallback((base64Image: string) => {
    setImage(base64Image);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-700 mb-5 border-b pb-3 border-gray-200">Ürettiğimiz Ürünler</h2>
      <div className="space-y-5">
        <div>
          <label htmlFor="whatWeProduceTitle" className="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
          <input 
            type="text" 
            id="whatWeProduceTitle" 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Ürettiğimiz Ürünler"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="whatWeProduceDescription" className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
          <textarea 
            id="whatWeProduceDescription" 
            rows={3} 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Ürettiğimiz ürünler hakkında açıklama"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="whatWeProduceDescription2" className="block text-sm font-medium text-gray-700 mb-1">Açıklama 2</label>
          <textarea 
            id="whatWeProduceDescription2" 
            rows={3} 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Güvenilir teknoloji ve sektördeki deneyimimizle işletmelerin ödeme süreçlerini iyileştirmeyi hedefliyoruz."
            value={description2}
            onChange={handleDescription2Change}
          ></textarea>
        </div>

        <div>
          <label htmlFor="whatWeProduceTitle2" className="block text-sm font-medium text-gray-700 mb-1">Başlık 2</label>
          <input 
            type="text" 
            id="whatWeProduceTitle2" 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Kaliteli Kiosk Cihazlarımızla Tanışın!"
            value={title2}
            onChange={handleTitle2Change}
          />
        </div>
        <div>
          <label htmlFor="whatWeProduceDescription3" className="block text-sm font-medium text-gray-700 mb-1">Açıklama 3</label>
          <textarea 
            id="whatWeProduceDescription3" 
            rows={3} 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Yüksek performanslı, dayanıklı ve kullanım kolaylığıyla öne çıkan cihazlarımız, restoran operasyonlarınızı hızlandırmak ve müşterilerinize kusursuz bir deneyim sunmak için tasarlandı. Kaliteden ödün vermeyen yapısıyla, uzun ömürlü ve güvenilir çözümler sunuyoruz."
            value={description3}
            onChange={handleDescription3Change}          
          ></textarea>
        </div>

        <div className="mt-4 max-w-80 aspect-square">
          <ImageUpload onImageChange={handleImageChange} id="whatWeProduceImage" initialImageUrl={image} />
        </div>
      </div>
    </div>
  );
} 