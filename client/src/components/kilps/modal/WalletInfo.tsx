import axios from 'axios'
import { Linking } from 'react-native'
const A2P_API_PREPARE_URL = 'https://a2a-api.klipwallet.com/v2/a2a/prepare' //prepare url
const APP_NAME = 'ZeroTEB'

//QR 생성 링크 만드는 함수
const getKlipAccessUrl = (request_key: string) => {
  return `kakaotalk://klipwallet/open?url=https://klipwallet.com/?target=/a2a?request_key=${request_key}`
}
//지갑 주소 수집
export const getAddress = (callback: any) => {
  axios
    .post(A2P_API_PREPARE_URL, {
      //prepare [request_key 받아오기]
      bapp: {
        name: APP_NAME,
      },
      type: 'auth',
    })
    .then(response => {
      //request [request_key 인증하기]
      const { request_key } = response.data
      Linking.openURL(getKlipAccessUrl(request_key)) //kilp 인증 화면 이동
      let timerId = setInterval(() => {
        axios
          .get(
            //result [지갑 주소 가져오기]
            `https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`,
          )
          .then(res => {
            if (res.data.result) {
              console.log(
                `[Result] ${JSON.stringify(res.data.result.klaytn_address)}`,
              ) //result에서 받은 결과 값 중 지갑 주소 확인
              callback(res.data.result.klaytn_address)
              clearInterval(timerId)
            }
          })
      }, 1000)
    })
}
