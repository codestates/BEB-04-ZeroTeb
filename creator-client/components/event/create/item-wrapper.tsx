import { css } from '@emotion/react';
import { FunctionComponent, ReactNode } from 'react';

interface EventCreateItemWrapperProps {
  children: ReactNode;
  title: string;
}

const EventCreateItemWrapper: FunctionComponent<EventCreateItemWrapperProps> = ({
  children,
  title,
}) => {
  const wrapperStyle = css`
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;

    padding: 1em;
    border: 1px solid rgba(100, 100, 100, 0.7);
    border-radius: 0.5em;
    margin: 1em 0.5em;
  `;
  const titleStyle = css`
    font-size: 1.2em;
  `;
  return (
    <fieldset css={wrapperStyle}>
      <legend css={titleStyle}>{title}</legend>
      {children}
    </fieldset>
  );
};

export default EventCreateItemWrapper;
