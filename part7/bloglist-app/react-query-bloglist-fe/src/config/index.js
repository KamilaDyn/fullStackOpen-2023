const { REACT_APP_URL_PRODUCTION, REACT_APP_ENVIRONMENT } = process.env

const apiUrl =
  REACT_APP_ENVIRONMENT || process.env.NODE_ENV === 'production'
    ? REACT_APP_URL_PRODUCTION
    : ''

export const baseUrl = {
  blogs: `${apiUrl}/api/blogs`,
  login: `${apiUrl}/api/login`,
  users: `${apiUrl}/api/users`,
}

export default baseUrl
