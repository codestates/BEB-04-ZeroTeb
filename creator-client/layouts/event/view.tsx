import { FunctionComponent } from 'react';
import {
  EventViewList,
  EventViewStatus,
  EventViewTitle,
  EventViewWrapper,
} from '../../components/event/view';

interface EventViewProps {}

const EventView: FunctionComponent<EventViewProps> = () => {
  return (
    <EventViewWrapper>
      <EventViewTitle title="등록한 이벤트" fontSize="2em"></EventViewTitle>
      <EventViewStatus title="이벤트 상태"></EventViewStatus>
      <EventViewList title="이벤트 목록"></EventViewList>
    </EventViewWrapper>
  );
};

export default EventView;
