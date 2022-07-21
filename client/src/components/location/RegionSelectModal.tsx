import React, { useState } from 'react'
import { Modal, StyleSheet, View, Dimensions, Text, ScrollView } from 'react-native'
import RegionButton from './RegionBtton'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

interface Props {
  modalVisible: boolean
  setModalVisible: any
  body: any
}
const RegionSelectModal = (props: Props) => {
  const [regionList, setRegionList] = useState(['전국', '서울시', '부산시', '경남', '경북', '충북', '충남', '강원도', '제주도', '전북', '전남', '대구', '인천'])
  const [region, setRegion] = useState('전국')

  const selectRegion = (target: string)=>{
    console.log(target);
    setRegion(target)
    props.setModalVisible(false)
  }
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
        <Text style={styles.regionTitle}>지역 선택</Text>
        <View style={styles.line}></View>
        <View  style={styles.regionSpace}>
        {regionList.map((ele, index) => {
          return(            
            <RegionButton region={ele} key={index} selectRegion={selectRegion}></RegionButton>
          )
        })}
        </View>
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
    flexDirection: 'column',
    position: 'absolute',
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.7,
    backgroundColor: 'white',
    borderRadius: 10,
    right: SCREEN_WIDTH * 0.1,
    bottom: SCREEN_HEIGHT * 0.15,
    padding: 10,
  },
  regionTitle:{
    marginTop: 15,
    fontSize: 25,
    alignSelf: 'center',
  },
  line:{
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'gray',
  },
  regionSpace:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    marginTop: 5,
    padding: 18,

    // borderWidth: 1,
    // borderStyle: 'solid',
    // borderColor: 'lightgray',
    // borderRadius: 10,
    height: SCREEN_HEIGHT * 0.5,
    width: 300
  }
})
export default RegionSelectModal
