import * as React from 'react'
import { Text, View } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import InnerText from '../common/InnerText'
import Title from '../common/Title'

interface saleRefundPolicyProps {}

const SaleRefundPolicy: React.FC<saleRefundPolicyProps> = () => {
  return (
    <View style={style.saleRefundPolicyContainer}>
      <Text></Text>
      <Title title={'환불 규정'} size={18} />
      <View style={style.eventContentContainer}>
        <InnerText
          innerText={
            '트랜잭션 진행 시 발생하는 가스비(트랜잭션 수수료)는 소비자 부담입니다.'
          }
          size={15}
        />
        <Text></Text>
        <InnerText innerText={'기간에 따른 환불 금액 안내'} size={15} />
        <InnerText innerText={' - 10일 전 - 전액 환불'} size={15} />
        <InnerText
          innerText={' - 7일 전 - 티켓금액의 10% 제외 후 환불'}
          size={15}
        />
        <InnerText
          innerText={' - 3일 전 - 티켓금액의 20% 제외 후 환불'}
          size={15}
        />
        <InnerText
          innerText={' - 1일 전 - 티켓금액의 30% 제외 후 환불'}
          size={15}
        />
        <Text></Text>
        <InnerText innerText={'이벤트 취소 시 환불 금액 안내'} size={15} />
        <InnerText
          innerText={
            ' - TT 에서는 기획자의 이벤트 취소 및 계약 위반 시 티켓금액의 103%를 환불해드립니다.'
          }
          size={15}
        />
      </View>
    </View>
  )
}

const style = ScaledSheet.create({
  saleRefundPolicyContainer: {
    alignItems: 'flex-start',
  },
  eventContentContainer: {
    paddingVertical: '15@msr',
    paddingHorizontal: '10@msr',
  },
})

export default SaleRefundPolicy
