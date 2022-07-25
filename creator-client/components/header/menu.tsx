import { useRouter } from 'next/router';
import { FunctionComponent, MouseEvent, MouseEventHandler, ReactNode } from 'react';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AirplayOutlinedIcon from '@mui/icons-material/AirplayOutlined';
import { css } from '@emotion/react';

interface HeaderMenuProps {
  isScroll: boolean;
}

const HeaderMenu: FunctionComponent<HeaderMenuProps> = ({ isScroll }) => {
  const iconColor = isScroll ? `gray` : 'white';
  console.log(iconColor);

  const router = useRouter();
  const menuItems: {
    name: string;
    icon: ReactNode;
    path: string;
  }[] = [
    {
      name: 'home',
      icon: <HomeOutlinedIcon sx={{ fontSize: '60px' }}></HomeOutlinedIcon>,
      path: '/',
    },
    {
      name: 'createEvent',
      icon: <AddToPhotosOutlinedIcon sx={{ fontSize: '50px' }}></AddToPhotosOutlinedIcon>,
      path: '/event/create',
    },
    {
      name: 'veiwEvents',
      icon: <AirplayOutlinedIcon sx={{ fontSize: '50px' }}></AirplayOutlinedIcon>,
      path: '/event/view',
    },
  ];
  const onClickHandler = (e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>, path: string) => {
    router.push(path);
  };

  const listStyle = css`
    grid-row: 1/2;
    grid-column: 4/6;

    display: flex;
    justify-content: flex-end;
    align-items: center;

    list-style: none;
  `;
  const itemStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 25px;
    > svg {
      color: ${iconColor};
      opacity: 0.7;
      :hover {
        color: ${iconColor};
        cursor: pointer;
        opacity: 1;
      }
    }
  `;
  return (
    <ul css={listStyle}>
      {menuItems.map((item) => (
        <li key={item.name} onClick={(e) => onClickHandler(e, item.path)} css={itemStyle}>
          {item.icon}
        </li>
      ))}
    </ul>
  );
};

export default HeaderMenu;
