import React from 'react'
import Navbar from './src/layout/navBar/NavBar'
import SignIn from './src/screens/SignIn'
import { Provider } from 'react-redux'
import { store } from './src/store/Index'

// const store = configureStore()

export default function App() {
  return (
    <Provider store={store}>
      <Navbar />
    </Provider>
  )
}
