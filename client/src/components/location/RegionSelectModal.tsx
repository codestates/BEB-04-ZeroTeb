import React, { useState } from 'react'
import { Modal, StyleSheet, View, Dimensions } from 'react-native'
import RegionButton from './RegionBtton'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

interface Props {
  modalVisible: boolean
  setModalVisible: any
  body: any
}
const RegionSelectModal = (props: Props) => {
  const regionList = ['전국', '서울시', '부산시', '경남', '경북']
  const [region, setRegion] = useState('전국')

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
        {props.body}
      </View>
      <View style={styles.selectSpace}>
        {regionList.map(ele => {
          ;<RegionButton region={ele}></RegionButton>
        })}
      </View>
    </Modal>
  )
}
const styles = StyleSheet.create({
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
  selectSpace: {
    position: 'absolute',
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.5,
    backgroundColor: 'white',
    borderRadius: 10,
    right: SCREEN_WIDTH * 0.1,
    bottom: SCREEN_HEIGHT * 0.25,
  },
})
export default RegionSelectModal