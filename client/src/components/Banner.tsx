import * as React from 'react'
import {
  Text,
  View,
  Dimensions,
  ScrollView,
  ImageBackground,
} from 'react-native'
import { EventType } from '../models/Event'
import { ScaledSheet } from 'react-native-size-matters'

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
        {eventList
          .slice(0, 4)
          .map(
            (event: { thumnail: string; title: string }, index: React.Key) => {
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
            },
          )}
      </ScrollView>
    </View>
  )
}

const style = ScaledSheet.create({
  bannerOuterContainer: {
    paddingTop: '10@msr',
    maxHeight: '190@vs',
    minHeight: '190@vs',
  },
  bannerInnerContainer: {
    flex: 1,
    paddingVertical: '15@msr',
    alignItems: 'center',
    width: SCREEN_WIDTH,
  },
  bannerText: {
    fontSize: '20@msr',
    alignItems: 'center',
    color: 'white',
    paddingTop: '30@msr',
  },
})

export default Banner
