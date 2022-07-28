import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../../components/wrapper';
import CreateEvent from '../../layouts/event/create';
import Header from '../../layouts/header';
import { RootState } from '../../store';
import { createEventActions } from '../../store/event/createSlice';

const EventCreatePage: NextPage = () => {
  const useState = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (useState.isAuth) {
      dispatch(createEventActions.set_address(useState.address));
      dispatch(createEventActions.set_promoter(useState.username));
    }
  }, [useState.isAuth]);
  return (
    <Wrapper>
      <CreateEvent></CreateEvent>
      <Header></Header>
    </Wrapper>
  );
};

export default EventCreatePage;
