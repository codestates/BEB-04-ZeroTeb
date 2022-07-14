import * as React from 'react'
import { Image, View, Text, StyleSheet, Dimensions } from 'react-native'
import Title from '../../components/Title'
import { EventType } from '../../models/Event'
import { getDate } from '../../utils/unixTime'

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
            <View style={style.eventTextContainer}>
              <Text></Text>
              <Title title={event.title} size={17} />
              <Title title={''} size={17} />
              <Title title={'기획자 : '} size={10} />
              <Title title={'남은 좌석 : '} size={10} />
              <Title
                title={`공연 기간 : ${getDate(
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

const style = StyleSheet.create({
  eventOuterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    margin: 5,
  },
  eventInnerContainer: {
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
    width: 150,
    height: 150,
    resizeMode: 'cover',
  },
  eventTextContainer: {
    alignItems: 'flex-start',
  },
})

export default EventList
