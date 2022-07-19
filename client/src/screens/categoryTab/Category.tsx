import { useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { View, StyleSheet, StatusBar, Platform } from 'react-native'
import CategoryButton from '../../components/category/CategoryButton'
import LocationButton from '../../components/location/LocationButton'

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight

function Category() {
  const navigation = useNavigation()
  const pressHandler = () => {
    navigation.navigate('CategoryDetail', { catagoryName: '' })
  }

  return (
    <View style={styles.categoryContainer}>
      <LocationButton />
      <CategoryButton onPress={pressHandler} />
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
