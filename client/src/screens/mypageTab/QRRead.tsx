import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'
import axios, { AxiosRequestConfig } from 'axios'
import { BarCodeScanner } from 'expo-barcode-scanner'


const QRread = ({route}) =>{
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  console.log('event_id:',route.params.event_id);

  useEffect(() => {
    ;(async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync() //권한 요청
      setHasPermission(status)
    })()
  }, [])

  const handleBarCodeScanned = async ({ type, data }) => {

    setScanned(true);
    const value = data.split(' ')
    console.log('value:',value);
    const params = { nonce: value[0], event_id: Number(value[1])};
    console.log('params:',params)

    try {
      const config: AxiosRequestConfig = {
        method: 'post',
        url: `http://server.beeimp.com:18080/token/qrcode/validation`,
        data: params,
        withCredentials: true,
      }
      const res = await axios(config)
      console.log(res.data.message)
      alert(res.data.message)
    } catch (e) {
      console.log(e)
    }
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
})

export default QRread
