import axios from 'axios'
import baseUrl from '../config'

const getAllUsers = async () => {
  const response = await axios.get(baseUrl.users)
  return response.data
}

const addNewUser = async (user) => {
  const response = await axios.post(baseUrl.users, user)
  return response.data
}

export { getAllUsers, addNewUser }
