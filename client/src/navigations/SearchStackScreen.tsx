import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Search from '../screens/searchTab/Search'
import SearchDetail from '../screens/searchTab/SearchDetail'
import { SearchStackParamList } from '../models/Navigations'

export default function SearchStackScreen() {
  const SearchStack = createNativeStackNavigator<SearchStackParamList>()

  return (
    <SearchStack.Navigator
      screenOptions={({ route }) => ({ headerShown: false })}
    >
      <SearchStack.Screen name="Search" component={Search} />
      <SearchStack.Screen name="SearchDetail" component={SearchDetail} />
    </SearchStack.Navigator>
  )
}
