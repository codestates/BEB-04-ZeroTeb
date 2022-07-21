import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MyPageStackParamList } from '../models/Navigations'
import { useSelector } from 'react-redux'
import { RootState } from '../store/Index'
import MyPage from '../screens/mypageTab/MyPage'
import SignIn from '../screens/auth/SignIn'
import Enroll from '../screens/mypageTab/Enroll'
import TicketDetail from '../screens/mypageTab/TicketDetail'
import QRLoad from '../screens/mypageTab/QRLoad'
import QRread from '../screens/mypageTab/QRRead'
import MyList from '../screens/mypageTab/MyList'

export default function MyPageStackScreen() {
  const MyPageStack = createNativeStackNavigator<MyPageStackParamList>()

  const KilpAddress = useSelector(
    (state: RootState) => state.signin.KilpAddress,
  )

  return (
    
    <MyPageStack.Navigator>
      <MyPageStack.Screen
        name="MyList"
        component={MyList}
        options={{ headerTitle: '' }}
      />
      {KilpAddress ? (
        <MyPageStack.Screen
          name="MyPage"
          component={MyPage}
          initialParams={{ kilpAddress: '', accessToken: '' }}
        />
      ) : (
        <MyPageStack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }}
          initialParams={{ gotoMyPage: true }}
        />
      )}
      <MyPageStack.Screen
        name="Enroll"
        component={Enroll}
        options={{ headerTitle: '' }}
      />
      <MyPageStack.Screen
        name="QRLoad"
        component={QRLoad}
        options={{ headerTitle: '' }}
      />
      <MyPageStack.Screen
        name="QRread"
        component={QRread}
        options={{ headerTitle: ''}}
      />
      <MyPageStack.Screen
        name="TicketDetail"
        component={TicketDetail}
        options={{ headerTitle: ''}}
      />
    </MyPageStack.Navigator>
  )
}
