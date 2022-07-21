import React from 'react'
import { Modal, StyleSheet, View, Dimensions, Text } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { AntDesign } from '@expo/vector-icons'
import InnerText from '../common/InnerText'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

interface Props {
  modalVisible: boolean
  setModalVisible: any
  body: any
  getPayment: any
}
const CheckModal = (props: Props) => {
  return (
    <Modal
      animationType={'fade'}
      transparent={true}
      visible={props.modalVisible}
    >
      <View style={styles.container}>
        <View
          style={styles.blankSpace}
          onTouchEnd={() => props.setModalVisible(false)} // 모달 빈 공간을 누르면 창 닫기
        />
        <View
          style={styles.constentSpace} // 모달 안
        >
          <View style={styles.constentHeaderSpace}>
            <InnerText innerText={'결제 안내'} size={20} />
            <View
              onTouchEnd={() => props.setModalVisible(false)} // 닫기 버튼
            >
              <AntDesign name="close" size={24} color="black" />
            </View>
          </View>
          <View>
            <InnerText
              innerText={`이벤트 참가를 위해 ${props.body} Klay 결제가 필요합니다.`}
              size={15}
            />
            <InnerText innerText={'진행하시겠습니까?'} size={15} />
          </View>
          <View
            style={styles.eventButton}
            onTouchEnd={() => props.getPayment(false)}
          >
            <Text style={styles.eventText}>결제 진행하기</Text>
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
    padding: 20,
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.35,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    borderRadius: 10,
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
    borderRadius: 15,
    borderColor: '#FEE396',
    borderWidth: 1,
  },
  propsText: { padding: '10@msr', fontSize: '15@msr' },
  eventText: { color: '#666666', fontSize: '12@msr' },
})
export default CheckModal
