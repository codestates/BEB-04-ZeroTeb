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
  SignIn: { gotoMyPage: boolean }
  CategoryListup: { catagoryName: string }
  EventDetail: { event: EventType }
}

export type SearchStackParamList = {
  Search: undefined
  SignIn: { gotoMyPage: boolean }
  SearchListup: { searchWord: string }
  EventDetail: { event: EventType }
}

export type MyPageStackParamList = {
  SignIn: { gotoMyPage: boolean }
  MyPage: { kilpAddress?: string; accessToken?: string }
  TicketDetail: {
    address?: string
    token_id?: string
    token_image_url?: string
  }
  QRLoad: { qrcodeXML: any }
  QRread: { event_id: any }
  Enroll: undefined
  MyList: { type: string }
  Notice: undefined
  EventDetail: { event: EventType }
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
