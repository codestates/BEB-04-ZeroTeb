import * as React from 'react'
import { Text, View } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import InnerText from '../common/InnerText'
import Title from '../common/Title'

interface entryLotPolicyProps {}

const EntryLotPolicy: React.FC<entryLotPolicyProps> = () => {
  return (
    <View style={style.entryLotPolicyContainer}>
      <Text></Text>
      <Title title={'추첨 안내'} size={20} />
      <View style={style.eventContentContainer}>
        <InnerText innerText={'추첨은 랜덤 방식으로 진행됩니다.'} size={15} />
        <Text></Text>
        <InnerText innerText={'공정성 준수'} size={15} />
        <InnerText
          innerText={
            ' - 응모 당첨자는 사람이 아닌, 프로그램을 통해 랜덤하게 선정됩니다.'
          }
          size={15}
        />
        <Text></Text>
        <InnerText innerText={'안정성 강화'} size={15} />
        <InnerText
          innerText={
            ' - 매크로 프로그램, 가상 아이디 사용 등 부정한 방법의 구매 시도 시 일정 기간 동안 앱 사용이 정지될 수 있습니다.'
          }
          size={15}
        />
      </View>
    </View>
  )
}

const style = ScaledSheet.create({
  entryLotPolicyContainer: {
    alignItems: 'flex-start',
  },
  eventContentContainer: {
    paddingVertical: '15@msr',
    paddingHorizontal: '10@msr',
  },
})

export default EntryLotPolicy
