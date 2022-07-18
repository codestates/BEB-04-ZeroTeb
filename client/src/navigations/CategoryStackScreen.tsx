import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Category from '../screens/categoryTab/Category'
import CategoryDetail from '../screens/categoryTab/CategoryDetail'
import { CategoryStackParamList } from '../models/Navigations'

export default function CategoryStackScreen() {
  const CategoryStack = createNativeStackNavigator<CategoryStackParamList>()

  return (
    <CategoryStack.Navigator
      screenOptions={({ route }) => ({ headerShown: false })}
    >
      <CategoryStack.Screen name="Category" component={Category} />
      <CategoryStack.Screen name="CategoryDetail" component={CategoryDetail} />
    </CategoryStack.Navigator>
  )
}
