'use client';

import React, { useState, useCallback, useEffect } from 'react';

import Begining from './components/Begining';
import MiddlePageFirst from './components/MiddlePageFirst';
import MiddlePageSecond from './components/MiddlePageSecond';
import MiddlePageThird from './components/MiddlePageThird';
import CompanyInfo from './components/CompanyInfo';

import SaveButton from '@/components/SaveButton';

export default function MainPageContent() {
  const [beginingData, setBeginingData] = useState({ title: '', description: '', });
  const [middlePageFirstData, setMiddlePageFirstData] = useState({ title: '', description: '', description2: '', title2: '', description3: '', image: '' });
  const [middlePageSecondData, setMiddlePageSecondData] = useState({ title: '', description: '', description2: '', btn_text: '', image: '' });
  const [middlePageThirdData, setMiddlePageThirdData] = useState({ description: '', btn_text: '' });
  const [companyInfoData, setCompanyInfoData] = useState({title: '', description: '', title2: '', description2: '',title3: '', description3: '',title4: '', description4: '',title5: '', description5: '',title6: '', description6: ''});

  // Verileri çekmek için useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/get-main-page');
        if (response.ok) {
          const data = await response.json();
          // Gelen veriyi state'lere yükle
          if (data['main-begining']) setBeginingData(data['main-begining']);
          if (data['main-middle-first']) setMiddlePageFirstData(data['main-middle-first']);
          if (data['main-middle-second']) setMiddlePageSecondData(data['main-middle-second']);
          if (data['main-middle-third']) setMiddlePageThirdData(data['main-middle-third']);
          if (data['main-company-info']) setCompanyInfoData(data['main-company-info']);

          console.log('Data fetched successfully!', data);
        } else {
          console.error('Failed to fetch data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Boş dependency array, sadece sayfa yüklendiğinde çalışır

  const handleBeginingDataChange = useCallback((data: { title: string; description: string }) => {
    setBeginingData(data);
  }, []);

  const handleMiddlePageFirstDataChange = useCallback((data: { title: string; description: string; description2: string; title2: string; description3: string; image: string }) => {
    setMiddlePageFirstData(data);
  }, []);

  const handleMiddlePageSecondDataChange = useCallback((data: { title: string; description: string; description2: string; btn_text: string; image: string }) => {
    setMiddlePageSecondData(data);
  }, []);

  const handleMiddlePageThirdDataChange = useCallback((data: { description: string; btn_text: string }) => {
    setMiddlePageThirdData(data);
  }, []);

  const handleCompanyInfoDataChange = useCallback((data: {title: string; description: string, title2: string; description2: string, title3: string; description3: string, title4: string; description4: string, title5: string; description5: string, title6: string; description6: string}) => {
    setCompanyInfoData(data);
  }, []);

  const handleSave = async () => {
    const pageData = {
      Begining: beginingData,
      MiddlePageFirst: middlePageFirstData,
      MiddlePageSecond: middlePageSecondData,
      MiddlePageThird: middlePageThirdData,
      CompanyInfo: companyInfoData,
    };

    console.log('Saving data:', pageData);

    try {
      const response = await fetch('/api/save-main-page', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pageData),
      });

      if (response.ok) {
        console.log('Data saved successfully!');
        alert('Veriler başarıyla kaydedildi!');
      } else {
        console.error('Failed to save data:', response.statusText);
        alert('Veri kaydedilirken bir hata oluştu.');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Veri kaydedilirken bir hata oluştu.');
    }
  };

  return (
    <div className="p-2 md:p-4 min-h-screen">
      <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-8">İçerik Yönetimi</h1>

      <div className="bg-white space-y-8">
        <Begining 
          onDataChange={handleBeginingDataChange}
          initialData={beginingData}
        />
        <hr className="border-gray-200" />
        
        <MiddlePageFirst 
          onDataChange={handleMiddlePageFirstDataChange}
          initialData={middlePageFirstData}
        />
        <hr className="border-gray-200" />
        
        <MiddlePageSecond 
          onDataChange={handleMiddlePageSecondDataChange}
          initialData={middlePageSecondData}
        />
        <hr className="border-gray-200" />
        
        <MiddlePageThird 
          onDataChange={handleMiddlePageThirdDataChange}
          initialData={middlePageThirdData}
        />
        <hr className="border-gray-200" />
        
        <CompanyInfo 
          onDataChange={handleCompanyInfoDataChange}
          initialData={companyInfoData}
        />

        <div onClick={handleSave} className="mt-10 flex justify-end fixed bottom-5 right-5">
          <SaveButton/>
        </div>
      </div>
    </div>
  );
} 