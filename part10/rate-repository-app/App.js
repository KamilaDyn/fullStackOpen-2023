import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import Main from './src/components/Main'
import RepositoryList from './src/components/RepositoryList'
import AppBar from './src/components/AppBar'
import { NativeRouter } from 'react-router-native'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NativeRouter>
        <AppBar />
        <Main />
      </NativeRouter>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
