import React from 'react'
import TabNavigation from './src/navigations'
import { Provider } from 'react-redux'
import { store } from './src/store/Index'
import Splash from './src/components/common/Splash'

export default function App() {
  return (
    <Provider store={store}>
      <TabNavigation />
    </Provider>
  )
}
