'use client';

import React, { useState, useEffect, useCallback } from 'react';
 


interface CompanyInfoProps {
  onDataChange: (data: {title: string; description: string, title2: string; description2: string, title3: string; description3: string, title4: string; description4: string, title5: string; description5: string, title6: string; description6: string}) => void;
  initialData?: {title: string; description: string, title2: string; description2: string, title3: string; description3: string, title4: string; description4: string, title5: string; description5: string, title6: string; description6: string};
}

export default function CompanyInfo({ onDataChange, initialData }: CompanyInfoProps) {

  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  
  const [title2, setTitle2] = useState(initialData?.title2 || '');
  const [description2, setDescription2] = useState(initialData?.description2 || '');

  const [title3, setTitle3] = useState(initialData?.title3 || '');
  const [description3, setDescription3] = useState(initialData?.description3 || '');

  const [title4, setTitle4] = useState(initialData?.title4 || '');
  const [description4, setDescription4] = useState(initialData?.description4 || '');

  const [title5, setTitle5] = useState(initialData?.title5 || '');
  const [description5, setDescription5] = useState(initialData?.description5 || '');

  const [title6, setTitle6] = useState(initialData?.title6 || '');
  const [description6, setDescription6] = useState(initialData?.description6 || '');

  // initialData veya bileşen state'i değiştiğinde onDataChange'i çağır
  useEffect(() => {
    // initialData geldiğinde state'leri güncelle
    setTitle(initialData?.title || '');
    setDescription(initialData?.description || '');
    setTitle2(initialData?.title2 || '');
    setDescription2(initialData?.description2 || '');
    setTitle3(initialData?.title3 || '');
    setDescription3(initialData?.description3 || '');
    setTitle4(initialData?.title4 || '');
    setDescription4(initialData?.description4 || '');
    setTitle5(initialData?.title5 || '');
    setDescription5(initialData?.description5 || '');
    setTitle6(initialData?.title6 || '');
    setDescription6(initialData?.description6 || '');
  }, [initialData]);

   useEffect(() => {
    // Bileşen state'i değiştiğinde üst bileşene haber ver
     onDataChange({
      title, description, title2, description2, title3, description3, title4, description4, title5, description5, title6, description6
    });
   }, [title, description, title2, description2, title3, description3, title4, description4, title5, description5, title6, description6, onDataChange]);

  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  const handleDescriptionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  }, []); 

  const handleTitle2Change  = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle2(e.target.value);
  }, []);

  const handleDescription2Change  = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription2(e.target.value);
  }, []);

  const handleTitle3Change  = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle3(e.target.value);
  }, []);

  const handleDescription3Change  = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription3(e.target.value);
  }, []);

  const handleTitle4Change  = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle4(e.target.value);
  }, []);

  const handleDescription4Change  = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription4(e.target.value);
  }, []);

  const handleTitle5Change = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle5(e.target.value);
  }, []);

  const handleDescription5Change = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription5(e.target.value);
  }, []);

  const handleTitle6Change = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle6(e.target.value);
  }, []);

  const handleDescription6Change = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription6(e.target.value);
  }, []); 

  return (
 
      <div className='space-y-4'>
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-5 border-b pb-3 border-gray-200">Hızlı Yanıt</h2>
          <div className="space-y-5">
            <div>
              <label htmlFor="fastResponseTitle" className="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
              <input 
                type="text" 
                id="fastResponseTitle" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="Hızlı Yanıt"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div>
              <label htmlFor="fastResponseDescription" className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
              <textarea 
                id="fastResponseDescription" 
                rows={3} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="Önceliğimiz müşterilerimize her durumda hızlı yanıt verip hızla çözüm üretmek."
                value={description}
                onChange={handleDescriptionChange}
              ></textarea>
            </div>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Section: Ürün Garantisi */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-5 border-b pb-3 border-gray-200">Ürün Garantisi</h2>
          <div className="space-y-5">
            <div>
              <label htmlFor="productWarrantyTitle" className="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
              <input 
                type="text" 
                id="productWarrantyTitle" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="Ürün Garantisi"
                value={title2}
                onChange={handleTitle2Change}
              />
            </div>
            <div>
              <label htmlFor="productWarrantyDescription" className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
              <textarea 
                id="productWarrantyDescription" 
                rows={3} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="Ürünlerimiz firmamızın teknik servisinin garantisi altındadır."
                value={description2}
                onChange={handleDescription2Change}
              ></textarea>
            </div>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Section: Kalıcı Çözümler */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-5 border-b pb-3 border-gray-200">Kalıcı Çözümler</h2>
          <div className="space-y-5">
            <div>
              <label htmlFor="permanentSolutionsTitle" className="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
              <input 
                type="text" 
                id="permanentSolutionsTitle" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="Kalıcı Çözümler"
                value={title3}
                onChange={handleTitle3Change}
              />
            </div>
            <div>
              <label htmlFor="permanentSolutionsDescription" className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
              <textarea 
                id="permanentSolutionsDescription" 
                rows={3} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="Uçtan uca çözüm sunuyor, çözümlerimizin kalıcılığına önem gösteriyoruz."
                value={description3}
                onChange={handleDescription3Change}
              ></textarea>
            </div>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Section: Geniş Ürün Portföyü */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-5 border-b pb-3 border-gray-200">Geniş Ürün Portföyü</h2>
          <div className="space-y-5">
            <div>
              <label htmlFor="wideProductPortfolioTitle" className="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
              <input 
                type="text" 
                id="wideProductPortfolioTitle" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="Geniş Ürün Portföyü"
                value={title4}
                onChange={handleTitle4Change}
              />
            </div>
            <div>
              <label htmlFor="wideProductPortfolioDescription" className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
              <textarea 
                id="wideProductPortfolioDescription" 
                rows={3} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="Geniş ürün yelpazemiz ile, tüm ihtiyaçlarınızda yanınızdayız."
                value={description4}
                onChange={handleDescription4Change}
              ></textarea>
            </div>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Section: Kurulum Hizmeti */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-5 border-b pb-3 border-gray-200">Kurulum Hizmeti</h2>
          <div className="space-y-5">
            <div>
              <label htmlFor="installationServiceTitle" className="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
              <input 
                type="text" 
                id="installationServiceTitle" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="Kurulum Hizmeti"
                value={title5}
                onChange={handleTitle5Change}
              />
            </div>
            <div>
              <label htmlFor="installationServiceDescription" className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
              <textarea 
                id="installationServiceDescription" 
                rows={3} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="Projeleriniz baştan sonra anahtar teslim olacak şekilde tamamlanır."
                value={description5}
                onChange={handleDescription5Change}
              ></textarea>
            </div>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Section: Yerinde Teknik Servis */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-5 border-b pb-3 border-gray-200">Yerinde Teknik Servis</h2>
          <div className="space-y-5">
            <div>
              <label htmlFor="onsiteTechnicalServiceTitle" className="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
              <input 
                type="text" 
                id="onsiteTechnicalServiceTitle" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="Yerinde Teknik Servis"
                value={title6}
                onChange={handleTitle6Change}
              />
            </div>
            <div>
              <label htmlFor="onsiteTechnicalServiceDescription" className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
              <textarea 
                id="onsiteTechnicalServiceDescription" 
                rows={3} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="Arızalı cihazlarınıza yerinde müdahale ediyor, operasyonunuzu aksatmıyoruz."
                value={description6}
                onChange={handleDescription6Change}
              ></textarea>
            </div>
          </div>
        </div> 
      </div>
 
  );
} 