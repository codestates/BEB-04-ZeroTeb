import * as React from 'react'
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { Pressable, Text } from 'react-native'

const ImagePickerComponent = () => {
  // 현재 이미지 주소
  const [imageUrl, setImageUrl] = useState('')
  // 권한 요청을 위한 hooks
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions()

  const uploadImage = async () => {
    // 권한 확인 코드: 권한 없으면 물어보고, 승인하지 않으면 함수 종료
    if (!status?.granted) {
      const permission = await requestPermission()
      if (!permission.granted) {
        return null
      }
    }

    // 이미지 업로드 기능
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      aspect: [1, 1],
    })
    if (result.cancelled) {
      return null // 이미지 업로드 취소한 경우
    }

    // 이미지 업로드 결과 및 이미지 경로 업데이트
    console.log(result)
    setImageUrl(result.uri)

    // 서버에 요청 보내기
    const localUri = result.uri
    const filename = localUri.split('/').pop()
    const match = /\.(\w+)$/.exec(filename ?? '')
    const type = match ? `image/${match[1]}` : `image`
    const formData = new FormData()
    formData.append('image', { uri: localUri, name: filename, type })

    await axios({
      method: 'post',
      url: '{API주소}',
      headers: {
        'content-type': 'multipart/form-data',
      },
      data: formData,
    })
  }

  return (
    <Pressable onPress={uploadImage}>
      <Text>이미지 업로드하기</Text>
      <Image source={{ uri: imageUrl }} />
    </Pressable>
  )
}

export default ImagePickerComponent
