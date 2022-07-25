import { Box, css } from '@mui/material';
import { FunctionComponent, ReactNode } from 'react';

interface EventCreateWrapperProps {
  children: ReactNode;
}

const EventCreateWrapper: FunctionComponent<EventCreateWrapperProps> = ({ children }) => {
  const wrapperStyle = css`
    position: relative;
    height: calc(90vh - 100px);
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 1em;
    padding: 2em;

    overflow: hidden;
  `;

  return (
    <Box css={wrapperStyle}>
      <div>{children}</div>
    </Box>
  );
};

export default EventCreateWrapper;
