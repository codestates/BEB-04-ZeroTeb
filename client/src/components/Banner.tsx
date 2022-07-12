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
  src: string
  title: string
}

export default function Banner() {
  const [bannerContents, setBannerContents] = React.useState<BannerContent[]>([
    {
      src: 'https://images.unsplash.com/photo-1608048608029-99c772d199ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80',
      title: 'title',
    },
  ])

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
                source={{ uri: content.src }}
                resizeMode="cover"
                style={style.bannerInnerContainer}
              >
                <Text style={style.bannerText}>{content.title}</Text>
              </ImageBackground>
            </View>
          )
        })}
        <View>
          <ImageBackground
            source={image}
            resizeMode="cover"
            style={style.bannerInnerContainer}
          >
            <Text style={style.bannerText}>banner1</Text>
          </ImageBackground>
        </View>
        <View>
          <ImageBackground
            source={image}
            resizeMode="cover"
            style={style.bannerInnerContainer}
          >
            <Text style={style.bannerText}>banner2</Text>
          </ImageBackground>
        </View>
        <View>
          <ImageBackground
            source={image}
            resizeMode="cover"
            style={style.bannerInnerContainer}
          >
            <Text style={style.bannerText}>banner3</Text>
          </ImageBackground>
        </View>
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
    fontSize: 50,
    alignItems: 'center',
    color: 'white',
    paddingTop: 15,
  },
})
