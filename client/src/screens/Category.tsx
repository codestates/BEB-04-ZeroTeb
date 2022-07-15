import * as React from 'react'
import { View, StyleSheet, StatusBar, Platform } from 'react-native'
import CategoryList from '../components/CategoryList'
import Location from '../components/Location'

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight

function Category() {
  return (
    <View style={styles.categoryContainer}>
      <Location />
      <CategoryList />
    </View>
  )
}

const styles = StyleSheet.create({
  categoryContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    marginTop: STATUSBAR_HEIGHT,
  },
})

export default Category
