import React from 'react';
import styled from 'styled-components';
import { RootState } from 'store/domain';
import { useSelector } from 'react-redux';
import { routes } from 'routes';
import { getRouterHash } from 'store/common/selectors';

const Layout = styled.div`
  background-color: ${({ color }: OwnProps) => color};
  transition: background-color 0.2s ease-in;
  width: 100vw;
  height: 100vh;
  min-width: 325px;
  min-height: 480px;
`;

interface OwnProps {
  color?: string;
}

const mapStateToProps = (state: RootState) => ({
  hashRouteName: getRouterHash(state),
});

const MainLayout: React.FC = ({ children }) => {
  const { hashRouteName } = useSelector(mapStateToProps);
  const color = routes.find((route) => `#${route.path}` === hashRouteName);
  return <Layout color={color?.backgroundColor}>{children}</Layout>;
};

export default MainLayout;
