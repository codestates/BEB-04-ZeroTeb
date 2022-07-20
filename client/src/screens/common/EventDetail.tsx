import * as React from 'react'
import {
  Image,
  View,
  Text,
  Dimensions,
  ScrollView,
  Pressable,
  GestureResponderEvent,
} from 'react-native'
import InnerText from '../../components/common/InnerText'
import { EventType } from '../../models/Event'
import { getDate, getDateAndTime } from '../../utils/unixTime'
import { ScaledSheet } from 'react-native-size-matters'
import DummyDate from '../../data/DummyData.json'
import Unserbar from '../../components/common/Underbar'
import AvatarIcon from '../../components/common/AvatarIcon'
import Title from '../../components/common/Title'
import MapLocation from '../../components/common/MapLocation'
import SaleRefundPolicy from '../../components/event/SaleRefundPolicy'
import EntryRefundPolicy from '../../components/event/EntryRefundPolicy'
import EntryLotPolicy from '../../components/event/EntryLotPolicy'
import EntryPrecaution from '../../components/event/EntryPrecaution'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/Index'
import { useNavigation, useRoute } from '@react-navigation/native'

const eventDetail = DummyDate.event[1]

const { width: SCREEN_WIDTH } = Dimensions.get('window')
interface eventDetailProps {
  eventDetail: EventType
}

const EventDetail: React.FC<eventDetailProps> = ({}) => {
  const route = useRoute()
  const navigation = useNavigation()
  const KilpAddress = useSelector(
    (state: RootState) => state.signin.KilpAddress,
  )

  const pressButtonHendler = (event: GestureResponderEvent) => {
    if (KilpAddress === '') {
      navigation.navigate('SignIn')
    }
  }

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

          <Pressable
            style={style.eventButtonContainer}
            onPress={pressButtonHendler}
          >
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
      <Text></Text>
      <Title title={'이벤트 내용'} size={20} />
      <View style={style.eventContentContainer}>
        <InnerText innerText={eventDetail.contents} size={15} />
      </View>
      {eventDetail.type === 'sale' ? (
        <>
          <Unserbar />
          <Text></Text>
          <Title title={'위치 및 장소'} size={20} />
          <View style={style.eventContentContainer}>
            <InnerText innerText={eventDetail.location} size={15} />
            <MapLocation x={eventDetail.x} y={eventDetail.y} />
          </View>
          <Unserbar />
          <SaleRefundPolicy />
        </>
      ) : (
        <>
          <Unserbar />
          <EntryLotPolicy />
          <Unserbar />
          <EntryPrecaution />
          <Unserbar />
          <EntryRefundPolicy />
        </>
      )}
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
  eventText: { color: '#666666', fontSize: '12@msr' },
  promoterContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '15@msr',
    paddingHorizontal: '20@msr',
  },
  eventContentContainer: {
    paddingVertical: '15@msr',
    paddingHorizontal: '10@msr',
  },
})

export default EventDetail
