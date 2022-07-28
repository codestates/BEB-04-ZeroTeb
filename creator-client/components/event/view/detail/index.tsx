import { css } from '@emotion/react';
import { FunctionComponent, ReactNode } from 'react';
import { EventInfoType } from '../../../../types/event';
import EventCreateItemWrapper from '../../create/item-wrapper';
import EventViewDateTime from '../datetime';
import EventViewImage from '../event-image';
import EventViewTitle from '../title';

interface EventDetailProps {
  event: EventInfoType;
  children: ReactNode;
}

const EventDetail: FunctionComponent<EventDetailProps> = ({ event, children }) => {
  const wrapperStyle = css`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    width: 80vw;
    max-width: 1500px;
    height: calc(90vh - 100px);

    background-color: rgba(255, 255, 255, 0.7);

    padding: 1em;

    overflow-y: auto;
  `;

  const datetimeStyle = css`
    display: flex;
    @media screen and (max-width: 800px) {
      display: block;
    }
  `;
  return (
    <div css={wrapperStyle}>
      <div>
        <EventViewImage url={event.thumnail} size={'50vw'}></EventViewImage>
      </div>
      <div>
        <EventViewTitle title={event.title} fontSize="2.5em"></EventViewTitle>
      </div>
      <div css={datetimeStyle}>
        <EventCreateItemWrapper title={'모집 기간'}>
          <EventViewDateTime
            start_date={new Date(event.recruit_start_date * 1000)}
            end_date={new Date(event.recruit_end_date * 1000)}
          ></EventViewDateTime>
        </EventCreateItemWrapper>
        <EventCreateItemWrapper title={'행사 기간'}>
          <EventViewDateTime
            start_date={new Date(event.event_start_date * 1000)}
            end_date={new Date(event.event_end_date * 1000)}
          ></EventViewDateTime>
        </EventCreateItemWrapper>
      </div>
      <div>
        <EventCreateItemWrapper title={'티켓 유형'}>
          <EventViewImage url={event.token_image_url} size="30vw"></EventViewImage>
          <ul>
            {event.price.map((value, index) => {
              return (
                <li key={index}>
                  class <span>{value.class}</span>
                  <span>{value.price}</span> Klay
                  <span>{value.count}</span> 명
                </li>
              );
            })}
          </ul>
        </EventCreateItemWrapper>
      </div>
      {children}
    </div>
  );
};

export default EventDetail;
