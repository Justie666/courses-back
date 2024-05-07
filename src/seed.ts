import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const PROJECTS = [{ title: 'RUTS' }, { title: 'Мерч Lad' }]

async function main() {
  PROJECTS.forEach(async project => {
    await prisma.project.create({
      data: {
        ...project,
      },
    })
  })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
