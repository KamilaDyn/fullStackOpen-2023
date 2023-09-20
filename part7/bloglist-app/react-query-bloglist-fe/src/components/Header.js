import { Notification, LoginForm } from '../components'
import { useUserDispatch, useUserValue } from '../context/UserContext'
import { removeToken } from '../storage'
import { useState } from 'react'
import Menu from './Menu'

const styles = {
  padding: {
    paddingRight: 5,
  },
  flex: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
  },
}

const Header = ({ children }) => {
  return (
    <>
      <h2 className="text-primary text-center pt-3 pb-5">{children}</h2>
      <Notification />
    </>
  )
}

export default Header
