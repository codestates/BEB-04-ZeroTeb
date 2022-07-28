import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CategoryStackParamList } from '../models/Navigations'
import Category from '../screens/categoryTab/Category'
import CategoryListup from '../screens/categoryTab/CategoryListup'
import EventDetail from '../screens/common/EventDetail'
import SignIn from '../screens/auth/SignIn'

export default function CategoryStackScreen() {
  const CategoryStack = createNativeStackNavigator<CategoryStackParamList>()

  return (
    <CategoryStack.Navigator>
      <CategoryStack.Screen
        name="Category"
        component={Category}
        options={{ headerShown: false }}
      />
      <CategoryStack.Screen
        name="CategoryListup"
        component={CategoryListup}
        options={{ headerTitle: '' }}
      />
      <CategoryStack.Screen
        name="EventDetail"
        component={EventDetail}
        options={{ headerTitle: '' }}
      />
      <CategoryStack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerTitle: '' }}
      />
    </CategoryStack.Navigator>
  )
}
