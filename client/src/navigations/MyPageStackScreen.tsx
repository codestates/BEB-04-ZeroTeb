import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MyPageStackParamList } from '../models/Navigations'
import { useSelector } from 'react-redux'
import { RootState } from '../store/Index'
import MyPage from '../screens/mypageTab/MyPage'
import SignIn from '../screens/auth/SignIn'
import Enroll from '../screens/mypageTab/Enroll'

export default function MyPageStackScreen() {
  const MyPageStack = createNativeStackNavigator<MyPageStackParamList>()

  const KilpAddress = useSelector(
    (state: RootState) => state.signin.KilpAddress,
  )

  return (
    <MyPageStack.Navigator>
      {KilpAddress ? (
        <MyPageStack.Screen
          name="MyPage"
          component={MyPage}
          // initialParams={{ kilpAddress: KilpAddress }}
        />
      ) : (
        <MyPageStack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }}
        />
      )}
      <MyPageStack.Screen
        name="Enroll"
        component={Enroll}
        options={{ headerTitle: '' }}
      />
    </MyPageStack.Navigator>
  )
}
