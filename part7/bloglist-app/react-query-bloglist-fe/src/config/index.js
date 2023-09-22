const { URL_PRODUCTION } = process.env

const apiUrl = process.env.NODE_ENV === 'production' ? URL_PRODUCTION : ''
export const baseUrl = {
  blogs: `${apiUrl}/api/blogs`,
  login: `${apiUrl}/api/login`,
  users: `${apiUrl}/api/users`,
}

export default baseUrl
