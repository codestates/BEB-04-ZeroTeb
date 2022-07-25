import { FunctionComponent, useEffect, useState, WheelEventHandler } from 'react';
import { HeaderLogo, HeaderMenu, HeaderWrapper } from '../../components/header';

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  const [isScroll, setIsScroll] = useState<boolean>(false);

  const scrollHandler = (e: Event) => {
    if (Math.floor(window.scrollY) === 0) {
      setIsScroll(() => false);
    } else {
      setIsScroll(() => true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <HeaderWrapper isScroll={isScroll}>
      <HeaderLogo isScroll={isScroll}></HeaderLogo>
      <HeaderMenu isScroll={isScroll}></HeaderMenu>
    </HeaderWrapper>
  );
};

export default Header;
