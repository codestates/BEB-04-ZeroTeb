import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Enroll from '../screens/mypageTab/Enroll'

import { EnrollStackParamList } from '../models/Navigations'

export default function EnrollStackScreen() {
  const EnrollStack = createNativeStackNavigator<EnrollStackParamList>()

  return (
    <EnrollStack.Navigator>
      <EnrollStack.Screen
        name="Enroll"
        component={Enroll}
        options={{ headerShown: false }}
      />
    </EnrollStack.Navigator>
  )
}
