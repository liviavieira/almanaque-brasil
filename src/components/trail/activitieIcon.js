import React from 'react';
import styled from 'styled-components';

//Image
import iconVisualized from '../../images/activity/iconVisualized.svg';
import iconBloqued from '../../images/activity/iconBloqued.svg';
import iconBookBloqued from '../../images/activity/iconBookBloqued.svg';
import iconBookVisualized from '../../images/activity/iconBookVisualized.svg';
import checkIcon from '../../images/activity/check.svg';

//Styles
const ActivitiesCircle = styled.button`
  position: relative;
  margin: 1.5rem 3rem .5rem 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 30;
`;

const Box = styled.div`
  text-align: center;
  height: 117px;
  margin-bottom: 3rem;
  z-index: 3;
`;
  
const Text = styled.p`
  color: ${props => props.color};
  position: absolute;
  font-size: 1.5rem;
  font-weight: 800;
`;

const Check = styled.img`
  position: absolute;
  top: 43px;
  right: -5px;
`;

const BoxName = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  p{ width: 6.25rem; }
`;

const ActivitieIcon = ({item, children, activitieState, onClick, history }) => {
  const setColor = () => {
    return activitieState === 'bloqued' ? '#a0a0a0' : '#2a2929'
  }

  const handleClick = () => {
    return activitieState === 'bloqued' ? undefined : onClick
  }

  //Alterar quando tiver a imagem
  const renderImageBloqued = () => {
    return item.name === 'Eureka' || item.name === 'Origem da expressão' ? iconBookBloqued : iconBloqued;
  }

  const renderImageVisualized = () => {
    return item.name === 'Eureka' || item.name === 'Origem da expressão' ? iconVisualized : iconVisualized;
  }

  return (
    <Box>
      <ActivitiesCircle type={item.type} onClick={handleClick()} history={history}>
        { activitieState === 'bloqued' ? <img src={renderImageBloqued()} alt={item.name} /> : <img src={renderImageVisualized()} alt={item.name}/> }
        <Text color={() => setColor()}>{children + 1}</Text>
        {activitieState === 'done' && <Check src={checkIcon}/>}
      </ActivitiesCircle>
      <BoxName><p>{item.name}</p></BoxName>
    </Box>
  )
}

export default ActivitieIcon;
