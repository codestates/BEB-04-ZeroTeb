import * as React from 'react'
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native'

type HashtagContent = {
  props: any
}

const Hashtag: React.FC<HashtagContent> = ({ props }) => {
  //   console.log(props)
  return (
    <View style={style.HashtagOuterContainer}>
      <Text>아아</Text>
    </View>
  )
}

const style = StyleSheet.create({
  HashtagOuterContainer: {
    paddingTop: 10,
    maxHeight: 200,
  },
})

export default Hashtag
