import * as React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
} from 'react-native'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const image = {
  uri: 'https://images.unsplash.com/photo-1657529978238-fad7914674f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
}

interface BannerContent {
  props: {
    token_image_url: string
    title: string
  }
}

const Banner: React.FC<BannerContent> = ({ props }) => {
  const [bannerContents, setBannerContents] =
    React.useState<BannerContent[]>(props)

  return (
    <View style={style.bannerOuterContainer}>
      <ScrollView
        decelerationRate="fast"
        horizontal
        pagingEnabled
        indicatorStyle={'black'}
      >
        {bannerContents.map((content, index) => {
          return (
            <View key={index}>
              <ImageBackground
                source={{ uri: content.token_image_url }}
                resizeMode="cover"
                style={style.bannerInnerContainer}
              >
                <Text style={style.bannerText}>{content.title}</Text>
              </ImageBackground>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

const style = StyleSheet.create({
  bannerOuterContainer: {
    paddingTop: 10,
    maxHeight: 200,
  },
  bannerInnerContainer: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    width: SCREEN_WIDTH,
  },
  bannerText: {
    fontSize: 18,
    alignItems: 'center',
    color: 'white',
    paddingTop: 30,
  },
})

export default Banner
