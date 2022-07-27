import * as React from 'react'
import { Image, View, Text, Dimensions, Pressable } from 'react-native'
import InnerText from '../common/InnerText'
import { EventType } from '../../models/Event'
import { getDate } from '../../utils/unixTime'
import { ScaledSheet, moderateScale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import Title from '../common/Title'


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
interface eventListProps {
  eventList: EventType[]
}

const EventList: React.FC<eventListProps> = ({ eventList }) => {
  const navigation = useNavigation()

  return (
    <View style={style.eventOuterContainer}>
      <View style={style.eventMiddleContainer}>
        {eventList.map((event, index) => {
          return (
            <Pressable
              key={index}
              onPress={() =>
                navigation.navigate('EventDetail', { event: event })
              }
            >
              <View style={style.eventInnerContainer}>
                <View style={style.eventImgContainer}>
                  <Image
                    style={style.eventImg}
                    source={{ uri: event.thumnail }}
                  ></Image>
                </View>
                <View style={style.eventTitleContainer}>
                  <Text ellipsizeMode={'tail'} style={style.eventTitleText}>
                    {event.title}
                  </Text>
                </View>
                <View style={style.eventContentContainer}>
                  <Text style={{fontSize: moderateScale(10)}}>{`기획자 : ${event.promoter}`}</Text>
                  {event.type === 'sale' ? (
                    <Text style={{fontSize: moderateScale(10)}}>{`남은 좌석 : ${event.remaining}`}</Text>
                  ) : (
                    <Text style={{fontSize: moderateScale(10)}}>{`추첨 인원 : ${event.price[0].count}`}</Text>
                  )}
                  {event.type === 'sale' ? (
                    <Text style={{fontSize: moderateScale(10)}}>{`공연 기간 : \n${getDate(
                      event.event_start_date,
                    )} - ${getDate(event.event_end_date)}`}</Text>
                  ) : (
                    <Text style={{fontSize: moderateScale(10)}}>{`응모 기간 : \n${getDate(
                      event.recruit_start_date,
                    )} - ${getDate(event.recruit_end_date)}`}</Text>
                  )}
                </View>
              </View>
            </Pressable>
          )
        })}
      </View>
    </View>
  )
}

const style = ScaledSheet.create({
  eventOuterContainer: {
    alignItems: 'center',
    margin: '5@msr',
    padding: '5@msr',
  },
  eventMiddleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: SCREEN_WIDTH * 0.95,
  },
  eventInnerContainer: {
    marginHorizontal: SCREEN_WIDTH * 0.015,
    marginTop: '10@msr',
    paddingVertical: '10@msr',
    borderColor: 'lightgray',
    borderWidth: 1,
    width: SCREEN_WIDTH * 0.44,
    maxHeight: SCREEN_HEIGHT * 0.36,
    minHeight: SCREEN_HEIGHT * 0.3,
    borderRadius: '10@msr',
  },
  eventImgContainer: {
    alignItems: 'center',
    overflow: 'hidden',
    marginHorizontal: SCREEN_WIDTH * 0.01,
    height:SCREEN_HEIGHT * 0.15,
  },
  eventImg: {
    width: SCREEN_WIDTH * 0.38,
    height: '100@vs',
    resizeMode: 'cover',
    borderRadius: '4@msr',
  },
  eventTitleContainer: {
    height:SCREEN_HEIGHT * 0.06,
    marginVertical: '5@msr',
    alignItems: 'flex-start',
    marginHorizontal: '10@msr',
  },
  eventTitleText: {
    fontSize: '14@msr',
    color: '#333333',
    fontWeight: 'bold',
  },
  eventContentContainer: {
    alignItems: 'flex-start',
    marginHorizontal: '10@msr',
  },
})

export default EventList
