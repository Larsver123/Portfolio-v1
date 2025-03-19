import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Check if the current user is an admin
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (currentUser?.role !== 'admin') {
      return new NextResponse('Forbidden', { status: 403 });
    }

    const body = await request.json();
    const { isApproved } = body;

    if (typeof isApproved !== 'boolean') {
      return new NextResponse('Invalid request body', { status: 400 });
    }

    const user = await prisma.user.update({
      where: {
        id: params.id,
      },
      data: {
        isApproved,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log('[USER_APPROVE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
} 