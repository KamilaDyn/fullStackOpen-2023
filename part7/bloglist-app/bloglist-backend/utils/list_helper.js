const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? {}
    : blogs.reduce((totalLikes, blog) => totalLikes + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const favoriteBlogs = blogs.reduce(
    (favoriteBlog, blog) =>
      (favoriteBlog = favoriteBlog.likes > blog.likes ? favoriteBlog : blog),
    0,
  )
  const { title, author, likes } = favoriteBlogs
  return {
    title: title,
    author: author,
    likes: likes,
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  } else {
    const author = blogs.reduce((count, blog) => {
      count[blog.author] = (count[blog.author] || 0) + 1
      return count
    }, {})

    const maxBlogs = Math.max(...Object.values(author))
    const blogAuthor = Object.keys(author).find(
      (position) => author[position] === maxBlogs,
    )

    return {
      author: blogAuthor,
      blogs: maxBlogs,
    }
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  } else {
    const likes = blogs.reduce((countLikes, blog) => {
      countLikes[blog.author] = (countLikes[blog.author] || 0) + blog.likes
      return countLikes
    }, {})
    const maxLikes = Math.max(...Object.values(likes))
    const blogAuthor = Object.keys(likes).find(
      (position) => likes[position] === maxLikes,
    )

    return {
      author: blogAuthor,
      likes: maxLikes,
    }
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
