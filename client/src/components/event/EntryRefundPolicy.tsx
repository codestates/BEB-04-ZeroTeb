import * as React from 'react'
import { Text, View } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import InnerText from '../common/InnerText'
import Title from '../common/Title'

interface entryRefundPolicyProps {}

const EntryRefundPolicy: React.FC<entryRefundPolicyProps> = () => {
  return (
    <View style={style.entryRefundPolicyContainer}>
      <Text></Text>
      <Title title={'환불 규정'} size={20} />
      <View style={style.eventContentContainer}>
        <InnerText
          innerText={
            '트랜잭션 진행 시 발생하는 가스비(트랜잭션 수수료)는 소비자 부담입니다.'
          }
          size={15}
        />
        <Text></Text>
        <InnerText
          innerText={'응모 기간 내 환불 요청 시 전액 환불됩니다.'}
          size={15}
        />
        <Text></Text>
        <InnerText innerText={'이벤트 취소 시 환불 금액 안내'} size={15} />
        <InnerText
          innerText={
            ' - tt 에서는 기획자의 이벤트 취소 및 계약 위반 시 이벤트 기획비의 3%를 보상해드립니다.'
          }
          size={15}
        />
      </View>
    </View>
  )
}

const style = ScaledSheet.create({
  entryRefundPolicyContainer: {
    alignItems: 'flex-start',
  },
  eventContentContainer: {
    paddingVertical: '15@msr',
    paddingHorizontal: '10@msr',
  },
})

export default EntryRefundPolicy
