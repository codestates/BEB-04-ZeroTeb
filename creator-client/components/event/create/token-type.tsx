import { RadioGroup, FormControlLabel, Radio, css } from '@mui/material';
import { ChangeEvent, FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { tokenActions } from '../../../store/event/tokenSlice';
import EventCreateItemWrapper from './item-wrapper';

interface EventCreateTokenTypeProps {}

const EventCreateTokenType: FunctionComponent<EventCreateTokenTypeProps> = () => {
  const dispatch = useDispatch();

  const radioOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    switch (value) {
      case 'nft':
      case 'sbt':
        dispatch(tokenActions.set_type(value));
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
    <EventCreateItemWrapper title={'티켓 거래 여부(이벤트 종료 후)'}>
      <RadioGroup
        css={radioGroup}
        aria-labelledby="event-category-group-label"
        defaultValue="nft"
        name="radio-buttons-group"
        onChange={radioOnChangeHandler}
      >
        <FormControlLabel
          css={radioStyle}
          value="nft"
          control={<Radio color="secondary" />}
          label="거래 가능"
        />
        <FormControlLabel
          css={radioStyle}
          value="sbt"
          control={<Radio color="secondary" />}
          label="거래 불가"
        />
      </RadioGroup>
    </EventCreateItemWrapper>
  );
};

export default EventCreateTokenType;
