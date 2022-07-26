import axios from 'axios'
import { Linking } from 'react-native'
import { Buffer } from 'buffer'

const A2P_API_PREPARE_URL = 'https://a2a-api.klipwallet.com/v2/a2a/prepare' //prepare url
const APP_NAME = 'TT'

let timeid: any = null
let getAccessToken: any = null
//QR 생성 링크 만드는 함수
const getKlipAccessUrl = (request_key: string) => {
  return `kakaotalk://klipwallet/open?url=https://klipwallet.com/?target=/a2a?request_key=${request_key}`
}

const stopInterval = () => {
  clearInterval(timeid)
}
const stopGetAccessToken = () => {
  clearInterval(getAccessToken)
}

const decodePayload = (tokenData: string) => {
  var token = tokenData
  var base64Payload = token.split('.')[1]
  const payload = Buffer.from(base64Payload, 'base64').toString('utf8')
  return payload.slice(12, 42 + 12)
}

//지갑 주소 수집
export const getAddress = (callback: any, tokenback: any) => {
  axios
    .post(A2P_API_PREPARE_URL, {
      //prepare [request_key 받아오기]
      bapp: {
        name: APP_NAME,
      },
      type: 'auth',
    })
    .then(async response => {
      //request [request_key 인증하기]
      const { request_key } = response.data
      Linking.openURL(getKlipAccessUrl(request_key)) //kilp 인증 화면 이동
      // timeid = setInterval(async () => {
      //   // result [지갑 주소 가져오기]
      //   await axios
      //     .get(
      //       `https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`,
      //     )
      //     .then(res => {
      //       const data = res.data
      //       if (data.status === 'completed') {
      //         // result에서 받은 결과 값 중 지갑 주소 확인
      //         console.log(`[Result] ${data.result.klaytn_address}`)
      //         // 지갑 주소 저장 콜백
      //         stopInterval()
      //         callback(data.result.klaytn_address)
      //       }
      //     })
      // }, 3000)
      return request_key
    })
    // 지갑 인증 후 서버에 request_key 전달
    .then(async res => {
      const params = {
        request_key: res,
      }

      getAccessToken = setInterval(async () => {
        console.log('setInterval')
        // result [accessToken 가져오기]
        await axios
          .post(`http://server.beeimp.com:18080/auth/signin`, params, {
            withCredentials: true,
          })
          .then(async res => {
            const data = res.data
            if (data.status === 'completed') {
              const accessToken = res.headers['set-cookie'][0]
                .split(' ')[0]
                .slice(13, -1)
              const payload = await decodePayload(accessToken)
              console.log('payload:', payload)
              console.log('accessToken:', accessToken)
              callback(payload)
              tokenback(accessToken)
              stopGetAccessToken()
            } else {
              console.log(data.status)
            }
          })
      }, 3000)
    })
}
