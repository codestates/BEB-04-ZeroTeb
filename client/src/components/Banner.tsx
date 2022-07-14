import * as React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
} from 'react-native'
import { EventType } from '../models/Event'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

interface BannerContent {
  eventList: EventType
}

const Banner: React.FC<BannerContent> = ({ eventList }) => {
  return (
    <View style={style.bannerOuterContainer}>
      <ScrollView
        decelerationRate="fast"
        horizontal
        pagingEnabled
        indicatorStyle={'black'}
      >
        {eventList.slice(0, 4).map((event, index) => {
          return (
            <View key={index}>
              <ImageBackground
                source={{ uri: event.thumnail }}
                resizeMode="cover"
                style={style.bannerInnerContainer}
              >
                <Text style={style.bannerText}>{event.title}</Text>
              </ImageBackground>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

const style = StyleSheet.create({
  bannerOuterContainer: {
    paddingTop: 10,
    maxHeight: 200,
    minHeight: 200,
  },
  bannerInnerContainer: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    width: SCREEN_WIDTH,
  },
  bannerText: {
    fontSize: 20,
    alignItems: 'center',
    color: 'white',
    paddingTop: 30,
  },
})

export default Banner
