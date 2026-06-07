const assert = require('node:assert')
const supertest = require('supertest')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const newUser = {
  "username": "ttesti",
  "name": "Teppo Testi",
  "password": "salasana"
}

beforeEach(async () => {
    await User.deleteMany({})
})

describe('adding new user', () => { 
test.only('a valid user can be added', async () => {
  await api
  .post('/api/users')
  .send(newUser)
  .expect(201)
 
  const response = await api.get('/api/users')
  const users = response.body.map(user => user.name)
  
  assert(users.includes(newUser.name))

})

})

after(async () => {
  await mongoose.connection.close()
})