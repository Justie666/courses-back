import {
  Category,
  Course,
  Direction,
  PrismaClient,
  Project,
  RequestBackCall,
  User,
} from '@prisma/client'
import { Pick } from '@prisma/client/runtime/library'
const prisma = new PrismaClient()

const USERS: Omit<User, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: 'Nikita',
    email: 'admin@gmail.com',
    password:
      '$argon2id$v=19$m=65536,t=3,p=4$Ft3trngRE/TFpjcI0ceqcQ$FGydsLYSWXpumWFKEaBYAhkDxrPCl9Sd+XBZ+hV83M8',
    role: 'ADMIN',
  },
  {
    name: 'Илья',
    email: 'user@gmail.com',
    password:
      '$argon2id$v=19$m=65536,t=3,p=4$Ft3trngRE/TFpjcI0ceqcQ$FGydsLYSWXpumWFKEaBYAhkDxrPCl9Sd+XBZ+hV83M8',
    role: 'USER',
  },
]
const PROJECTS: Pick<Project, 'title'>[] = [
  { title: 'RUTS' },
  { title: 'Мерч Lad' },
]
const CATEGORIES: Pick<Category, 'title'>[] = [
  { title: 'FrontEnd' },
  { title: 'BackEnd' },
  { title: 'Git' },
  { title: 'JavaScript' },
  { title: 'PHP' },
]
const DIRECTIONS: Pick<Direction, 'title'>[] = [
  { title: 'FrontEnd' },
  { title: 'BackEnd' },
  { title: 'Аналитик' },
  { title: 'Project manager' },
  { title: 'Дизайнер' },
]
const REQUESTS_BACK_CALL: Pick<
  RequestBackCall,
  'name' | 'phone' | 'problem'
>[] = [
  { name: 'Никита', phone: '89203287766', problem: 'Проблема 1' },
  { name: 'Илья', phone: '89101587755', problem: 'Проблема 2' },
  { name: 'Наташа', phone: '89966587744', problem: 'Проблема 3' },
  { name: 'Даниил', phone: '89154387733', problem: 'Проблема 4' },
  { name: 'Сергей', phone: '89253987722', problem: 'Проблема 5' },
  { name: 'Максим', phone: '89998287711', problem: 'Проблема 6' },
  { name: 'Олег', phone: '89998136636', problem: 'Проблема 7' },
  { name: 'Никита', phone: '89108882766', problem: 'Проблема 8' },
]
const COURSES: Pick<Course, 'title' | 'slug'>[] = [
  { title: 'React Redux', slug: 'react_redux' },
  { title: 'PHP Laravel', slug: 'php_laravel' },
]

async function main() {
  PROJECTS.forEach(async project => {
    await prisma.project.create({
      data: {
        ...project,
      },
    })
  })
  CATEGORIES.forEach(async category => {
    await prisma.category.create({
      data: {
        ...category,
      },
    })
  })
  REQUESTS_BACK_CALL.forEach(async request => {
    await prisma.requestBackCall.create({
      data: {
        ...request,
      },
    })
  })
  DIRECTIONS.forEach(async direction => {
    await prisma.direction.create({
      data: {
        ...direction,
      },
    })
  })
  USERS.forEach(async user => {
    await prisma.user.create({
      data: {
        ...user,
      },
    })
  })
  COURSES.forEach(async course => {
    await prisma.course.create({
      data: {
        ...course,
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
