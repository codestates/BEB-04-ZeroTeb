import * as React from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { useState } from 'react'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const SetSellTypeModal = (props: any) => {
  const setList = props.setList
  const type = ['sale', 'entry']
  const [modalVisible, setModalVisible] = useState(false) // 모달창 켜기 끄기
  const onStart = () => {
    setModalVisible(true)
  }
  const onSelectType = (e: any) => {
    setModalVisible(false)
    setList({ ...props.list, type: e })
  }
  return (
    <View>
      <Text style={style.enrollContentText}>판매 타입(응모, 구매)</Text>
      <View style={style.modalWrapper}>
        <TouchableOpacity onPress={onStart}>
          <View style={style.enrollInput}>
            <Text style={{ left: 20, fontSize: 20 }}>{props.list.type}</Text>
          </View>
        </TouchableOpacity>
        <Modal animationType={'fade'} transparent={true} visible={modalVisible}>
          <View style={style.modalContainer}>
            <View
              style={style.blankSpace}
              onTouchEnd={() => setModalVisible(false)} // 모달 빈 공간을 누르면 창 닫기
            />
            <View style={style.modalSelectBody}>
              {type.map((keyword, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={style.modalSelect}
                    onPress={() => onSelectType(keyword)}
                  >
                    <Text style={style.modalText}>{keyword}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>
        </Modal>
      </View>
    </View>
  )
}

const style = ScaledSheet.create({
  modalWrapper: {},
  enrollContentText: {
    left: '20@mvs',
    fontSize: '20@mvs',
    fontWeight: 'bold',
  },
  enrollInput: {
    marginLeft: '15@mvs',
    marginRight: '15@mvs',
    marginTop: '5@mvs',
    marginBottom: '10@mvs',
    maxHeight: '30@vs',
    borderWidth: 1,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
  modalSelectBody: {
    overflow: 'scroll',
    width: SCREEN_WIDTH / 2,
    height: SCREEN_HEIGHT / 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  modalSelect: {
    width: SCREEN_WIDTH / 3,
    backgroundColor: '#3AACFF',
    borderRadius: 10,
    borderWidth: 0.5,
    margin: 5,
  },
  modalText: {
    fontSize: '20@vs',
    color: 'white',
    textAlign: 'center',
  },
  blankSpace: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: '#000000',
    opacity: 0.5,
  },
})

export default SetSellTypeModal
