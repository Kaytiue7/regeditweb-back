import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/categories - Tüm kategorileri getir
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        products: true
      }
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Kategoriler yüklenirken hata:', error);
    return NextResponse.json(
      { error: 'Kategoriler yüklenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

// POST /api/categories - Yeni kategori ekle
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, image } = body;

    if (!name) {
      return NextResponse.json({ error: 'Kategori adı gerekli' }, { status: 400 });
    }

    const category = await prisma.category.create({
      data: {
        name,
        image
      }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error('Kategori eklenirken hata:', error);
    return NextResponse.json(
      { error: 'Kategori eklenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

// DELETE /api/categories - Kategori sil
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Kategori ID\'si gerekli' },
        { status: 400 }
      );
    }

    // Önce kategoriye ait ürünleri kontrol et
    const category = await prisma.category.findUnique({
      where: { id },
      include: { products: true }
    });

    if (category?.products.length) {
      return NextResponse.json(
        { error: 'Bu kategoriye ait ürünler var. Önce ürünleri silmelisiniz.' },
        { status: 400 }
      );
    }

    await prisma.category.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Kategori başarıyla silindi' });
  } catch (error) {
    console.error('Kategori silinirken hata:', error);
    return NextResponse.json(
      { error: 'Kategori silinirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 