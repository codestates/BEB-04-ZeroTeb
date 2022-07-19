import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeStackParamList } from '../models/Navigations'
import Home from '../screens/homeTab/Home'
import SignIn from '../screens/auth/SignIn'
import EventDetail from '../screens/common/EventDetail'

export default function HomeStackScreen() {
  const HomeStack = createNativeStackNavigator<HomeStackParamList>()

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="EventDetail"
        component={EventDetail}
        options={{ headerTitle: '' }}
      />
    </HomeStack.Navigator>
  )
}
