import { css } from '@emotion/react';
import { FunctionComponent, ReactNode } from 'react';

interface EventViewWrapperProps {
  children: ReactNode;
}

const EventViewWrapper: FunctionComponent<EventViewWrapperProps> = ({ children }) => {
  const coverStyle = css`
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 5vh;
  `;
  const wrapperStyle = css`
    position: relative;
    width: calc(90vw);
    max-width: 1500px;
    height: calc(90vh - 100px);

    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 0.5em;

    overflow-y: auto;

    padding: 1em;

    @media screen and (max-width: 800px) {
      width: 100%;
    }
  `;
  return (
    <div css={coverStyle}>
      <div css={wrapperStyle}>{children}</div>
    </div>
  );
};

export default EventViewWrapper;
