import React from 'react'
import { View, Dimensions } from 'react-native'
import InnerText from '../../components/common/InnerText'
import { SvgXml } from 'react-native-svg'
import { ScaledSheet } from 'react-native-size-matters'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

interface Props {
  route: any
}

const QRLoad: React.FC<Props> = ({ route }) => {
  return (
    <View style={styles.loadContainer}>
      <View style={styles.qrContainer}>
        <SvgXml
          xml={route.params.qrcodeXML}
          width={SCREEN_WIDTH * 0.8}
          height={SCREEN_WIDTH * 0.8}
        />
      </View>
      <View style={styles.titleContainer}>
        <InnerText innerText={'SCAN ME'} size={30}></InnerText>
      </View>
      <View>
        <InnerText
          innerText={'담당자에게 QR코드를 보여주세요'}
          size={18}
        ></InnerText>
      </View>
    </View>
  )
}

const styles = ScaledSheet.create({
  loadContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: SCREEN_HEIGHT,
    paddingBottom: '150@msr',
  },
  qrContainer: {
    padding: '15@msr',
    borderColor: 'black',
    borderWidth: '3@msr',
  },
  titleContainer: {
    marginVertical: '20@msr',
    borderWidth: '2@msr',
    borderRadius: '10@msr',
  },
})

export default QRLoad
