import * as React from 'react'
import {
  Text,
  View,
  Dimensions,
  ScrollView,
  ImageBackground,
  Pressable,
} from 'react-native'
import { EventType } from '../../models/Event'
import { ScaledSheet } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

interface BannerContent {
  eventList: EventType[]
}

const Banner: React.FC<BannerContent> = ({ eventList }) => {
  const navigation = useNavigation()
  return (
    <View style={style.bannerOuterContainer}>
      <ScrollView
        decelerationRate="fast"
        horizontal
        pagingEnabled
        indicatorStyle={'black'}
      >
        {eventList.map((event: EventType, index: React.Key) => {
          return (
            <Pressable
              key={index}
              onPress={() =>
                navigation.navigate('EventDetail', { event: event })
              }
            >
              <ImageBackground
                source={{ uri: event.thumnail }}
                resizeMode="cover"
                style={style.bannerInnerContainer}
              >
                <Text style={style.bannerText}>{event.title}</Text>
              </ImageBackground>
            </Pressable>
          )
        })}
      </ScrollView>
    </View>
  )
}

const style = ScaledSheet.create({
  bannerOuterContainer: {
    paddingTop: '10@msr',
    maxHeight: '190@vs',
    minHeight: '190@vs',
    elevation: 4, //갤럭시 boxshodow
    shadowColor: 'black', // ios boxshodow
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
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
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
})

export default Banner
