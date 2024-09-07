import { View, StyleSheet } from 'react-native'
import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  name: {
    color: theme.colors.textSecondary
  }
})
function formatToThousands(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}

const DetailsInNumbers = ({ name, count }) => {
  return (
    <View>
      <Text fontWeight='bold' color='textSecondary'>
        {formatToThousands(count)}
      </Text>
      <Text style={styles.name}>{name}</Text>
    </View>
  )
}
export default DetailsInNumbers
