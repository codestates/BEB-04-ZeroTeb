import { css } from '@emotion/react';
import { Select, MenuItem, SelectChangeEvent, FormControl, InputLabel } from '@mui/material';
import { ChangeEvent, ChangeEventHandler, FunctionComponent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createEventActions } from '../../../store/event/createSlice';
import { EventCategory } from '../../../types/event';
import EventCreateItemWrapper from './item-wrapper';

interface EventCreateCategoryProps {}

const EventCreateCategory: FunctionComponent<EventCreateCategoryProps> = () => {
  const [select, setSelect] = useState('');
  const categories: { title: string; category: EventCategory }[] = [
    { title: '공연', category: 'concert' },
    { title: '연극', category: 'theater' },
    { title: '유아/어린이', category: 'kid' },
    { title: '뮤지컬', category: 'musical' },
    { title: '전시회', category: 'exhibition' },
    { title: '레저스포츠', category: 'leisure sport' },
  ];
  const dispatch = useDispatch();
  const changeHandler = (e: SelectChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    switch (value) {
      case 'theater':
      case 'kid':
      case 'musical':
      case 'exhibition':
      case 'leisure sport':
      case 'concert':
        dispatch(createEventActions.set_category(value));
        setSelect(() => value);
        break;
      default:
    }
  };

  return (
    <EventCreateItemWrapper title="이벤트 종류">
      <FormControl fullWidth>
        <InputLabel id="event-catory-label">이벤트 종류 선택</InputLabel>
        <Select labelId="event-catory-label" value={select as ''} onChange={changeHandler}>
          {categories.map((category, index) => (
            <MenuItem key={index} value={category.category}>
              {category.title}
            </MenuItem>
          ))}
          {/* <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
      </FormControl>
    </EventCreateItemWrapper>
  );
};

export default EventCreateCategory;
