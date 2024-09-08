import { Pressable, StyleSheet } from 'react-native'
import Text from './Text'
import theme from '../theme'
import { Link } from 'react-router-native'

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: theme.fontSizes.heading
  }
})
const AppBarTab = ({ text, path }) => {
  return (
    <Pressable>
      <Link to={path}>
        <Text fontSize='subheading' fontWeight='bold' style={styles.text}>
          {text}
        </Text>
      </Link>
    </Pressable>
  )
}
export default AppBarTab
