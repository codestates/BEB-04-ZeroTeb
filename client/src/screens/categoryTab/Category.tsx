import { useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { View, StyleSheet, StatusBar, Platform } from 'react-native'
import { useSelector } from 'react-redux'
import CategoryButton from '../../components/category/CategoryButton'
import LocationButton from '../../components/location/LocationButton'
import { RootState } from '../../store/Index'

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight

const tempDataList = [
  {
    url: 'https://images.unsplash.com/photo-1520074189855-c26f27cc7ac8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1158&q=80',
    title: 'Concert',
  },
  {
    url: 'https://images.unsplash.com/photo-1576724196706-3f23f51ea351?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: 'Theater',
  },
  {
    url: 'https://images.unsplash.com/photo-1613794713137-a78aba4be84a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1175&q=80',
    title: 'Kids',
  },
  {
    url: 'https://images.unsplash.com/photo-1522642888367-8d98750c243c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: 'Musical',
  },
  {
    url: 'https://images.unsplash.com/photo-1617384104622-5f04202ca46b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=905&q=80',
    title: 'Exhibition',
  },
  {
    url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: 'Leisure sport',
  },
]

function Category() {
  const region = useSelector((state: RootState) => state.region.region)
  const navigation = useNavigation()

  const createButton = ele => {
    const pressHandler = () => {
      navigation.navigate('CategoryListup', { catagoryName: ele.title })
    }

    return (
      <CategoryButton
        key={ele.title}
        contentURL={ele.url}
        contentTitle={ele.title}
        onPress={pressHandler}
      ></CategoryButton>
    )
  }

  return (
    <View style={styles.categoryContainer}>
      <LocationButton region={region} />
      {tempDataList.map(ele => {
        return createButton(ele)
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  categoryContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: STATUSBAR_HEIGHT,
  },
})

export default Category
