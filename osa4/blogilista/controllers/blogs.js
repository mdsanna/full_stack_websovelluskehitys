const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).end()
  }

  response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if(!blog.likes) blog.likes=0

  if(!blog.title || !blog.url) {
      return response.status(400).json({
      error: 'name missing'
    })
  }

  else {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }
})


//updating blog's likes
blogsRouter.put('/:id', async (request, response) => {
   const body = request.body

  const blog = await Blog.findByIdAndUpdate(request.params.id, {likes: body.likes}, {returnDocument: "after"})

    if (!blog) {
        return response.status(404).end()
      }

    response.status(200).json(blog)

})


blogsRouter.delete('/:id', async (request, response) => {

  const blog = await Blog.findById(request.params.id)
  
  if (!blog) {
    return response.status(404).end()  
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
  
})



module.exports = blogsRouter