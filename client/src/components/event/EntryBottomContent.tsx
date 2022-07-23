import * as React from 'react'
import { View } from 'react-native'
import { EventType } from '../../models/Event'
import { ScaledSheet } from 'react-native-size-matters'
import Unserbar from '../../components/common/Underbar'
import EntryRefundPolicy from '../../components/event/EntryRefundPolicy'
import EntryLotPolicy from '../../components/event/EntryLotPolicy'
import EntryPrecaution from '../../components/event/EntryPrecaution'

interface entryBottomContentProps {
  eventDetail: EventType
}

const EntryBottomContent: React.FC<entryBottomContentProps> = () => {
  return (
    <>
      <Unserbar />
      <EntryLotPolicy />
      <Unserbar />
      <EntryPrecaution />
      <Unserbar />
      <EntryRefundPolicy />
    </>
  )
}

const style = ScaledSheet.create({})

export default EntryBottomContent
