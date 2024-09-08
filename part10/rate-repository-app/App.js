import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import Main from './src/components/Main'
import { NativeRouter } from 'react-router-native'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NativeRouter>
        <Main />
      </NativeRouter>
      <StatusBar style='auto' />
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
