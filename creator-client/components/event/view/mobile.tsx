import { FunctionComponent, ReactNode } from 'react';

interface EventMobileViewProps {
  children?: ReactNode;
}

const EventMobileView: FunctionComponent<EventMobileViewProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default EventMobileView;
