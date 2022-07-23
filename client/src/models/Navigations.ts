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
  EventDetail: { event: EventType }
  MyLocationListup: undefined
}

export type CategoryStackParamList = {
  Category: undefined
  CategoryListup: { catagoryName: string }
  EventDetail: { event: EventType }
}

export type SearchStackParamList = {
  Search: undefined
  SearchListup: { searchWord: string }
  EventDetail: { event: EventType }
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
