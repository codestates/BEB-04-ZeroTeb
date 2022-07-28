import { css } from '@emotion/react';
import { FunctionComponent, ReactNode } from 'react';

interface EventViewDescriptionProps {
  title: string;
  children: ReactNode;
}

const EventViewDescription: FunctionComponent<EventViewDescriptionProps> = ({
  title,
  children,
}) => {
  const wrapperStyle = css`
    display: flex;
    border-bottom: 1px solid rgba(210, 210, 210, 0.7);
    width: 100%;

    padding: 0.5em 0;
  `;
  const titleStyle = css`
    min-width: 3.5em;
    text-align: center;
  `;
  const colonStyle = css`
    padding: 0 0.3em;
  `;
  const textStyle = css``;
  return (
    <div css={wrapperStyle}>
      <div css={titleStyle}>{title}</div>
      <span css={colonStyle}>:</span>
      <div css={textStyle}>{children}</div>
    </div>
  );
};

export default EventViewDescription;
