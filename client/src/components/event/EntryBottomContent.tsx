import * as React from 'react'
import { View } from 'react-native'
import { EventType } from '../../models/Event'
import { ScaledSheet } from 'react-native-size-matters'
import Unserbar from '../../components/common/Underbar'
import EntryRefundPolicy from '../../components/event/EntryRefundPolicy'
import EntryLotPolicy from '../../components/event/EntryLotPolicy'
import EntryPrecaution from '../../components/event/EntryPrecaution'
import InnerText from '../common/InnerText'
import { getDate } from '../../utils/unixTime'

interface entryBottomContentProps {
  eventDetail: EventType
}

const EntryBottomContent: React.FC<entryBottomContentProps> = ({
  eventDetail,
}) => {
  return (
    <>
      <View style={style.eventContentContainer}>
        {getDate(eventDetail.event_start_date) ===
        getDate(eventDetail.event_end_date) ? (
          <InnerText
            innerText={`이벤트 응모 당첨일 : ${getDate(
              eventDetail.event_start_date,
            )}`}
            size={20}
          />
        ) : (
          <>
            <InnerText innerText={`이벤트 응모 당첨일 : `} size={20} />
            <InnerText
              innerText={`${getDate(eventDetail.event_start_date)} ~ ${getDate(
                eventDetail.event_end_date,
              )}`}
              size={20}
            />
          </>
        )}
        <InnerText innerText={`티켓 응모 가능 날짜 : `} size={20} />
        <InnerText
          innerText={`${getDate(eventDetail.recruit_start_date)} ~ ${getDate(
            eventDetail.recruit_start_date,
          )}`}
          size={20}
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
})

export default EntryBottomContent
