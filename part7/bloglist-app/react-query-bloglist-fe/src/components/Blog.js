import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 'solid',
  marginBottom: 5,
}

const Blog = ({ blog }) => {
  const { title, author, id } = blog

  return (
    <div className="blog" style={blogStyle}>
      <div>
        <Link to={`/blogs/${id}`}>
          {' '}
          {title} {author}{' '}
        </Link>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
