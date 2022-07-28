import { css } from '@emotion/react';
import { FunctionComponent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { EventInfoType } from '../../../types/event';
import EventCreateItemWrapper from '../create/item-wrapper';
import EventViewDateTime from './datetime';
import EventViewDescription from './description';
import EventDetail from './detail';
import EventViewImage from './event-image';
import EventViewTitle from './title';
import CloseIcon from '@mui/icons-material/Close';

interface EventViewListProps {
  title: string;
}

const EventViewList: FunctionComponent<EventViewListProps> = ({ title }) => {
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const [detailEvent, setDetailEvent] = useState<EventInfoType>();
  const categories = [
    { title: '공연', category: 'concert' },
    { title: '연극', category: 'theater' },
    { title: '유아/어린이', category: 'kid' },
    { title: '뮤지컬', category: 'musical' },
    { title: '전시회', category: 'exhibition' },
    { title: '레저스포츠', category: 'leisure sport' },
  ];
  const eventInfo = useSelector((state: RootState) => state.eventInfo);

  useEffect(() => {}, [eventInfo]);

  const listStyle = css`
    width: 100%;
    list-style: none;
  `;
  const itemStyle = css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    padding: 1em 0;
    @media screen and (max-width: 820px) {
      flex-direction: column;
      justify-content: center;
    }
  `;

  const contentsWrapperStyle = css`
    padding: 1%;
    width: 100%;

    padding: 0 1em;
  `;
  const contentsStyle = css`
    display: flex;
    justify-content: flex-start;
    align-content: center;
    flex-direction: column;
    width: 100%;
  `;

  const detailButtonStyle = css`
    color: white;
    background-color: rgba(100, 100, 100, 0.3);
    border: none;
    min-width: 5em;
    padding: 1em;
    margin: 1em 2em;

    :hover {
      transition-duration: 0.3s;
      background-color: rgba(100, 100, 100, 0.7);
      cursor: pointer;
    }
  `;

  const detailWrapperStyle = css`
    position: fixed;
    top: 100px;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    backdrop-filter: blur(30px);
  `;

  const closeWrapperStyle = css`
    position: relative;
    top: 10px;
    right: 10px;
  `;
  const closeStyle = css`
    font-size: 2em;
    color: white;
    border: 1px solid rgba(200, 200, 200, 0.8);
    background-color: rgba(200, 200, 200, 0.5);
    padding: 0.2em 0.5em;
    :hover {
      background-color: rgba(200, 200, 200, 0.8);
    }
  `;

  const developpingStyle = css`
    width: 100px;
    height: 100px;
    background-image: url('/static/developping.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  `;

  return (
    <EventCreateItemWrapper title={title}>
      <ul css={listStyle}>
        {eventInfo.data.length > 0 ? (
          eventInfo.data.map((event, index) => {
            return (
              <li css={itemStyle} key={index}>
                <EventViewImage url={event.thumnail} size={'280px'}></EventViewImage>
                <div css={contentsWrapperStyle}>
                  <EventViewTitle title={event.title}></EventViewTitle>
                  <div css={contentsStyle}>
                    <EventViewDescription title={'상태'}>{event.status}</EventViewDescription>
                    <EventViewDescription title={'유형'}>
                      {categories.find((item) => item.category === event.category)?.title}
                    </EventViewDescription>
                    <EventViewDescription title={'장소'}>
                      {[event.location, event.sub_location].join(' ')}
                    </EventViewDescription>
                    <EventViewDescription title={'모집기간'}>
                      <EventViewDateTime
                        start_date={new Date(event.recruit_start_date * 1000)}
                        end_date={new Date(event.recruit_end_date * 1000)}
                      ></EventViewDateTime>
                    </EventViewDescription>
                    <EventViewDescription title={'행사기간'}>
                      <EventViewDateTime
                        start_date={new Date(event.recruit_start_date * 1000)}
                        end_date={new Date(event.recruit_end_date * 1000)}
                      ></EventViewDateTime>
                    </EventViewDescription>
                  </div>
                </div>
                <button
                  css={detailButtonStyle}
                  onClick={() => {
                    setIsDetail(true);
                    setDetailEvent(event);
                  }}
                >
                  자세히 보기
                </button>
              </li>
            );
          })
        ) : (
          <div>등록한 이벤트가 없습니다.</div>
        )}
      </ul>
      {isDetail && !!detailEvent ? (
        <div css={detailWrapperStyle}>
          {/* <EventDetail event={detailEvent}> */}
          <div
            css={closeWrapperStyle}
            onClick={() => {
              setIsDetail(false);
            }}
          >
            <div css={developpingStyle}></div>
            {/* <CloseIcon css={closeStyle}></CloseIcon> */}
            <button css={closeStyle}>닫기</button>
          </div>
          {/* </EventDetail> */}
        </div>
      ) : undefined}
    </EventCreateItemWrapper>
  );
};

export default EventViewList;
