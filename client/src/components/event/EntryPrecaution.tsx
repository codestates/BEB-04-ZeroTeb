import * as React from 'react'
import { Text, View } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import InnerText from '../common/InnerText'
import Title from '../common/Title'

interface entryPrecautionProps {}

const EntryPrecaution: React.FC<entryPrecautionProps> = () => {
  return (
    <View style={style.entryPrecautionContainer}>
      <Text></Text>
      <Title title={'기타 안내 사항'} size={18} />
      <View style={style.eventContentContainer}>
        <InnerText
          innerText={
            '제세공과금 안내 : 5만원을 초과하는 경품 수령 시 제세공과금(22%)은 고객 부담이며, 당첨자는 기한 내 제세공과금을 입금 하셔야 합니다.'
          }
          size={15}
        />
        <Text></Text>
        <InnerText
          innerText={
            '당첨자에 한해 당첨 사실 및 수령 의사 확인과 경품에 대한 제세공과금 관련해서 개별 연락 후 확정될 예정이며, 기획자의 사정에 의해 일정이 변경 될 수 있습니다.'
          }
          size={15}
        />
        <Text></Text>
        <InnerText
          innerText={
            '부정한 방법으로 이벤트에 참여한 경우 혜택은 회수 되며, 법에 따른 처벌 대상이 될 수 있습니다.'
          }
          size={15}
        />
        <Text></Text>
      </View>
    </View>
  )
}

const style = ScaledSheet.create({
  entryPrecautionContainer: {
    alignItems: 'flex-start',
  },
  eventContentContainer: {
    paddingVertical: '15@msr',
    paddingHorizontal: '10@msr',
  },
})

export default EntryPrecaution
