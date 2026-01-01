// photo-platform/app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Naudojame globalų Prisma klientą
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name, country } = body;

    if (!email || !password) {
      return new NextResponse('El. paštas ir slaptažodis yra privalomi', { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new NextResponse('Vartotojas su tokiu el. paštu jau egzistuoja', { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        country,
      },
    });

    return NextResponse.json({ id: user.id, email: user.email }, { status: 201 });

  } catch (error) {
    console.error('Registracijos klaida:', error);
    return new NextResponse('Vidinė serverio klaida', { status: 500 });
  }
}
