import { View, StyleSheet, Pressable } from 'react-native'
import Constants from 'expo-constants'
import theme from '../theme'
import Text from './Text'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
    width: '100%',
    height: 100,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 10
  },
  text: {
    color: '#fff',
    fontSize: theme.fontSizes.heading
  }
})

const AppBar = () => {
  return (
    <Pressable style={styles.container}>
      <Text fontSize='subheading' fontWeight='bold' style={styles.text}>
        Repositories
      </Text>
    </Pressable>
  )
}

export default AppBar
