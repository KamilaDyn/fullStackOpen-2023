const commentsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')

commentsRouter.get('/:id/comments', async (request, response) => {
  const { id } = request.params
  const comment = await Blog.findById(id).populate('comments')
  response.status(200).json(comment)
})

commentsRouter.post('/:id/comments', async (request, response, next) => {
  const body = request.body.comment
  const { id } = request.params

  const blog = await Blog.findById(id)
  const comment = new Comment({
    comment: body,
  })

  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()

  response.status(201).json(savedComment.toJSON())
})

module.exports = commentsRouter
