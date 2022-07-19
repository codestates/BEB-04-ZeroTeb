import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import GoBackButton from '../../components/common/GoBackButton'
import EventList from '../../components/event/EventList'
import { useNavigation } from '@react-navigation/native'

function CategoryListup() {
  const navigation = useNavigation()

  return (
    <View style={styles.categoryListupContainer}>
      <EventList eventList={[]} />
    </View>
  )
}

const styles = StyleSheet.create({
  categoryListupContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
})

export default CategoryListup
