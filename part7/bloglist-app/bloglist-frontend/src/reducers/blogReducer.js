import { createSlice } from '@reduxjs/toolkit'
import { createBlog, getAll } from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    allBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
  },
})

const { allBlogs, appendBlog } = blogSlice.actions

export const setBlogs = () => {
  return async (dispatch) => {
    const blogs = await getAll()
    dispatch(allBlogs(blogs))
  }
}

export const createNewBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await createBlog(content)
    dispatch(appendBlog(newBlog))
  }
}

export default blogSlice.reducer
