import React, { useState, useCallback, useRef, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Text,
} from 'react-native'
import { TabView } from 'react-native-tab-view'
import MyPageHeader from '../../components/mypage/MyPageHeader'
import MyPagettList from '../../components/mypage/MyPagettList'
import MyPageInfo from '../../components/mypage/MyPageInfo'
import axios, { AxiosRequestConfig } from 'axios'
import { UserType } from '../../models/User'
import LoadingImg from '../../components/common/LoadingImg'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/Index'

const TABBAR_HEIGHT = 60

interface Props {
  route: {
    key: string
    name: string
    params: {
      kilpAddress: string
      accessToken: string
    }
  }
}

const MyPage: React.FC<Props> = ({ route }) => {
  const KilpAddress = useSelector(
    (state: RootState) => state.signin.KilpAddress,
  )

  const [myState, setMyState] = useState<UserType>({
    username: 'tt',
    profile_url: 'CCCCFF',
    history: {
      created: 0,
      entry: 0,
      sale: 0,
      liked: 0,
    },
    tokens: [{}],
  })

  const getUserInfo = async () => {
    try {
      const config: AxiosRequestConfig = {
        method: 'get',
        url: `http://server.beeimp.com:18080/auth/userInfo?address=${KilpAddress}`,
        withCredentials: true,
      }
      const res = await axios(config)
      setMyState(res.data)
    } catch (err) {
      alert(err)
    }
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  const [headerHeight, setHeaderHeight] = useState(0)
  const [tabRoutes, setTabRoutes] = useState([
    { key: 'screen1', title: 'tt' },
    { key: 'screen2', title: 'Info' },
  ])
  const [tabIndex, setTabIndex] = useState(0)
  const tabIndexRef = useRef(0)
  const isListGlidingRef = useRef(false)
  const listArrRef = useRef([])
  const listOffsetRef = useRef({})

  const scrollY = useRef(new Animated.Value(0)).current
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
    extrapolate: 'clamp',
  })

  const tabBarTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [headerHeight, 0],
    extrapolateRight: 'clamp',
  })

  useEffect(() => {
    scrollY.addListener(({ value }) => {})

    return () => {
      scrollY.removeListener()
    }
  }, [])

  const headerOnLayout = useCallback(event => {
    const { height } = event.nativeEvent.layout
    setHeaderHeight(height)
  }, [])

  const onTabIndexChange = useCallback(id => {
    setTabIndex(id)
    tabIndexRef.current = id
  }, [])

  const onTabPress = useCallback(idx => {
    if (!isListGlidingRef.current) {
      setTabIndex(idx)
      tabIndexRef.current = idx
    }
  }, [])

  const syncScrollOffset = () => {
    const focusedTabKey = tabRoutes[tabIndexRef.current].key

    listArrRef.current.forEach(item => {
      if (item.key !== focusedTabKey) {
        if (scrollY._value < headerHeight && scrollY._value >= 0) {
          if (item.value) {
            item.value.scrollToOffset({
              offset: scrollY._value,
              animated: false,
            })
            listOffsetRef.current[item.key] = scrollY._value
          }
        } else if (scrollY._value >= headerHeight) {
          if (
            listOffsetRef.current[item.key] < headerHeight ||
            listOffsetRef.current[item.key] === null
          ) {
            if (item.value) {
              item.value.scrollToOffset({
                offset: headerHeight,
                aniamted: false,
              })
              listOffsetRef.current[item.key] = headerHeight
            }
          }
        }
      } else {
        if (item.value) {
          listOffsetRef.current[item.key] = scrollY._value
        }
      }
    })
  }

  const onMomentumScrollBegin = useCallback(() => {
    isListGlidingRef.current = true
  }, [])
  const onMomentumScrollEnd = useCallback(() => {
    isListGlidingRef.current = false
    syncScrollOffset()
  }, [headerHeight])
  const onScrollEndDrag = useCallback(() => {
    syncScrollOffset()
  }, [headerHeight])

  const renderTabBar = useCallback(
    props => {
      return (
        <Animated.View
          style={[
            styles.collapsibleTabBar,
            { transform: [{ translateY: tabBarTranslateY }] },
          ]}
        >
          {props.navigationState.routes.map(
            (route: { title: string }, idx: React.Key) => {
              return (
                <TouchableOpacity
                  style={styles.collapsibleTabBarButton}
                  key={idx}
                  onPress={() => {
                    onTabPress(idx)
                  }}
                >
                  <View style={styles.collapsibleTabBarLabelContainer}>
                    <Text style={styles.collapsibleTabBarLabelText}>
                      {route.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            },
          )}
        </Animated.View>
      )
    },
    [headerHeight],
  )

  const renderScene = useCallback(
    ({ route }) => {
      const isFocused = route.key === tabRoutes[tabIndex].key

      return tabRoutes[tabIndex].key === 'screen1' ? (
        <MyPagettList
          headerHeight={headerHeight}
          scrollY={scrollY}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollEndDrag={onScrollEndDrag}
          tabRoute={route}
          listArrRef={listArrRef}
          isTabFocused={isFocused}
        />
      ) : (
        <MyPageInfo
          headerHeight={headerHeight}
          scrollY={scrollY}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollEndDrag={onScrollEndDrag}
          tabRoute={route}
          listArrRef={listArrRef}
          isTabFocused={isFocused}
          userInfo={myState}
        />
      )
    },
    [headerHeight, tabIndex],
  )

  return (
    <>
      {myState.username === 'tt' ? (
        <LoadingImg />
      ) : (
        <View style={styles.rootContainer}>
          {headerHeight > 0 ? (
            <TabView
              navigationState={{ index: tabIndex, routes: tabRoutes }}
              renderScene={renderScene}
              renderTabBar={renderTabBar}
              onIndexChange={onTabIndexChange}
            />
          ) : null}
          <Animated.View
            style={{
              ...styles.headerContainer,
              transform: [{ translateY: headerTranslateY }],
            }}
            onLayout={headerOnLayout}
            pointerEvents="box-none"
          >
            <MyPageHeader userInfo={myState} />
          </Animated.View>
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    width: '100%',
  },
  collapsibleTabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: TABBAR_HEIGHT,
    backgroundColor: '#FFFFFF',
    zIndex: 1,
  },
  collapsibleTabBarButton: {
    flex: 1,
  },
  collapsibleTabBarLabelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  collapsibleTabBarLabelText: {
    fontSize: 15,
    color: '#587058',
  },
})

export default MyPage
