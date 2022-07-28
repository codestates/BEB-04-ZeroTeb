import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SearchStackParamList } from '../models/Navigations'
import Search from '../screens/searchTab/Search'
import SearchSearchListup from '../screens/searchTab/SearchListup'
import EventDetail from '../screens/common/EventDetail'
import SignIn from '../screens/auth/SignIn'

export default function SearchStackScreen() {
  const SearchStack = createNativeStackNavigator<SearchStackParamList>()

  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
      <SearchStack.Screen
        name="SearchListup"
        component={SearchSearchListup}
        options={{ headerTitle: '' }}
      />
      <SearchStack.Screen
        name="EventDetail"
        component={EventDetail}
        options={{ headerTitle: '' }}
      />
      <SearchStack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerTitle: '' }}
      />
    </SearchStack.Navigator>
  )
}
