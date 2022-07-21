import { EventType } from './Event'

export type RootTabParamList = {
  HomeStackScreen: undefined
  CategoryStackScreen: undefined
  SearchStackScreen: undefined
  MyPageStackScreen: undefined
}

export type HomeStackParamList = {
  Home: undefined
  SignIn: { gotoMyPage: boolean }
  EventDetail: undefined
}

export type CategoryStackParamList = {
  Category: undefined
  CategoryListup: { catagoryName: string }
  EventDetail: undefined
}

export type SearchStackParamList = {
  Search: undefined
  SearchListup: { searchEventList: EventType[] }
  EventDetail: undefined
}

export type MyPageStackParamList = {
  SignIn: { gotoMyPage: boolean }
  MyPage: { kilpAddress?: string; accessToken?: string }
  TicketDetail: undefined
  QRLoad: { qrcodeXML: any }
  QRread: undefined
  Enroll: undefined
  MyList: undefined
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
