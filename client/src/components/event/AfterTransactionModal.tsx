import React from 'react'
import { Modal, View, Dimensions, Text } from 'react-native'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'
import { AntDesign } from '@expo/vector-icons'
import InnerText from '../common/InnerText'
import { useNavigation } from '@react-navigation/native'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

interface Props {
  atModalVisible: boolean
  setAtModalVisible: any
  body: boolean
  message: string
}
const AfterTransactionModal = (props: Props) => {
  const navigation = useNavigation()
  return (
    <Modal
      animationType={'fade'}
      transparent={true}
      visible={props.atModalVisible}
    >
      <View style={styles.container}>
        <View
          style={styles.blankSpace}
          onTouchEnd={() => props.setAtModalVisible(false)} // 모달 빈 공간을 누르면 창 닫기
        />
        <View
          style={styles.constentSpace} // 모달 안
        >
          {props.body ? (
            <View>
              <View style={styles.constentHeaderSpace}>
                <InnerText innerText={props.message + ' 완료'} size={20} />
                <View
                  onTouchEnd={() => props.setAtModalVisible(false)} // 닫기 버튼
                >
                  <AntDesign
                    name="close"
                    size={moderateScale(24)}
                    color="black"
                  />
                </View>
              </View>

              <View>
                <InnerText
                  innerText={
                    '이벤트 ' + props.message + '(이/가) 완료되었습니다.'
                  }
                  size={15}
                />
              </View>
            </View>
          ) : (
            <View>
              <View style={styles.constentHeaderSpace}>
                <InnerText innerText={props.message + ' 실패'} size={20} />
                <View
                  onTouchEnd={() => props.setAtModalVisible(false)} // 닫기 버튼
                >
                  <AntDesign
                    name="close"
                    size={moderateScale(24)}
                    color="black"
                  />
                </View>
              </View>

              <View>
                <InnerText
                  innerText={
                    '이벤트 ' + props.message + '(이/가) 실패되었습니다.'
                  }
                  size={15}
                />
              </View>
            </View>
          )}

          <View
            style={styles.eventButton}
            onTouchEnd={() => {
              if (navigation.canGoBack()) {
                navigation.goBack()
              }
            }}
          >
            <Text style={styles.eventText}>확인</Text>
          </View>
        </View>
      </View>
    </Modal>
  )
}
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blankSpace: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: '#000000',
    opacity: 0.3,
  },
  constentSpace: {
    padding: '20@msr',
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.35,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    borderRadius: '10@msr',
  },
  constentHeaderSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventButton: {
    margin: '5@msr',
    paddingHorizontal: '15@msr',
    paddingVertical: '10@msr',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFCC00',
    borderRadius: '15@msr',
    borderColor: '#FEE396',
    borderWidth: 1,
  },
  propsText: { padding: '10@msr', fontSize: '15@msr' },
  eventText: { color: '#666666', fontSize: '12@msr' },
})
export default AfterTransactionModal
