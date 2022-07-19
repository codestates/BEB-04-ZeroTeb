import * as React from 'react'
import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
  TouchableOpacity,
} from 'react-native'
import GoBackButton from '../../components/common/GoBackButton'
import EventList from '../../components/event/EventList'
import { useNavigation } from '@react-navigation/native'

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight

function CategoryListup() {
  const navigation = useNavigation()

  return (
    <View style={styles.categoryListupContainer}>
      <GoBackButton />
      <EventList eventList={[]} />
    </View>
  )
}

const styles = StyleSheet.create({
  categoryListupContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: STATUSBAR_HEIGHT,
  },
})

export default CategoryListup
