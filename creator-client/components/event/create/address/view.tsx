import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { css } from '@emotion/react';

interface EventCreateAddressViewProps {
  setIsVisibleJuso: Dispatch<SetStateAction<boolean>>;
}

const EventCreateAddressView: FunctionComponent<EventCreateAddressViewProps> = ({
  setIsVisibleJuso,
}) => {
  const createEventState = useSelector((state: RootState) => state.createEvent);

  const wapperStyle = css`
    width: 100%;
  `;

  const textWrapperStyle = css`
    position: relative;
    display: flex;
    width: 100%;
  `;
  const textStyle = css`
    width: 100%;
  `;
  const iconStyle = css`
    font-size: 1.5em;
  `;
  return (
    <div css={wapperStyle}>
      <div
        css={textWrapperStyle}
        onClick={() => {
          setIsVisibleJuso(() => true);
        }}
      >
        <p css={textStyle}>
          {createEventState.location === '' && createEventState.sub_location == '' ? (
            <span style={{ opacity: '0.5' }}>이벤트 장소를 입력해주세요.</span>
          ) : (
            createEventState.location + ' ' + createEventState.sub_location
          )}
        </p>
        <SearchIcon css={iconStyle}></SearchIcon>
      </div>
    </div>
  );
};

export default EventCreateAddressView;
