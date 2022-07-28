import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import EventCreateItemWrapper from '../item-wrapper';
import EventCreateAddressSearch from './search';
import EventCreateAddressView from './view';

interface EventCreateAddressProps {
  isVisibleJuso: boolean;
  setIsVisibleJuso: Dispatch<SetStateAction<boolean>>;
}

const EventCreateAddress: FunctionComponent<EventCreateAddressProps> = ({
  isVisibleJuso,
  setIsVisibleJuso,
}) => {
  return (
    <EventCreateItemWrapper title={'이벤트 장소'}>
      {isVisibleJuso ? (
        <EventCreateAddressSearch
          isVisibleJuso={isVisibleJuso}
          setIsVisibleJuso={setIsVisibleJuso}
        ></EventCreateAddressSearch>
      ) : (
        <EventCreateAddressView setIsVisibleJuso={setIsVisibleJuso}></EventCreateAddressView>
      )}
    </EventCreateItemWrapper>
  );
};

export default EventCreateAddress;
