import React from 'react'
import { Modal, View, Dimensions, Image } from 'react-native'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

interface Props {
  loadingModalVisible: boolean
  setLoadingModalVisible: Function
}
const LoadingModal = (props: Props) => {
  return (
    <Modal
      animationType={'fade'}
      transparent={true}
      visible={props.loadingModalVisible}
    >
      <View style={styles.container}>
        <View
          style={styles.blankSpace}
          onTouchEnd={() => props.setLoadingModalVisible(false)} // 모달 빈 공간을 누르면 창 닫기
        />
        <View
          style={styles.constentSpace} // 모달 안
        >
          <Image
            source={{
              uri: 'https://i.ibb.co/5vP1d8X/Spin-1s-200px-without-Background.gif',
            }}
            style={{
              width: moderateScale(100),
              height: moderateScale(100),
              alignSelf: 'center',
            }}
          />
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
  constentSpace: {},
  loadingSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
export default LoadingModal
