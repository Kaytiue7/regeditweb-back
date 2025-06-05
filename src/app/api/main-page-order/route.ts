import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { orders } = await request.json();

    if (!orders || !Array.isArray(orders)) {
      return NextResponse.json(
        { success: false, error: 'Invalid request data' },
        { status: 400 }
      );
    }

    // Önce mevcut sıralamaları temizle
    await prisma.$transaction(async (tx) => {
      await tx.mainPageOrder.deleteMany({});

      // Yeni sıralamaları ekle
      await tx.mainPageOrder.createMany({
        data: orders.map((order: any) => ({
          sectionId: order.sectionId,
          sectionName: order.sectionName,
          order: order.order,
          isVisible: order.isVisible,
        })),
      });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const orders = await prisma.mainPageOrder.findMany({
      orderBy: {
        order: 'asc',
      },
    });

    return NextResponse.json({ success: true, data: orders });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 