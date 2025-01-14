import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

//Component
import Header from '../../components/header/headerYellow';
import Footer from '../../components/footer/footerMenu';

//Image
import home from '../../images/icons/menu/selectedHome.svg';

//Redux
import { signOut } from '../../dataflow/modules/signIn-modules';
import { selectedTrails } from '../../dataflow/modules/trails-module';
import { clearActionsBook } from '../../dataflow/modules/actionsBook-modules';

const mapStateToProps = state => ({
  trails: state.trails.data,
  user: state.login.user,
});

const mapDispatchToProps = dispatch => ({
  selectedTrails: (info) => {
    dispatch(selectedTrails(info));
  },

  signOut: () => {
    dispatch(signOut());
  },

  clearActionsBook: () => {
    dispatch(clearActionsBook());
  },
});

const Container = styled.div`
  padding-bottom: 1rem;
  min-height: 100vh;
  background: #F3F3F3;
  position: relative;
`;

const Content = styled.div`
  padding: 2.125rem 1rem 0;
`;

const Text = styled.h1`
  padding-bottom: ${props => props.paddingBottom && '.5rem'};
  font-size: ${props => props.name ? '1.5rem' : '1.25rem'};
  font-weight: 900;
  color: #373737;
  text-decoration: none;
`;

const Card = styled.button`
  margin-bottom: 2rem;
  width: 100%;
  height: 10rem;
  max-width: 330px;
  border-radius: 16px;
  padding: 16px;
  background-color: #fff;

  &:hover{
    box-shadow: 0 6px 10px rgba(0,0,0,0.25), 0 1px 10px rgba(0,0,0,0.22);
  }

  @media (max-width: 320px) {
    height: 8rem;
  }
  @media (min-width: 1024px) {
    margin-right: ${props => props.marginRight && '2rem'};
  }
`;

const Dashboard = (props) => {

  const handleClick = (route) => {
    props.history.push({ pathname: `/${route}` });
  }

  const trails = props?.trails;

  return (
    <Container>
      <Header text={`Oi, ${props.user.name}`} icon={home} home/>
       <Content>
        <Text paddingBottom>Qual atividade você quer fazer?</Text>
        {trails && (
          <>
            <Card marginRight onClick={() => handleClick('trails')}>
              <Text>Trilha</Text>
            </Card>
            <Card onClick={() => handleClick('trunk')}>
              <Text>Baú</Text>
            </Card>
          </>
        )}
      </Content>
      <Footer  screen='dashboard'/>
    </Container>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
