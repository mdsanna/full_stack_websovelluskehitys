const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if(!blog.likes) blog.likes=0

  if(!blog.title | !blog.url) {
      response.status(400).json({
      error: 'name missing'
    })
  }

  else {
    const savedBlog = await blog.save()
    logger.info('blog saved!')
    response.status(201).json(savedBlog)
  }
})

module.exports = blogsRouter