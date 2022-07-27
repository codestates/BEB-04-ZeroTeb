import * as React from 'react'
import { Image, View, Text, Dimensions, Pressable } from 'react-native'
import InnerText from '../common/InnerText'
import { EventType } from '../../models/Event'
import { getDate } from '../../utils/unixTime'
import { ScaledSheet } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'

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
                  <Text></Text>
                  <Text ellipsizeMode={'tail'} style={style.eventTitleText}>
                    {event.title}
                  </Text>
                </View>
                <View style={style.eventContentContainer}>
                  <Text></Text>
                  <InnerText
                    innerText={`기획자 : ${event.promoter}`}
                    size={10}
                  />
                  {event.type === 'sale' ? (
                    <InnerText
                      innerText={`남은 좌석 : ${event.remaining}`}
                      size={10}
                    />
                  ) : (
                    <InnerText
                      innerText={`추첨 인원 : ${event.price[0].count}`}
                      size={10}
                    />
                  )}
                  {event.type === 'sale' ? (
                    <InnerText
                      innerText={`공연 기간 : ${getDate(
                        event.event_start_date,
                      )} - ${getDate(event.event_end_date)}`}
                      size={10}
                    />
                  ) : (
                    <InnerText
                      innerText={`응모 기간 : ${getDate(
                        event.recruit_start_date,
                      )} - ${getDate(event.recruit_end_date)}`}
                      size={10}
                    />
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
    marginHorizontal: SCREEN_WIDTH * 0.025,
    marginTop: '10@msr',
    paddingVertical: '10@msr',
    borderColor: 'lightgray',
    borderWidth: 1,
    width: SCREEN_WIDTH * 0.42,
    maxHeight: SCREEN_HEIGHT * 0.35,
    minHeight: SCREEN_HEIGHT * 0.35,
    borderRadius: '10@msr',
  },
  eventImgContainer: {
    alignItems: 'center',
    overflow: 'hidden',
    marginHorizontal: SCREEN_WIDTH * 0.01,
    flex: 2,
  },
  eventImg: {
    width: SCREEN_WIDTH * 0.38,
    height: '100@vs',
    resizeMode: 'cover',
    borderRadius: '4@msr',
  },
  eventTitleContainer: {
    flex: 2,
    alignItems: 'flex-start',
    marginHorizontal: '10@msr',
  },
  eventTitleText: {
    fontSize: '14@msr',
    color: '#333333',
    flex: 1,
    fontWeight: 'bold',
  },
  eventContentContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    flex: 2,
    marginTop: '2@msr',
  },
})

export default EventList
