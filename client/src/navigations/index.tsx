import React from 'react'
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'
import HomeStackScreen from './HomeStackScreen'
import CategoryStackScreen from './CategoryStackScreen'
import SearchStackScreen from './SearchStackScreen'
import MyPageStackScreen from './MyPageStackScreen'
import EnrollStackScreen from './EnrollStackScreen'
import { RootStackParamList, RootTabParamList } from '../models/Navigations'

export default function TabNavigation() {
  const Tab = createBottomTabNavigator<RootTabParamList>()

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            switch (route.name) {
              case 'HomeStackScreen':
                iconName = 'home-outline'
                break
              case 'CategoryStackScreen':
                iconName = 'menu-outline'
                size = 30
                break
              case 'SearchStackScreen':
                iconName = 'search'
                break
              case 'MyPageStackScreen':
                iconName = 'person-circle-outline'
                size = 28
                break
              default:
                break
            }
            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          tabBarShowLabel: false,
          headerShown: false,
        })}
      >
        <Tab.Screen name="HomeStackScreen" component={HomeStackScreen} />
        <Tab.Screen
          name="CategoryStackScreen"
          component={CategoryStackScreen}
        />
        <Tab.Screen name="SearchStackScreen" component={SearchStackScreen} />
        <Tab.Screen name="MyPageStackScreen" component={MyPageStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
