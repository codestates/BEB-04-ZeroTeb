import { RadioGroup, FormControlLabel, Radio, css } from '@mui/material';
import { ChangeEvent, FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { createEventActions } from '../../../store/event/createSlice';
import EventCreateItemWrapper from './item-wrapper';

interface EventCreateTypeProps {}

const EventCreateType: FunctionComponent<EventCreateTypeProps> = () => {
  const dispatch = useDispatch();

  const radioOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    switch (value) {
      case 'entry':
      case 'sale':
        dispatch(createEventActions.set_type(value));
        dispatch(
          createEventActions.set_price([{ class: 0, price: value === 'sale' ? 1 : 0, count: 1 }])
        );
        break;
      default:
    }
  };

  const radioGroup = css`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  `;

  const radioStyle = css`
    margin: 0 1em;
  `;

  return (
    <EventCreateItemWrapper title={'이벤트 유형'}>
      <RadioGroup
        css={radioGroup}
        aria-labelledby="event-category-group-label"
        defaultValue="sale"
        name="radio-buttons-group"
        onChange={radioOnChangeHandler}
      >
        <FormControlLabel
          css={radioStyle}
          value="sale"
          control={<Radio color="secondary" />}
          label="판매형 이벤트"
        />
        <FormControlLabel
          css={radioStyle}
          value="entry"
          control={<Radio color="secondary" />}
          label="응모형 이벤트"
        />
      </RadioGroup>
    </EventCreateItemWrapper>
  );
};

export default EventCreateType;
