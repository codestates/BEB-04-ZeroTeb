import React, { useState, useEffect } from 'react'
import TabNavigation from './src/navigations'
import { Provider } from 'react-redux'
import { store } from './src/store/Index'
import * as SplashScreen from 'expo-splash-screen'
import Splash from './src/components/common/Splash'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise(resolve => setTimeout(resolve, 3000))
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }
    prepare()
  }, [])

  useEffect(() => {
    async function prepare() {
      try {
        if (appIsReady) {
          await SplashScreen.hideAsync()
        }
      } catch (e) {
        console.warn(e)
      } finally {
      }
    }
    prepare()
  }, [appIsReady])

  if (!appIsReady) {
    console.log('!appIsReady')
    return null
  }
  return (
    <Provider store={store}>
      <TabNavigation />
    </Provider>
  )
}
