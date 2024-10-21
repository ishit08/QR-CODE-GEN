// import prisma from '../../lib/prisma';
// import bcrypt from 'bcryptjs';

// export async function POST(req) {
//   const { name, email, password } = await req.json();

//   if (!name || !email || !password) {
//     return new Response(JSON.stringify({ message: 'Name, email, and password are required' }), { status: 400 });
//   }

//   try {
//     const existingUser = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (existingUser) {
//       return new Response(JSON.stringify({ message: 'User already exists' }), { status: 400 });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await prisma.user.create({
//       data: {
//         name,
//         email,
//         password: hashedPassword,
//       },
//     });

//     return new Response(JSON.stringify({ message: 'User created successfully', userId: user.id }), { status: 201 });
//   } catch (error) {
//     console.error('Signup error:', error);
//     if (error.code === 'P2002') {
//       return new Response(JSON.stringify({ message: 'Email already in use' }), { status: 400 });
//     }
//     return new Response(JSON.stringify({ message: 'Something went wrong' }), { status: 500 });
//   }
// }
