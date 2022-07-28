import axios, { AxiosRequestConfig } from 'axios';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../../components/wrapper';
import EventView from '../../layouts/event/view';
import Header from '../../layouts/header';
import { RootState } from '../../store';
import { eventInfoActions } from '../../store/event/viewSlice';

const EventViewPage: NextPage<EventViewPageType> = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.user);
  const axiosRequestConfig: AxiosRequestConfig = {
    method: 'GET',
    url: '/api/event/history',
    params: {
      // address: userState.address,
      address: userState.address,
      page: 1,
      count: 100,
      type: 'created',
    },
  };

  useEffect(() => {
    if (userState.isAuth) {
      axios(axiosRequestConfig).then((res) => {
        dispatch(
          eventInfoActions.seteventInfo(
            res.data.sort(
              (a: { event_end_date: number }, b: { event_end_date: number }) =>
                b.event_end_date - a.event_end_date
            )
          )
        );
      });
    }
  }, [userState.isAuth]);

  return (
    <Wrapper>
      <EventView></EventView>
      <Header></Header>
    </Wrapper>
  );
};

export default EventViewPage;
