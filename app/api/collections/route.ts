// photo-platform/app/api/collections/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, userId, clientName, clientEmail } = body;

    // TODO: Implement real authentication. Getting userId from the body is insecure.
    // In a real application, you would get the userId from a server-side session.
    if (!userId) {
      return new NextResponse('Autentifikacija yra privaloma', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Kolekcijos pavadinimas yra privalomas', { status: 400 });
    }

    // Use a transaction to ensure both operations succeed or fail together.
    const newCollection = await prisma.$transaction(async (tx) => {
      // 1. Create the new collection
      const collection = await tx.collection.create({
        data: {
          name,
          userId,
          clientName,
          clientEmail,
          status: 'DRAFT', // Default status
        },
      });

      // 2. Increment the user's collectionsCreatedCount
      await tx.user.update({
        where: { id: userId },
        data: {
          collectionsCreatedCount: {
            increment: 1,
          },
        },
      });

      return collection;
    });

    return NextResponse.json(newCollection, { status: 201 });

  } catch (error) {
    console.error('Kolekcijos kūrimo klaida:', error);
    // Handle cases where the user might not exist
    if (error instanceof Error && error.message.includes('Foreign key constraint failed')) {
        return new NextResponse('Nurodytas vartotojas neegzistuoja', { status: 404 });
    }
    return new NextResponse('Vidinė serverio klaida', { status: 500 });
  }
}
