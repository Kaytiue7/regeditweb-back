import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const sections = await prisma.mainPageSection.findMany({
      orderBy: {
        order: 'asc',
      },
    });

    return NextResponse.json({ success: true, data: sections });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { orders } = await request.json();

    if (!orders || !Array.isArray(orders)) {
      return NextResponse.json(
        { success: false, error: 'Invalid request data' },
        { status: 400 }
      );
    }

    // Her bir bölümü güncelle
    for (const order of orders) {
      await prisma.mainPageSection.update({
        where: {
          sectionName: order.sectionName,
        },
        data: {
          order: order.order,
          isVisible: order.isVisible,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 