import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MyPage from '../screens/mypageTab/MyPage'
import { useSelector } from 'react-redux'
import { RootState } from '../store/Index'
import SignIn from '../screens/auth/SignIn'
import { MyPageStackParamList } from '../models/Navigations'

export default function MyPageStackScreen() {
  const MyPageStack = createNativeStackNavigator<MyPageStackParamList>()

  const KilpAddress = useSelector(
    (state: RootState) => state.signin.KilpAddress,
  )
  console.log('data:', KilpAddress)
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
    </MyPageStack.Navigator>
  )
}
