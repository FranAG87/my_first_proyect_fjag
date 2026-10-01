import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const tenant = await prisma.tenant.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Organizacion de prueba',
    },
  });

  // Contraseña ficticia para esta práctica.
  const passwordHash = await hash('Practica123!', 10);

  const usuarios = [
    {
      email: 'admin@example.com',
      name: 'Administrador de prueba',
      role: Role.ADMIN,
    },
    {
      email: 'usuario@example.com',
      name: 'Usuario de prueba',
      role: Role.USER,
    },
  ];

  for (const usuario of usuarios) {
    await prisma.user.upsert({
      where: { email: usuario.email },
      update: {},
      create: {
        ...usuario,
        password: passwordHash,
        tenantId: tenant.id,
      },
    });
  }

  console.log('Seed completado: organizacion y usuarios de prueba disponibles.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });