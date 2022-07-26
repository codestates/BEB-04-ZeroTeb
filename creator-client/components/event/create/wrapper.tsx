import { Box, css } from '@mui/material';
import { FunctionComponent, ReactNode } from 'react';

interface EventCreateWrapperProps {
  children: ReactNode;
}

const EventCreateWrapper: FunctionComponent<EventCreateWrapperProps> = ({ children }) => {
  const coverStyle = css`
    position: relative;
    height: calc(90vh - 100px);

    width: 100%;

    min-width: 400px;
    min-height: 800px;

    max-width: 800px;

    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 1em;
    padding: 2em;

    overflow-y: auto;
  `;

  const wrapperStyle = css`
    overflow-y: auto;
  `;

  return (
    <Box css={coverStyle}>
      <div css={wrapperStyle}>{children}</div>
    </Box>
  );
};

export default EventCreateWrapper;
