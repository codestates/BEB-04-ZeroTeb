import { FunctionComponent, useState } from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { css } from '@emotion/react';
import EventCreateItemWrapper from './item-wrapper';

interface EventDateTimePickerPickerProps {
  title?: string;
  startDateActions: ActionCreatorWithPayload<number>;
  endDateActions: ActionCreatorWithPayload<number>;
  refDate?: Date;
}

const EventDateTimePicker: FunctionComponent<EventDateTimePickerPickerProps> = ({
  title = '',
  startDateActions,
  endDateActions,
  refDate = new Date(),
}) => {
  const [startDate, setStartDate] = useState<Date>(refDate);
  const [endDate, setEndDate] = useState<Date>(refDate);
  const dispatch = useDispatch();

  const timestamp10digits = (date: Date) => {
    return Number(date.getTime().toString().substring(0, 10));
  };

  const waveStyle = css`
    padding: 1em;
  `;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <EventCreateItemWrapper title={title + ' 기간'}>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label={`${title} 시작 시간`}
          value={startDate}
          onChange={(newDate) => {
            if (!newDate) return;
            setStartDate(newDate);
            const value = refDate < newDate ? newDate : refDate;
            setEndDate(value);
            const timestamp = timestamp10digits(value);
            dispatch(startDateActions(timestamp));
          }}
        />
        <span css={waveStyle}>~</span>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label={`${title} 종료 시간`}
          value={endDate}
          onChange={(newDate) => {
            if (!newDate) return;
            const value = newDate < startDate ? startDate : newDate;
            setEndDate(value);
            const timestamp = timestamp10digits(value);
            dispatch(endDateActions(timestamp));
          }}
        />
      </EventCreateItemWrapper>
    </LocalizationProvider>
  );
};

export default EventDateTimePicker;
