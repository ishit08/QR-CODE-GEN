import prisma from '../../../db/db';
import bcrypt from 'bcryptjs';
import { NextResponse } from "next/server";

export async function POST(req, res) {

  try {
    const { name, email, password } = await req.json(); // Parse JSON body

    // Validate that required fields are present
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, {status: 400})
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, {status: 400})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword, // Store the hashed password
      },
    });

    return NextResponse.json({
      message: 'User created successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' });
  }
}


