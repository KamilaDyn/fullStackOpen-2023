import axios from 'axios'
import baseUrl from '../config'

export const getComments = async (blogId) => {
  const response = await axios.get(`${baseUrl.blogs}/${blogId}/comments`)
  return response.data.comments
}

export const createComment = async (newComment) => {
  const newBlogComment = {
    comment: newComment.comment,
  }
  const response = await axios.post(
    `${baseUrl.blogs}/${newComment.id}/comments`,
    newBlogComment,
  )
  return response.data
}
