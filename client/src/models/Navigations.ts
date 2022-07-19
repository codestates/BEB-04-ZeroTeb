export type RootTabParamList = {
  HomeStackScreen: undefined
  CategoryStackScreen: undefined
  SearchStackScreen: undefined
  MyPageStackScreen: undefined
}

export type HomeStackParamList = {
  Home: undefined
  SignIn: undefined
  EventDetail: undefined
}

export type CategoryStackParamList = {
  Category: undefined
  CategoryListup: { catagoryName: string }
  EventDetail: undefined
}

export type SearchStackParamList = {
  Search: undefined
  SearchListup: { searchWord: string }
  EventDetail: undefined
}

export type MyPageStackParamList = {
  SignIn: undefined
  MyPage: { kilpAddress?: string }
  Enroll: undefined
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
