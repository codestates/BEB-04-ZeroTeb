import { FunctionComponent, useState } from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

interface EventDateTimePickerPickerProps {
  title?: string;
  startDateActions: ActionCreatorWithPayload<number>;
  endDateActions: ActionCreatorWithPayload<number>;
}

const EventDateTimePicker: FunctionComponent<EventDateTimePickerPickerProps> = ({
  title = '',
  startDateActions,
  endDateActions,
}) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const dispatch = useDispatch();

  const timestamp10digits = (date: Date) => {
    return Number(date.getTime().toString().substring(0, 10));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label={`${title} 시작 시간`}
          value={startDate}
          onChange={(newDate) => {
            if (!newDate) return;
            setStartDate(newDate);
            const value = newDate < startDate ? startDate : newDate;
            setEndDate(value);
            const timestamp = timestamp10digits(value);
            dispatch(startDateActions(timestamp));
          }}
        />
        <span>~</span>
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
      </div>
    </LocalizationProvider>
  );
};

export default EventDateTimePicker;
