import axios from 'axios'
import baseUrl from '../config'

const getAllUsers = async () => {
  const response = await axios.get(baseUrl.users)
  return response.data
}

export { getAllUsers }
