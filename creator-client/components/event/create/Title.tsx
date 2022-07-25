import { css } from '@emotion/react';
import { ChangeEventHandler, FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { createEventActions } from '../../../store/event/create';

interface EventCreateTitleProps {}

const EventCreateTitle: FunctionComponent<EventCreateTitleProps> = () => {
  const dispatch = useDispatch();

  const titleHandler: ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(createEventActions.set_title(event.target.value));
  };

  const wrapperStyle = css`
    font-size: 20px;
  `;
  const labelStyle = css``;
  const inputStyle = css`
    font-size: 2em;
    border: none;
    width: 100%;
    padding: 0.3em;
    background: none;
    &::placeholder {
      color: #e2e2e2;
    }
  `;

  return (
    <div css={wrapperStyle}>
      {/* <label css={labelStyle}>Title</label> */}
      <input
        css={inputStyle}
        type="text"
        name="title"
        onChange={titleHandler}
        placeholder="제목.."
      ></input>
    </div>
  );
};

export default EventCreateTitle;
