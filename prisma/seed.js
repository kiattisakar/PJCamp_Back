// const bcrypt = require('bcryptjs')
const bcrypt = require('bcryptjs')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const password = bcrypt.hashSync('123456')
const userData = [
    { username : 'andy', password , email: 'andy@gmail.com'},
    { username : 'bob', password , email: 'bob@gmail.com'},
    { username : 'can', password , email: 'can@gmail.com'}
]

const todoData = [
    {title: 'HTML', duedate: new Date(), user_id: 1 },
    {title: 'CSS', duedate: new Date(), user_id: 2 },
    {title: 'JS', duedate: new Date(), user_id: 3 },
    {title: 'React', duedate: new Date(), user_id: 3 }
]

const run = async () => {
    // await prisma.todo.deleteMany({}) 
    // await prisma.user.deleteMany({})

    await prisma.user.createMany({
        data: userData
    })
    await prisma.todo.createMany({
        data : todoData
    })
}

run()