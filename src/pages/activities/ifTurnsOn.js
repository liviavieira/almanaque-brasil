import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Component
import Header from '../../components/header';
import Button from '../../components/buttons/button';
import ModalTip from '../../components/modal/tip';

//Images
import logo from '../../images/logo/ifTurnsOn.svg';

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  background-color: #f3f3f3;
  width: 100vw;
  height: 100vh;

  @media (min-width: 1024px) {
    justify-content: center;
  }
`

const Content = styled.div`
  padding: 2rem;
  width: 100vw;
  height: calc(100% - 83px);
  background: #fff;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;

  @media(min-width: 768px) {height: 70vh; padding-top: 6rem;}
`

const ContentInfo = styled.div`
  padding-bottom: 1rem;
  width: 100%;
  max-width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.backgroundColor};
`

const Text = styled.div`
  width: 7rem;
  min-height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: .875rem;
  color: #373737;
  font-weight: 900;
  border-radius: 8px;
  box-shadow: 0 3px 6px #00000029;
`

const Box = styled.div`
  display: flex;
  width: 100%;
  max-width: 300px;
  flex-direction: row;
  justify-content:  space-between;
`;

function IfTurnsOn({ useActivitie, handlerNextActivitie }) {
  const colors = {
    green: "#00FFEA", orange: "#F29F32", blue: "#8EBEFF", yellow: "#FFD932"
  }
  const [selectedItems, setSelectedItems] = useState([]);
  const [pairs, setPairs] = useState(undefined);
  const [activitie, setActivitie] = useState(undefined);
  const [isModalTip, setIsModalTip] = useState(undefined);

  useEffect(() => {
    const newArrayOfActivities = useActivitie?.pairs.map((pair) => {
      return {
      ...pair,
      backgroundColor: "#fff"
    }})

    setPairs(newArrayOfActivities)
  }, [useActivitie]);

  const handleModalTip = () => {
    setIsModalTip(!isModalTip)
  }

  const handleClick = (item) => {
    const itemIndex = isSelected(item)
    if(itemIndex < 0) {
      add(item)
    } else {
      remove(itemIndex, item)
    }

  }

  const isSelected = (item) => {
    console.log("isSelected")
    // verificar se o botão está ou não selecionado
    const validation = selectedItems.findIndex((x) => {
      return x.type === item.type & x.matchingPair === item.matchingPair;
    })

    return validation
  }

  const remove = (index, item) => {
    // remover o item selecionado do selectedItems
    const newArray = selectedItems
    newArray.splice(index, 1)
    setSelectedItems(newArray)

    setBackgroundColor(item, true)
  }

  const add = (item) => {
    if(canAdd(item.matchingPair, item.type)) {
      setBackgroundColor(item)
      setSelectedItems([
        ...selectedItems,
        {
          type: item.type,
          matchingPair: item.matchingPair
        }
      ])
    }
  } 

  const canAdd = (matchingPair, type) => {
    if(selectedItems.length === 0) {
      return true
    }

    let add = true
    const check = selectedItems.map(item => {
    // se existir um type e um matchingPair no array, não será possível adicionar o mesmo
    // item novamente.
      if(item.type == type & item.matchingPair == matchingPair) {
        return add = false
      }
    })
  
    if(add) {
      return true
    } else return false
  }

  const setBackgroundColor = (item, whiteColor=false) => {
    
    const itemInd = pairs.findIndex(x => {
      // console.log("x", x)
      return x.type === item.type & x.matchingPair === item.matchingPair;
    })

    const newArray = pairs
    // console.log("Pairs", newArray[itemInd].backgroundColor)
    if(!whiteColor) newArray[itemInd].backgroundColor = setColor();
    else newArray[itemInd].backgroundColor = "#fff"

    setPairs([...newArray])
  }

  const setColor = () => {
    if(selectedItems.length <= 1) return colors.green
    else if(selectedItems.length <= 3) return colors.orange
    else if(selectedItems.length <= 5) return colors.blue
    else if(selectedItems.length <= 7) return colors.yellow
  }

  return (
    console.log("New Render================="),
    console.log("selectedItems:", selectedItems),
    console.log("pairs", pairs),
    <Container>
      <Header
        logo={logo}
        tips
        isSelectedTips={isModalTip}
        handleModalTip={handleModalTip}
      />
      <Content>
        <Box>
          <div>
            {
              pairs?.map((item, i) => (
                item.type === "image" && (
                  <ContentInfo key={i}
                    backgroundColor={item.backgroundColor}
                    onClick={() => handleClick(item)}>
                    <img src={`data:image/jpeg;base64,${item.imageBase64}`} />
                  </ContentInfo>
                )
              ))
            }
          </div>
          <div>
            {
              pairs?.map((item, i) => (
                item.type === "text" && (
                  <ContentInfo key={i}
                    backgroundColor={item.backgroundColor}
                    onClick={() => handleClick(item)}>
                    <Text>{item.text}</Text>
                  </ContentInfo>
              )))
            }
          </div>
        </Box>
        <Button>conferir resposta</Button>
      </Content>
      {isModalTip && <ModalTip text={activitie?.tips} handleModalTip={handleModalTip} />}
    </Container>
  )
}

export default IfTurnsOn;