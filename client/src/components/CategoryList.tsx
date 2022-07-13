import React from 'react'
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  ImageBackground,
} from 'react-native'

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    image: '',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    image: '',
  },
  {
    id: '5er694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image: '',
  },
  {
    id: 'de694a0f-3da1-471f-bd96-145571e29d86',
    title: 'Third Item',
    image: '',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d75',
    title: 'Third Item',
    image: '',
  },
]

interface CategoryProps {
  title: string
  image: string
}

const Category: React.FC<CategoryProps> = ({ title, image }) => (
  <View style={styles.item}>
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <Text style={styles.title}>{title}</Text>
    </ImageBackground>
  </View>
)

const CategoryList = () => {
  const renderItem = ({ item }) => (
    <Category title={item.title} image={item.image} />
  )

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
})

export default CategoryList
