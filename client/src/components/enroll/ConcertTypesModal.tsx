import * as React from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native'
import { useState } from 'react'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const ConcertTypesModal = (props: any) => {
  const setList = props.setList
  const category = [
    'concert',
    'Theater',
    'Kids',
    'Musical',
    'Exhibition',
    'Leisure Sport',
  ]
  const [modalVisible, setModalVisible] = useState(false) // 모달창 켜기 끄기
  const onStart = () => {
    setModalVisible(true)
  }
  const onSelectType = (e: any) => {
    setModalVisible(false)
    setList({ ...props.list, category: e })
  }
  return (
    <View>
      <Text style={style.enrollContentText}>이벤트 종류</Text>
      <View style={style.modalWrapper}>
        <TouchableOpacity onPress={onStart}>
          <View style={style.enrollInput}>
            <Text style={{ left: 20, fontSize: 20 }}>
              {props.list.category}
            </Text>
          </View>
        </TouchableOpacity>
        <Modal animationType={'fade'} transparent={true} visible={modalVisible}>
          <View style={style.modalContainer}>
            <View
              style={style.blankSpace}
              onTouchEnd={() => setModalVisible(false)} // 모달 빈 공간을 누르면 창 닫기
            />
            <View style={style.modalSelectBody}>
              {category.map((keyword, index) => {
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

const style = StyleSheet.create({
  modalWrapper: {},
  enrollContentText: {
    left: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  enrollInput: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 10,
    maxHeight: 30,
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
    fontSize: 20,
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

export default ConcertTypesModal
