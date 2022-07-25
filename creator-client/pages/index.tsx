import type { NextPage } from 'next';
import Wrapper from '../components/wrapper';
import Header from '../layouts/header';
import dynamic from 'next/dynamic';
import Progress from '../components/Progress';
const Animator = dynamic(
  import('react-scroll-motion').then((it) => it.Animator as ComponentType<never>),
  { ssr: false, loading: () => <Progress></Progress> }
);

import {
  ScrollContainer,
  ScrollPage,
  batch,
  Fade,
  FadeIn,
  FadeOut,
  Move,
  MoveIn,
  MoveOut,
  Sticky,
  StickyIn,
  StickyOut,
  Zoom,
  ZoomIn,
  ZoomOut,
} from 'react-scroll-motion';
import { ComponentType } from 'react';

const Home: NextPage = () => {
  return (
    <Wrapper>
      <h1>Creator Client</h1>
      <Header></Header>
    </Wrapper>
  );
};

export default Home;
