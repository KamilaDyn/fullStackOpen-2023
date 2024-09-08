import {
  View,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView
} from 'react-native'
// import Constants from 'expo-constants'
import theme from '../theme'
import Text from './Text'
import AppBarTab from './AppBarTab'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  text: {
    color: '#fff',
    fontSize: theme.fontSizes.heading
  },
  scrollView: {
    width: '100%',
    backgroundColor: theme.colors.primary,
    height: 100
  }
})

const AppBar = () => {
  return (
    <ScrollView horizontal style={styles.scrollView}>
      <View style={styles.container}>
        <AppBarTab text={'Repositories'} />
        <AppBarTab text={'Sign In'} />
      </View>
    </ScrollView>
  )
}

export default AppBar
