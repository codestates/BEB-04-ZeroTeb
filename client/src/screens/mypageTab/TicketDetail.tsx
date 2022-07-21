import React, { useState, useCallback, useRef, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Text,
  ImageBackground,
} from 'react-native'
import { UserType } from '../../models/User'
import InnerText from '../../components/common/InnerText'

export default function TicketDetail(props: UserType){
    return(
        <View>
            <InnerText innerText={'T T'} size={10}></InnerText>
            <ImageBackground source={{uri: 'http://'}}></ImageBackground>

            <InnerText innerText={'2022.07.07 한국 최곡 가수 김영현 콘서트 S석 2층 T열 11'} size={18}></InnerText>
            <InnerText innerText={'양산 문화 예술 회관'} size={14}></InnerText>
            <View>
                <View><Text>QR</Text></View>
                <InnerText innerText={'확대하기'} size={25}></InnerText>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    tiketContainer:{
        flexDirection: 'column'
    },
    qrContainer:{
        
    }
})