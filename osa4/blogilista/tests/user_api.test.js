const assert = require('node:assert')
const supertest = require('supertest')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const initialUsers = [
{
    "username": "ulus",
    "name": "Ulla User",
    "password": "salasana"
  }, 
  {
    "username": "Bob",
    "name": "Bob Blogger",
    "password": "salasana"
  }
]


beforeEach(async () => {
  await User.deleteMany({})

  const saltRounds = 10

  for (const u of initialUsers) {
    const passwordHash = await bcrypt.hash(u.password, saltRounds)

    const user = new User({
      username: u.username,
      name: u.name,
      passwordHash
    })

    await user.save()
  }
})

describe('adding new user', () => { 
test.only('a valid user can be added', async () => {
  
console.log("a valid user can be added")
  
 const newUser = {
    "username": "ttesti",
    "name": "Teppo Testi",
    "password": "salasana"
  }
  
  await api
  .post('/api/users')
  .send(newUser)
  .expect(201)
 
  const response = await api.get('/api/users')
  const users = response.body.map(user => user.name)
  
  assert(users.includes(newUser.name))

})

test.only('user without username can not be added', async () => {
  
  const newUser = {
    "name": "Teppo Testi",
    "password": "salasana"
  }
    
  await api
  .post('/api/users')
  .send(newUser)
  .expect(400)
 
  //checking that amount of user has remained same
  const response = await api.get('/api/users')
  assert.strictEqual(response.body.length, initialUsers.length)

})

test.only('user without password can not be added', async () => {
  
  const newUser = {
    "username": "ttesti",
    "name": "Teppo Testi"
  }
    
  await api
  .post('/api/users')
  .send(newUser)
  .expect(400)
 
  //checking that amount of user has remained same
  const response = await api.get('/api/users')
  assert.strictEqual(response.body.length, initialUsers.length)

})

test.only('user with too short username can not be added', async () => {
  
  const newUser = {
    "username": "tt",
    "name": "Teppo Testi",
    "password": "salasana"
  }
    
  await api
  .post('/api/users')
  .send(newUser)
  .expect(400)
 
  //checking that amount of user has remained same
  const response = await api.get('/api/users')
  assert.strictEqual(response.body.length, initialUsers.length)

})

test.only('user with too short password can not be added', async () => {
  
  const newUser = {
    "username": "ttesti",
    "name": "Teppo Testi",
    "password": "ss"
  }
    
  await api
  .post('/api/users')
  .send(newUser)
  .expect(400)
 
  //checking that amount of user has remained same
  const response = await api.get('/api/users')
  assert.strictEqual(response.body.length, initialUsers.length)

})

test.only('users without unique usernames can not be added', async () => {
  
  console.log("users without unique usernames can not be added")

  const newUser = {
    "username": "Bob",
    "name": "Bob",
    "password": "salas"
  }
    
  await api
  .post('/api/users')
  .send(newUser)
  .expect(400)
 
  //checking that amount of user has remained same
  const response = await api.get('/api/users')
  assert.strictEqual(response.body.length, initialUsers.length)

})

})

after(async () => {
  await mongoose.connection.close()
})