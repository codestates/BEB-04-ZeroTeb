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

function CategoryDetail() {
  const navigation = useNavigation()

  return (
    <View style={styles.categoryDetailContainer}>
      <TouchableOpacity
        onPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack()
          }
        }}
      >
        <GoBackButton />
      </TouchableOpacity>
      <EventList eventList={[]} />
    </View>
  )
}

const styles = StyleSheet.create({
  categoryDetailContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: STATUSBAR_HEIGHT,
  },
})

export default CategoryDetail
