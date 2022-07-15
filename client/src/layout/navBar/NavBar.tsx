import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'
import Home from '../../screens/Home'
import Category from '../../screens/Category'
import Search from '../../screens/Search'
import MyPage from '../../screens/MyPage'
import Enroll from '../../screens/Enroll'

export default function Navbar() {
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
                size = 30
                break
              case 'Search':
                iconName = 'search'
                break
              case 'Mypage':
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
        })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Category"
          component={Category}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen name="Mypage" component={MyPage} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
