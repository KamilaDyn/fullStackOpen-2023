import { useParams } from 'react-router-dom'
import { useGetBlogs, useUpdateBlog } from '../hooks'
import { useUserValue } from '../context/UserContext'
import Comments from '../components/Comments'
import { Button, Card } from 'react-bootstrap'
import { Loading } from '../components'

const Blog = () => {
  const { id } = useParams()
  const { blogs, status } = useGetBlogs()
  const { updateBlogLike, deleteBlogMutation } = useUpdateBlog()
  const user = useUserValue()

  if (status === 'loading') {
    return <Loading />
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
    <div className="container mt-5">
      <Card className="w-75 mx-3">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <Card.Title>{blog.title}</Card.Title>
          <div>
            Likes: {blog.likes}
            <Button
              type="button"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-title="Like it"
              variant="light"
              className="mx-3"
              onClick={() => updateBlogLike.mutate(blog)}
            >
              <i className="bi bi-bookmark-heart text-danger"></i>
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">
            author: {blog.author}
          </Card.Subtitle>

          <Card.Text>
            Link to blog: <a href={blog.url}>{blog.url}</a>
          </Card.Text>
          {user.name === blog.user.name && (
            <Button variant="danger" onClick={() => handleBlogDelete(blog)}>
              Remove
            </Button>
          )}
        </Card.Body>
      </Card>
      <Comments blogId={blog.id} />
    </div>
  )
}

export default Blog
