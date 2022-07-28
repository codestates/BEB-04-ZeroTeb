import * as React from 'react'
import { View, Text } from 'react-native'
import { EventType } from '../../models/Event'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'
import Unserbar from '../../components/common/Underbar'
import EntryRefundPolicy from '../../components/event/EntryRefundPolicy'
import EntryLotPolicy from '../../components/event/EntryLotPolicy'
import EntryPrecaution from '../../components/event/EntryPrecaution'
import InnerText from '../common/InnerText'
import { getDate, getDateAndTime } from '../../utils/unixTime'
import Title from '../common/Title'
import EventImg from '../common/EventImg'
import { StyleSheet } from 'react-native'
import HTMLView from 'react-native-htmlview'

interface entryBottomContentProps {
  eventDetail: EventType
}

const styles = StyleSheet.create({
  content: {
    fontSize: moderateScale(15),
    color: '#333333',
  },
})

const EntryBottomContent: React.FC<entryBottomContentProps> = ({
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
        <InnerText
          innerText={`- 이벤트 행사일 : ${getDate(
            eventDetail.event_start_date,
          )}`}
          size={15}
        />
        <InnerText
          innerText={`- 티켓 응모 가능 날짜 \n: ${getDateAndTime(
            eventDetail.recruit_start_date,
          )} ~ ${getDateAndTime(eventDetail.recruit_end_date)}`}
          size={15}
        />

        <InnerText
          innerText={'* 이벤트 추첨은 응모 종료 시점에 시작됩니다.'}
          size={13}
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
      <EntryLotPolicy />
      <Unserbar />
      <EntryPrecaution />
      <Unserbar />
      <EntryRefundPolicy />
    </>
  )
}

const style = ScaledSheet.create({
  eventContentContainer: {
    paddingVertical: '15@msr',
    paddingHorizontal: '10@msr',
  },
  innerContentContainer: {
    alignItems: 'flex-start',
    marginHorizontal: moderateScale(10),
    marginVertical: moderateScale(5),
  },
})

export default EntryBottomContent
