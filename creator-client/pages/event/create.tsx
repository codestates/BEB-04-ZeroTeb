import type { NextPage } from 'next';
import Wrapper from '../../components/wrapper';
import CreateEvent from '../../layouts/event/create';
import Header from '../../layouts/header';

const EventCreatePage: NextPage = () => {
  return (
    <Wrapper>
      <CreateEvent></CreateEvent>
      <Header></Header>
    </Wrapper>
  );
};

export default EventCreatePage;
