import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'
import Home from './src/screens/Home'
import Category from './src/screens/Category'
import Search from './src/screens/Search'
import MyPage from './src/screens/MyPage'

export default function App() {
  const Tab = createBottomTabNavigator()

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            switch (route.name) {
              case 'Home':
                iconName = 'home-outline'
                break
              case 'Category':
                iconName = 'menu-outline'
                break
              case 'Search':
                iconName = 'search'
                break
              case 'MyPage':
                iconName = 'person-circle-outline'
                break
              default:
                break
            }
            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: '#129383',
          tabBarInactiveTintColor: 'gray',
          tabBarShowLabel: false,
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Category" component={Category} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="MyPage" component={MyPage} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
