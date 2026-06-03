const assert = require('node:assert')
const supertest = require('supertest')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
{
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  }  
]

  const newBlog = {
    title: "TestBlog",
    author: "Teppo Tester",
    url: "http://testblog.com",
    likes: 3
  }  

  const blogWithoutLikes = {
    title: "BlogWithoutLikes",
    author: "Hannah Happy",
    url: "http://happyblog.com",
  }  

  const blogWithoutTitle = {
    author: "Hannah Happy",
    url: "http://happyblog.com",
    likes: 4
  }  

  const blogWithoutUrl = {
    title: "TestBlog",
    author: "Teppo Tester",
    likes: 6
  }  

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})

test.only('correct amount of blogs is returned', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, 6)
})

test.only('correct id field is used', async () => {
  const response = await api.get('/api/blogs')

  // Check first blog object
  assert.ok(response.body[0].id)
  assert.ok(!response.body[0]._id)
})

test.only('a valid blog can be added', async () => {
  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(201)
 
  const response = await api.get('/api/blogs')
  const titles = response.body.map(blog => blog.title)
  
  //checking that amount of blogs is one more than before
  assert.strictEqual(response.body.length, initialBlogs.length + 1)

  assert(titles.includes(newBlog.title))

})

test.only('if amount of likes is not set, 0 is used', async () => {
  const response = await api
  .post('/api/blogs')
  .send(blogWithoutLikes)
  .expect(201)
 
  //checking that value for likes is set to 0
  assert.strictEqual(response.body.likes, 0)
})


test.only('blog without title can not be added', async () => {
  const response = await api
  .post('/api/blogs')
  .send(blogWithoutTitle)
  .expect(400)
})


test.only('blog without url can not be added', async () => {
  const response = await api
  .post('/api/blogs')
  .send(blogWithoutUrl)
  .expect(400)
})

after(async () => {
  await mongoose.connection.close()
})