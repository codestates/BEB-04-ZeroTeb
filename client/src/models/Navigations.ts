export type RootTabParamList = {
  HomeStackScreen: undefined
  CategoryStackScreen: undefined
  SearchStackScreen: undefined
  MyPageStackScreen: undefined
}

export type HomeStackParamList = { Home: undefined; SignIn: undefined }

export type CategoryStackParamList = {
  Category: undefined
  CategoryDetail: { catagoryName: string }
}

export type SearchStackParamList = {
  Search: undefined
  SearchDetail: { searchWord: string }
}

export type MyPageStackParamList = {
  SignIn: undefined
  MyPage: { kilpAddress?: string }
}

export interface RootStackParamList
  extends RootTabParamList,
    HomeStackParamList,
    CategoryStackParamList,
    SearchStackParamList,
    MyPageStackParamList {}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
