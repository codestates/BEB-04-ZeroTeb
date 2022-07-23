import React, { useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Dimensions,
  Pressable,
} from 'react-native'
import { UserType } from '../../models/User'
import InnerText from '../../components/common/InnerText'
import axios, { AxiosRequestConfig } from 'axios'
import {SvgXml} from 'react-native-svg';
import { useNavigation } from '@react-navigation/native'
import { ScaledSheet } from 'react-native-size-matters'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window')
//props: UserType

const TicketDetail = ({route}) =>{
    const navigation = useNavigation()
    const [qrSVG, setQrSVG] = useState('qr 생성 중~');

    const pressHandler = () => {
        if(qrSVG !== 'qr 생성 중~'){
            navigation.navigate('QRLoad', { qrcodeXML: qrSVG })
        }
    }  
    
    //`http://server.beeimp.com:18080/token/qrcode?address=${props.address}&token_id=${props.token_id}`
    //useEffect는 async를 사용 못함
    const getQRcode = async () =>{
        console.log('qr 생성하기 ===============')
        try {
            const config: AxiosRequestConfig = {
                method: 'get',
                url: `http://server.beeimp.com:18080/token/qrcode?address=${route.params.address}&token_id=${route.params.token_id}`,
                withCredentials: true,
            }

            const res = await axios(config)
            if(res.data.message){
                console.log(res.data.message)
            }else{
                console.log(res.data)
                setQrSVG(res.data)
            }
        }catch (e) {
            console.log(e);
        }
    }

    // qr 받아오기
    useEffect(()=>{
        getQRcode()//아직 미완성
    }, [])
    
    return(
        <View style={styles.detailContainer}>
            <InnerText innerText={'티켓은 TT에서!'} size={12}/>
            <View style={styles.imgContainer}>
            <ImageBackground
                source={{uri: 'https://images.unsplash.com/photo-1532976854-1aeb3bdd52de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'}}
                resizeMode='cover'
                style={styles.imgContent}
            />
            </View>
            <View style={styles.titleContainer}>
                <InnerText innerText={'2022. 07. 07 한국 최곡 가수 김영현 콘서트 S석 2층 T열 11'} size={22}></InnerText>
            </View>
            <InnerText innerText={'양산 문화 예술 회관'} size={14}></InnerText>
            <View style={styles.qrContainer}>
                <View style={styles.qrSide}>                    
                   {qrSVG === 'qr 생성 중~' ? <Text>{qrSVG}</Text> : <SvgXml xml={qrSVG} width="50" height="50"/>}
                </View>
                <View style={styles.textSide}>
                    <Pressable onPress={pressHandler}>
                        <InnerText innerText={'확대하기'} size={25}></InnerText>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = ScaledSheet.create({
    detailContainer:{
        padding: '20@msr',   
        backgroundColor: 'white',
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',        
    },
    imgContainer:{
        marginTop: '2@msr',
        borderWidth: '3@msr',
        borderColor: 'black',
        borderRadius: '10@msr',
        overflow: 'hidden'
    },
    imgContent:{
        justifyContent: 'center',
        width: SCREEN_WIDTH * 0.75,
        height: SCREEN_HEIGHT * 0.52,
        overflow: 'hidden'
    },
    titleContainer:{
        margin: '10@msr'
    },
    qrContainer:{
        marginTop: '8@msr',
        flexDirection: 'row',
        borderColor: 'black',
        borderRadius: '8@msr',
        borderWidth: '1@msr',
        width: '70%',
        height: SCREEN_HEIGHT * 0.1        
    },
    qrSide:{
        width: '50%',
        borderRightWidth: '1@msr',
        alignItems: 'center',
        justifyContent: 'center',        
    },
    textSide:{
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',  
    }
})


// const styles = StyleSheet.create({
//     detailContainer:{
//         padding: 20,   
//         backgroundColor: 'white',
//         flexDirection:'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100%',
//         width: '100%',        
//     },
//     imgContainer:{
//         marginTop: 2,
//         borderWidth: 3,
//         borderColor: 'black',
//         borderRadius: 10,
//         overflow: 'hidden'
//     },
//     imgContent:{
//         justifyContent: 'center',
//         width: SCREEN_WIDTH * 0.75,
//         height: SCREEN_HEIGHT * 0.52,
//         overflow: 'hidden'
//     },
//     titleContainer:{
//         margin: 10
//     },
//     qrContainer:{
//         marginTop: 8,
//         flexDirection: 'row',
//         borderColor: 'black',
//         borderRadius: 8,
//         borderWidth: 1,
//         width: '70%',
//         height: SCREEN_HEIGHT * 0.1        
//     },
//     qrSide:{
//         width: '50%',
//         borderRightWidth: 1,
//         alignItems: 'center',
//         justifyContent: 'center',        
//     },
//     textSide:{
//         width: '50%',
//         alignItems: 'center',
//         justifyContent: 'center',  
//     }
// })

export default TicketDetail;