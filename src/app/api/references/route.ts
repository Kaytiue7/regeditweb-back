import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const references = await prisma.reference.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    return NextResponse.json(references);
  } catch (error) {
    return NextResponse.json(
      { error: 'Referanslar yüklenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const reference = await prisma.reference.create({
      data: {
        title: body.title,
        image: body.image
      }
    });
    return NextResponse.json(reference);
  } catch (error) {
    return NextResponse.json(
      { error: 'Referans eklenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID parametresi gerekli' },
        { status: 400 }
      );
    }

    await prisma.reference.delete({
      where: {
        id: parseInt(id)
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Referans silinirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 