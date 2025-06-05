import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const pageData = await request.json();

    // Her bir bölüm için veriyi kaydetme/güncelleme (upsert kullanarak)
    if (pageData.Begining) {
      await prisma.mainPageSection.upsert({
        where: { sectionName: 'main-begining' },
        update: { content: pageData.Begining },
        create: { sectionName: 'main-begining', content: pageData.Begining },
      });
    }

    if (pageData.MiddlePageFirst) {
       await prisma.mainPageSection.upsert({
        where: { sectionName: 'main-middle-first' },
        update: { content: pageData.MiddlePageFirst },
        create: { sectionName: 'main-middle-first', content: pageData.MiddlePageFirst },
      });
    }

    if (pageData.MiddlePageSecond) {
        await prisma.mainPageSection.upsert({
        where: { sectionName: 'main-middle-second' },
        update: { content: pageData.MiddlePageSecond },
        create: { sectionName: 'main-middle-second', content: pageData.MiddlePageSecond },
      });
    }

    if (pageData.MiddlePageThird) {
       await prisma.mainPageSection.upsert({
        where: { sectionName: 'main-middle-third' },
        update: { content: pageData.MiddlePageThird },
        create: { sectionName: 'main-middle-third', content: pageData.MiddlePageThird },
      });
    }

     if (pageData.CompanyInfo) {
       // CompanyInfo verilerini Prisma upsert kullanarak kaydetme/güncelleme
       await prisma.mainPageSection.upsert({
        where: { sectionName: 'main-company-info' },
        update: { content: pageData.CompanyInfo },
        create: { sectionName: 'main-company-info', content: pageData.CompanyInfo },
      });
    }


    return NextResponse.json({ message: 'Data saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error saving data to database with Prisma:', error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}