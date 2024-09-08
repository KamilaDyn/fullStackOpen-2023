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
    paddingHorizontal: 20,
    height: 100
  },
  text: {
    color: '#fff',
    fontSize: theme.fontSizes.heading
  },
  scrollView: {
    width: '100%',
    backgroundColor: theme.colors.primary
  }
})

const AppBar = () => {
  return (
    <ScrollView horizontal style={styles.scrollView}>
      <View style={styles.container}>
        <AppBarTab text={'Repositories'} path={'/'} />
        <AppBarTab text={'Sign In'} path={'/signin'} />
      </View>
    </ScrollView>
  )
}

export default AppBar
