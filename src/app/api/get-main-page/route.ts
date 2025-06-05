import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // mainpagesections tablosundaki tüm kayıtları çek
    const sections = await prisma.mainPageSection.findMany();

    // Veriyi bölümlere göre yeniden yapılandır
    const pageData: { [key: string]: any } = {};
    sections.forEach((section: { sectionName: string; content: any }) => {
      // section.sectionName anahtarını kullanarak veriyi ata
      // Örneğin: { 'main-begining': { title: '...', description: '...' } }
      pageData[section.sectionName] = section.content;
    });

    return NextResponse.json(pageData, { status: 200 });
  } catch (error) {
    console.error('Error fetching data from database with Prisma:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
} 