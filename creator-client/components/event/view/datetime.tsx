import { FunctionComponent } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { css } from '@emotion/react';

dayjs.locale('ko');

interface EventViewDateTimeProps {
  start_date: Date;
  end_date: Date;
}

const EventViewDateTime: FunctionComponent<EventViewDateTimeProps> = ({ start_date, end_date }) => {
  const dayjsFormat = 'MM-DD(ddd) HH:mm';
  const startDate = dayjs(start_date).format(dayjsFormat);
  const endDate = dayjs(end_date).format(dayjsFormat);

  const wrapperDivStyle = css`
    display: flex;
  `;
  const dateWrapperPStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;

    text-align: center;
  `;
  const dateSpanStyle = css``;
  const waveSpanStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0.3em;
  `;
  return (
    <div css={wrapperDivStyle}>
      <p css={dateWrapperPStyle}>
        <span css={dateSpanStyle}>{startDate}</span>
      </p>
      <p css={waveSpanStyle}>~</p>
      <p css={dateWrapperPStyle}>
        <span css={dateSpanStyle}>{endDate}</span>
      </p>
    </div>
  );
};

export default EventViewDateTime;
