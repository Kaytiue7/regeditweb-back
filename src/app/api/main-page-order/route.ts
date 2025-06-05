import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { orders } = await request.json();

    // Önce mevcut sıralamaları temizle
    await prisma.mainPageOrder.deleteMany({});

    // Yeni sıralamaları ekle
    const savedOrders = await prisma.mainPageOrder.createMany({
      data: orders.map((order: any) => ({
        sectionId: order.sectionId,
        sectionName: order.sectionName,
        order: order.order,
        isVisible: order.isVisible,
      })),
    });

    return NextResponse.json({ success: true, data: savedOrders });
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