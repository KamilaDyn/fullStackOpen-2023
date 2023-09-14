import axios from 'axios'
import baseUrl from '../config'
import { getToken } from '../storage'

const getAll = async () => {
  const response = await axios.get(baseUrl.blogs)
  return response.data
}

const createBlog = async (newBlog) => {
  const token = getToken()
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl.blogs, newBlog, config)
  return response.data
}

const updateBlog = async (blog) => {
  const token = getToken()
  const id = blog.id
  const newBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes + 1,
  }
  const config = {
    headers: { Authorization: token },
  }

  const request = await axios.put(`${baseUrl.blogs}/${id}`, newBlog, config)
  return request.data
}

const deleteBlog = async (id) => {
  const token = getToken()

  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.delete(`${baseUrl.blogs}/${id}`, config)
  return request.data
}

export { getAll, createBlog, updateBlog, deleteBlog }
