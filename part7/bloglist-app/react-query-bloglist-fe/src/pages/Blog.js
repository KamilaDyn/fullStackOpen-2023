import { useParams } from 'react-router-dom'
import { useGetBlogs, useUpdateBlog } from '../hooks'
import { useUserValue } from '../context/UserContext'
const Blog = () => {
  const { id } = useParams()
  const { blogs, status } = useGetBlogs()
  const { updateBlogLike, deleteBlogMutation } = useUpdateBlog()
  const user = useUserValue()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  const blog = blogs.find((blog) => blog.id === id)
  if (!blog) {
    return null
  }
  const handleBlogDelete = async (blog) => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      deleteBlogMutation.mutate(blog.id)
    }
  }
  return (
    <>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes{' '}
        <button onClick={() => updateBlogLike.mutate(blog)}>like</button>
      </div>
      <p>added by {blog.user.name}</p>
      {user.name === blog.user.name && (
        <button
          style={{ backgroundColor: 'red' }}
          onClick={() => handleBlogDelete(blog)}
        >
          Remove
        </button>
      )}
    </>
  )
}

export default Blog
