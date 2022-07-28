import { css } from '@emotion/react';
import { FunctionComponent } from 'react';

interface EventViewTitleProps {
  title: string;
  fontSize?: string;
}

const EventViewTitle: FunctionComponent<EventViewTitleProps> = ({ title, fontSize = '1.2em' }) => {
  const wrapperStyle = css`
    width: 100%;
    padding-bottom: 0.5em;
  `;
  const titleStyle = css`
    font-weight: 500;
    font-size: ${fontSize};

    padding: 0 1.3em;

    @media screen and (max-width: 820px) {
      text-align: center;
    }
  `;

  return (
    <div css={wrapperStyle}>
      <h1 css={titleStyle}>{title}</h1>
    </div>
  );
};

export default EventViewTitle;
