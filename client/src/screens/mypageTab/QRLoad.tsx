import React from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native'
import InnerText from '../../components/common/InnerText'
import {SvgXml} from 'react-native-svg';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window')

interface Props{
    route: any
}

const QRLoad: React.FC<Props> = ({route}) =>{
    return(
        <View style={styles.loadContainer}>
            <View style={styles.qrContainer}>
                <SvgXml xml={route.params.qrcodeXML} width={SCREEN_WIDTH*0.8} height={SCREEN_WIDTH*0.8}/>
            </View>
            <View style={styles.titleContainer}>
                <InnerText innerText={'SCAN ME'} size={30}></InnerText>
            </View>
            <View style={styles.textContainer}>
                <InnerText innerText={'담당자에게 QR코드를 보여주세요'} size={18}></InnerText>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    loadContainer:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: SCREEN_HEIGHT,
        paddingBottom: 100
        
    },
    qrContainer:{
        padding: 15,
        borderColor: 'black',
        borderWidth: 3,
    },
    titleContainer:{
        marginVertical: 20,
        // backgroundColor: 'green',
        // borderColor:'red',
        borderWidth: 2,
        borderRadius: 10
    },
    textContainer:{

    },
})

export default QRLoad;