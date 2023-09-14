import { createSlice } from '@reduxjs/toolkit'
import { createBlog, getAll, updateBlog, deleteBlog } from '../services/blogs'
import { setNotification } from './notificationReducers'

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
    likeBlog(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id
          ? { ...blog, likes: action.payload.likes }
          : blog,
      )
    },
    removeBlog(state, action) {
      return state.filter((currentBlog) => currentBlog.id !== action.payload)
    },
  },
})

const { allBlogs, appendBlog, likeBlog, removeBlog } = blogSlice.actions

export const setBlogs = () => {
  return async (dispatch) => {
    const blogs = await getAll()
    dispatch(allBlogs(blogs))
  }
}

export const createNewBlog = (content) => {
  return (dispatch) => {
    createBlog(content)
      .then((response) => {
        dispatch(appendBlog(response))
        dispatch(
          setNotification(
            {
              type: 'notification',
              text: `Success, a new blog ${response.title} by ${response.author} added.`,
            },
            5,
          ),
        )
        dispatch(setBlogs())
      })
      .catch(() =>
        dispatch(
          setNotification(
            {
              type: 'error',
              text: 'could not add blog, please try later',
            },
            5,
          ),
        ),
      )
  }
}

export const updateLikeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = await updateBlog(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    })
    dispatch(likeBlog(likedBlog))
  }
}

export const removeSingleBlog = (id) => {
  return async (dispatch) => {
    await deleteBlog(id)
    dispatch(removeBlog(id))
  }
}

export default blogSlice.reducer
