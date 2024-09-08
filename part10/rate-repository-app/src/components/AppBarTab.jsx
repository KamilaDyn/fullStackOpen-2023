import { Pressable, StyleSheet } from 'react-native'
import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: theme.fontSizes.heading
  }
})
const AppBarTab = ({ text }) => {
  return (
    <Pressable>
      <Text fontSize='subheading' fontWeight='bold' style={styles.text}>
        {text}
      </Text>
    </Pressable>
  )
}
export default AppBarTab
