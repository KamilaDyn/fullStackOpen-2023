require('dotenv').config()

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'token is missing or invalid' })
  }
  try {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      user: user._id,
      likes: body.likes || 0,
    })
    if (!blog.title || !blog.url) {
      response.status(400).end()
    } else {
      if (!blog.likes) {
        blog.likes = 0
      }
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)

      await user.save({ validateModifiedOnly: true })
      response.status(201).json(savedBlog)
    }
  } catch (error) {
    next()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body
  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'token is missing or invalid' })
  }
  // app was down, when id was not valid  (Promise rejection)
  // in findById -> Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer

  try {
    const blog = await Blog.findById(request.params.id)
    const updateBlog = {
      title: title,
      author: author,
      url: url,
      likes: likes,
      user: user._id,
    }

    if (!updateBlog.title || !updateBlog.url) {
      response.status(400).end()
    } else {
      if (!blog.likes) {
        blog.likes = 0
      }
      const newBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        updateBlog,
        {
          new: true,
          runValidators: true,
          context: 'query',
        },
      )

      response.json(newBlog)
    }
  } catch (err) {
    response.status(400).send({ error: "Blog doesn't exist" })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'Token is missing' })
  }
  // app was down, when id was not valid (Promise rejection)
  try {
    const blog = await Blog.findById(request.params.id)

    if (user.id.toString() === blog.user.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      return response.status(401).end()
    }
  } catch (err) {
    response.status(400).send({ error: "Blog doesn't exist" })
  }
})

blogsRouter.put('/:id/comments', async (request, response, next) => {
  const body = request.body
  const blog = await Blog.findById(request.params.id)
  try {
    const addBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      comments: [...blog.comments, body.comment],
    }
    const newBlog = await Blog.findByIdAndUpdate(request.params.id, addBlog, {
      new: true,
      runValidators: true,
      context: 'query',
    })
    response.status(201).json(newBlog)
  } catch (error) {
    next()
  }
})

module.exports = blogsRouter
