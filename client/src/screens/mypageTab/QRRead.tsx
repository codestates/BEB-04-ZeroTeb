import React, { useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Button,
} from 'react-native'
import InnerText from '../../components/common/InnerText'
import axios, { AxiosRequestConfig } from 'axios'
import { BarCodeScanner } from 'expo-barcode-scanner';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window')


const getQRcode = async () =>{
    console.log('qr 생성하기 ===============')
    
}

const confirmQR = (e: any) =>{
    console.log(e.data)
}


const QRread = () =>{
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();//권한 요청
          setHasPermission(status);
        })();
      }, []);

      const handleBarCodeScanned = async ({ type, data }) => {
        setScanned(true);
        const value = data.split(' ')   
        const params = { nonce: value[2]};
        try {
            const config: AxiosRequestConfig = {
                method: 'post',
                url: `http://server.beeimp.com:18080/token/qrcode/validation`,
                data: params,
                withCredentials: true,
            }
            const res = await axios(config)
            console.log(res.data.message)
            alert(res.data.message);
            // if(res.data.message == '유휴하지 않은 QR'){
            //     console.log(res.data.message)
            //     alert(res.data.message);
            // }else{
            //     console.log(res.data.message)
            //     alert(res.data.message);
            // }
        }catch (e) {
            console.log(e);
        }
      };

      if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
      }
      if (hasPermission === false) {
        return <Text>No access to camera</Text>;
      }

    return(
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
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

export default QRread;