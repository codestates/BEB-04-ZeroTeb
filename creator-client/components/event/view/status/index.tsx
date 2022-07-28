import { FunctionComponent } from 'react';
import EventCreateItemWrapper from '../../create/item-wrapper';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { EventStatusType } from '../../../../types/event';

interface EventViewStatusProps {
  title: string;
}

const EventViewStatus: FunctionComponent<EventViewStatusProps> = ({ title }) => {
  const eventInfo = useSelector((state: RootState) => state.eventInfo);
  const statusArray = [
    { name: '등록', status: 'created', color: 'rgba(255, 133, 133, 0.5)' },
    // { name: '발행중', status: 'minting', color: 'rgba(255, 249, 133, 0.5)' },
    { name: '발행', status: 'minted', color: 'rgba(255, 194, 133, 0.5)' },
    { name: '응모', status: 'applying', color: 'rgba(148, 220, 115, 0.5)' },
    { name: '구매', status: 'selling', color: 'rgba(133, 194, 255, 0.5)' },
    { name: '대기', status: 'preparing', color: 'rgba(198, 133, 255, 0.5)' },
    { name: '진행중', status: 'progressing', color: 'rgba(116, 224, 217, 0.5)' },
    { name: '종료', status: 'end', color: 'rgba(255, 133, 208, 0.5)' },
  ];
  const counts = statusArray.map(
    (status) => eventInfo.data.filter((item) => item.status === status.status).length
  );
  console.log('counts :', counts);

  const wrapperStyle = css`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 1200px;
    width: 80vw;
    padding: 1em;
    @media screen and (max-width: 900px) {
      justify-content: flex-start;
      overflow-x: auto;
      width: 70vw;
    }
    @media screen and (max-width: 600px) {
      width: 60vw;
    }
  `;
  const statusStyle = (color: string) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    background-color: ${color};
    width: 5em;
    height: 5em;
    font-size: 1em;
    color: rgba(255, 255, 255, 0.7);
    @media screen and (max-width: 1100px) {
      width: 4em;
      height: 4em;
    }
    @media screen and (max-width: 800px) {
      font-size: 0.8em;
    }
  `;
  return (
    <EventCreateItemWrapper title={title}>
      <div css={wrapperStyle}>
        {statusArray.map((status, index) => {
          return (
            <>
              {index > 0 ? (
                <div key={'next' + index}>
                  <NavigateNextIcon></NavigateNextIcon>
                </div>
              ) : undefined}
              <div key={status.status + index}>
                <div css={statusStyle(status.color)}>
                  <p>{status.name}</p>
                  <p>{counts[index]}</p>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </EventCreateItemWrapper>
  );
};

export default EventViewStatus;
