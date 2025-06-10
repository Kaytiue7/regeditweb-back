import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/products - Tüm ürünleri getir
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        images: true
      }
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Ürünler getirilemedi' }, { status: 500 });
  }
}

// POST /api/products - Yeni ürün ekle
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, categoryId, image } = body;

    if (!name || !categoryId) {
      return NextResponse.json(
        { error: 'Ürün adı ve kategori ID gerekli' },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        categoryId,
        images: {
          create: image ? [{ url: image, isDefault: true }] : []
        }
      },
      include: {
        category: true,
        images: true
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Ürün eklenemedi' }, { status: 500 });
  }
}

// DELETE /api/products - Ürün sil
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Ürün ID gerekli' }, { status: 400 });
    }

    // Önce ürüne ait resimleri sil
    await prisma.image.deleteMany({
      where: { productId: id }
    });

    // Sonra ürünü sil
    await prisma.product.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Ürün başarıyla silindi' });
  } catch (error) {
    return NextResponse.json({ error: 'Ürün silinemedi' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, description, category, image } = body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        category: {
          connectOrCreate: {
            where: { name: category },
            create: { name: category },
          },
        },
        image: {
          deleteMany: {},
          create: image.map((img: { img: string; default: boolean }) => ({
            url: img.img,
            isDefault: img.default,
          })),
        },
      },
      include: {
        category: true,
        image: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Ürün güncellenirken bir hata oluştu' }, { status: 500 });
  }
} 