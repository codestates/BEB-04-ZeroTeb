import { useNavigation } from '@react-navigation/native'
import axios, { AxiosRequestConfig } from 'axios'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { View, StatusBar, Platform, StyleSheet, Dimensions, ScrollView } from 'react-native'
import SearchList from '../../components/search/SearchList'

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window')

export default function MyList() {
  const navigation = useNavigation()
  const [type, setType] = useState('');
  const [typeList, setTypeList] = useState([]);


    //http://server.beeimp.com:18080/event/history?address=0xf0a29e430d12065bfa9a5e0bc694f26accb151f4&page=1&count=5&type=created
  const getTypeListHandler = async () => {
    // address랑 type은 props로 받음

    //지금 페이지랑 카운트는 의미없음(작동 안함)
    const page = 1;
    const count = 1;
    const address = '0xf0a29e430d12065bfa9a5e0bc694f26accb151f4';
    const type = 'created';
    try {
      const config: AxiosRequestConfig = {
        method: 'get',
        url: `http://server.beeimp.com:18080/event/history?address=${address}&page=${page}&count=${count}&type=${type}`,
        withCredentials: true,
      }
      const res = await axios(config)
      console.log(res.data);
      if(res.data.message){
        console.log(res.data.message);
      }else{
        setTypeList(res.data);
      }      
    } catch (err) {
      alert(err)
    }
  }
  useEffect(()=>{
    getTypeListHandler();
  }, [])

  return (
    <ScrollView style={styles.container}>
    {/* <View style={styles.container}> */}
        <SearchList sendList={typeList}></SearchList>
    {/* </View> */}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'column',
        // justifyContent: 'center',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,

      },
})
