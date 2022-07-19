import * as React from 'react'
import {
  Image,
  View,
  Text,
  Dimensions,
  Platform,
  StatusBar,
  ScrollView,
  Pressable,
} from 'react-native'
import InnerText from '../../components/common/InnerText'
import { EventType } from '../../models/Event'
import { getDate, getDateAndTime } from '../../utils/unixTime'
import { ScaledSheet } from 'react-native-size-matters'
import DummyDate from '../../data/DummyData.json'
import Unserbar from '../../components/common/Underbar'
import AvatarIcon from '../../components/common/AvatarIcon'

const eventDetail = DummyDate.event[2]

const { width: SCREEN_WIDTH } = Dimensions.get('window')
interface eventDetailProps {
  eventDetail: EventType
}

const EventDetail: React.FC<eventDetailProps> = ({}) => {
  return (
    <ScrollView style={style.eventOuterContainer}>
      <View style={style.eventImgContainer}>
        <Image
          style={style.eventImg}
          source={{ uri: eventDetail.thumnail }}
        ></Image>
      </View>

      <View style={style.eventTitleContainer}>
        <Text></Text>
        <InnerText innerText={eventDetail.title} size={30} />

        {eventDetail.type === 'sale' ? (
          <Text style={style.eventPrice}>
            {eventDetail.price[0].price} Klay
          </Text>
        ) : null}
        <View style={style.eventDateandButtonContainer}>
          {eventDetail.type === 'sale' ? (
            <InnerText
              innerText={`${getDate(eventDetail.event_start_date)} - ${getDate(
                eventDetail.event_end_date,
              )}`}
              size={15}
            />
          ) : (
            <View>
              <InnerText
                innerText={`${getDateAndTime(eventDetail.event_start_date)}`}
                size={15}
              />
              <InnerText
                innerText={` ~ ${getDateAndTime(eventDetail.event_end_date)}`}
                size={15}
              />
            </View>
          )}

          <Pressable style={style.eventButtonContainer}>
            <View style={style.eventButton}>
              <Text style={style.eventText}>
                {eventDetail.type === 'sale' ? '구매' : '응모'}
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
      <Unserbar />
      <View style={style.promoterContainer}>
        <AvatarIcon size={50} color={'lavender'} title={'tt'} />
        <InnerText innerText={eventDetail.promoter} size={20} />
      </View>
      <Unserbar />
      <View style={style.eventContentContainer}>
        <Text></Text>
        <InnerText innerText={'기획자 : '} size={10} />
        <InnerText innerText={'남은 좌석 : '} size={10} />
        <InnerText innerText={'기획자 : '} size={10} />
        <InnerText innerText={'남은 좌석 : '} size={10} />
      </View>
    </ScrollView>
  )
}

const style = ScaledSheet.create({
  eventOuterContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  eventImgContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  eventImg: {
    width: SCREEN_WIDTH * 0.7,
    height: SCREEN_WIDTH * 0.7,
    resizeMode: 'cover',
    borderRadius: 4,
  },
  eventTitleContainer: {
    marginTop: '10@msr',
    paddingHorizontal: '10@msr',
    justifyContent: 'space-around',
  },
  eventPrice: {
    color: '#666666',
    fontSize: '20@msr',
    marginHorizontal: '10@msr',
  },
  eventDateandButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventButtonContainer: { padding: '10@msr' },
  eventButton: {
    margin: '5@msr',
    paddingHorizontal: '15@msr',
    paddingVertical: '10@msr',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFCC00',
    borderRadius: 15,
    borderColor: '#FEE396',
    borderWidth: 1,
  },
  eventText: { color: '#333333', fontSize: '12@msr' },
  promoterContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  eventContentContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    flex: 2,
    marginTop: '5@msr',
  },
})

export default EventDetail
