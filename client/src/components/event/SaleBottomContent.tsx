import * as React from 'react'
import { View, Text } from 'react-native'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'
import { EventType } from '../../models/Event'
import Unserbar from '../../components/common/Underbar'
import Title from '../../components/common/Title'
import MapLocation from '../../components/common/MapLocation'
import SaleRefundPolicy from '../../components/event/SaleRefundPolicy'
import InnerText from '../common/InnerText'
import { getDate } from '../../utils/unixTime'
import EventImg from '../common/EventImg'
import { StyleSheet } from 'react-native'
import HTMLView from 'react-native-htmlview'
interface saleBottomContentProps {
  eventDetail: EventType
}
const styles = StyleSheet.create({
  content: {
    fontSize: moderateScale(15),
    color: '#333333',
  },
})

const SaleBottomContent: React.FC<saleBottomContentProps> = ({
  eventDetail,
}) => {
  const htmlContent = eventDetail.contents
  return (
    <>
      <Unserbar />
      <Text></Text>
      <Title title={'이벤트 내용'} size={18} />
      <View style={style.eventContentContainer}>
        <View style={style.innerContentContainer}>
          <HTMLView value={htmlContent} stylesheet={styles.content} />
        </View>
      </View>
      <Unserbar />
      <Text></Text>
      <Title title={'이벤트 정보'} size={18} />
      <View style={style.eventContentContainer}>
        {getDate(eventDetail.event_start_date) ===
        getDate(eventDetail.event_end_date) ? (
          <InnerText
            innerText={`- 이벤트 관람일 : ${getDate(
              eventDetail.event_start_date,
            )}`}
            size={15}
          />
        ) : (
          <>
            <InnerText
              innerText={`- 이벤트 관람일 \n: ${getDate(
                eventDetail.event_start_date,
              )} ~ ${getDate(eventDetail.event_end_date)}`}
              size={15}
            />
          </>
        )}
        <InnerText
          innerText={`- 총 판매좌석 : ${eventDetail.remaining}석`}
          size={15}
        />
        <InnerText
          innerText={`- 티켓 구매 가능 날짜 \n: ${getDate(
            eventDetail.recruit_start_date,
          )} ~ ${getDate(eventDetail.recruit_start_date)}`}
          size={15}
        />
      </View>
      <Unserbar />
      <Text></Text>
      <Title title={'토큰 이미지'} size={18} />
      <View style={style.eventContentContainer}>
        <EventImg
          imgUri={eventDetail.token_image_url}
          width={200}
          height={200}
        />
      </View>
      <Unserbar />
      <Text></Text>
      <Title title={'위치 및 장소'} size={18} />
      <View style={style.eventContentContainer}>
        <Text style={style.locationText}>
          {`${eventDetail.location} ${eventDetail?.sub_location}`}
        </Text>
        <MapLocation x={eventDetail.x} y={eventDetail.y} />
      </View>
      <Unserbar />
      <SaleRefundPolicy />
    </>
  )
}

const style = ScaledSheet.create({
  eventContentContainer: {
    paddingVertical: '15@msr',
    paddingHorizontal: '10@msr',
  },
  locationText: {
    marginHorizontal: '10@msr',
    fontSize: '15@msr',
    color: '#333333',
  },
  innerContentContainer: {
    alignItems: 'flex-start',
    marginHorizontal: moderateScale(10),
    marginVertical: moderateScale(5),
  },
})

export default SaleBottomContent
