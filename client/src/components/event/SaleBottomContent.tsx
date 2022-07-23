import * as React from 'react'
import { View, Text } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { EventType } from '../../models/Event'
import Unserbar from '../../components/common/Underbar'
import Title from '../../components/common/Title'
import MapLocation from '../../components/common/MapLocation'
import SaleRefundPolicy from '../../components/event/SaleRefundPolicy'

interface saleBottomContentProps {
  eventDetail: EventType
}

const SaleBottomContent: React.FC<saleBottomContentProps> = ({
  eventDetail,
}) => {
  return (
    <>
      <Unserbar />
      <Text></Text>
      <Title title={'위치 및 장소'} size={20} />
      <View style={style.eventContentContainer}>
        <Text style={style.locationText}>
          {eventDetail.location}
          {eventDetail?.sub_location}
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
})

export default SaleBottomContent
