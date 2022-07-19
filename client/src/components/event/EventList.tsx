import * as React from 'react'
import { Image, View, Text, Dimensions } from 'react-native'
import InnerText from '../common/InnerText'
import { EventType } from '../../models/Event'
import { getDate } from '../../utils/unixTime'
import { ScaledSheet } from 'react-native-size-matters'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
interface eventListProps {
  eventList: EventType[]
}

const EventList: React.FC<eventListProps> = ({ eventList }) => {
  return (
    <View style={style.eventOuterContainer}>
      {eventList.map(event => {
        return (
          <View style={style.eventInnerContainer} key={event.event_id}>
            <View style={style.eventImgContainer}>
              <Image
                style={style.eventImg}
                source={{ uri: event.thumnail }}
              ></Image>
            </View>

            <View style={style.eventTitleContainer}>
              <Text></Text>
              <InnerText innerText={event.title} size={15} />
            </View>

            <View style={style.eventContentContainer}>
              <Text></Text>
              <InnerText innerText={'기획자 : '} size={10} />
              <InnerText innerText={'남은 좌석 : '} size={10} />
              <InnerText
                innerText={`공연 기간 : ${getDate(
                  event.event_start_date,
                )} - ${getDate(event.event_end_date)}`}
                size={10}
              />
            </View>
          </View>
        )
      })}
    </View>
  )
}

const style = ScaledSheet.create({
  eventOuterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    margin: '5@msr',
    padding: '5@msr',
  },
  eventInnerContainer: {
    justifyContent: 'space-between',
    margin: 5,
    padding: 10,
    borderColor: 'lightgray',
    borderWidth: 1,
    width: SCREEN_WIDTH * 0.45,
    borderRadius: 10,
  },
  eventImgContainer: {
    alignItems: 'center',
  },
  eventImg: {
    width: SCREEN_WIDTH * 0.4,
    height: '100@vs',
    resizeMode: 'cover',
    borderRadius: 4,
  },
  eventTitleContainer: {
    alignItems: 'flex-start',
  },
  eventContentContainer: { alignItems: 'flex-start' },
})

export default EventList
