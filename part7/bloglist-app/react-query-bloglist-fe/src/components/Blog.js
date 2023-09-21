import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const Blog = ({ blog }) => {
  const { title, author, id } = blog

  return (
    <div>
      <ListGroup as="ul">
        <ListGroup.Item as="li">
          <Link to={`/blogs/${id}`}>{title} </Link>
          written by {author}{' '}
        </ListGroup.Item>
      </ListGroup>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
