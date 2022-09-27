import { useEffect, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div.attrs({
  className: 'wrapper',
})`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #3494e4;
`;
const Title = styled.h2`
  color: #fff;
`;
interface RemainedProps {
  liters: number;
}
const Remained = styled.div<RemainedProps>`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  ${({ liters }) => css`
    visibility: ${liters === 0 ? 'hidden' : 'visible'};
    height: ${liters === 0 ? '0px' : '0px'};
  `};
`;
interface PercentageProps {
  percentage: number;
}
const PercentageStyled = styled.div<PercentageProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 30px;
  height: 0;
  transition: 0.3s ease-in-out;
  width: 100%;
  ${({ percentage }) => css`
    height: calc(${percentage} * 330px);
    background-color: #6ab3f8;
    visibility: ${percentage === 0 ? 'hidden' : 'visible'};
  `};
`;
const Cup = styled.div`
  background-color: #fff;
  border: 4px solid #144fc6;
  color: #144fc6;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: 0.3s ease;
  cursor: pointer;
  font-weight: bold;
`;
const BigCup = styled(Cup)`
  border-radius: 0 0 40px 40px;
  height: 330px;
  width: 150px;
  margin: 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    margin: 0;
  }
`;
const Text = styled.p`
  text-align: center;
  margin: 0 0 5px;
  color: #fff;
`;
const ListSmallCup = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 280px;
`;
interface SmallCupProps {
  full: boolean;
}
const SmallCup = styled(Cup)<SmallCupProps>`
  height: 95px;
  width: 50px;
  border-radius: 0 0 15px 15px;
  margin: 5px;
  font-size: 14px;
  justify-content: center;
  span {
    text-align: center;
  }
`;
export default function DrinkWater() {
  const [waterGoal, setWaterGoal] = useState<number[]>([]);
  const [percentage, setPercentage] = useState<number>(0);
  const [totalCups] = useState<number>(8);

  useEffect(() => {
    if (waterGoal.length === 0) {
      setPercentage(0);
    } else {
      setPercentage(waterGoal.length / totalCups);
    }
  }, [waterGoal, totalCups]);

  const handleCupClick =
    (idx: number) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      if (waterGoal.indexOf(idx) === -1) {
        setWaterGoal([...waterGoal, idx]);
      } else {
        setWaterGoal(waterGoal.filter((item) => item !== idx));
      }
    };

  const liters = useMemo(() => {
    return 2 - (250 * waterGoal.length) / 1000;
  }, [waterGoal]);

  return (
    <Wrapper>
      <Title>Drink water</Title>
      <Text>Goal: 2 Liters</Text>
      <BigCup>
        <Remained liters={liters}>
          <strong>{liters}L</strong>
          <p>Remained</p>
        </Remained>
        <PercentageStyled percentage={percentage}>
          {waterGoal.length > 0 ? `${percentage * 100}%` : '0%'}
        </PercentageStyled>
      </BigCup>
      <Text>Select how many glasses of water that you have drank</Text>
      <ListSmallCup>
        {Array(totalCups)
          .fill(0)
          .map((_, i) => (
            <SmallCup
              onClick={handleCupClick(i)}
              key={i}
              full={waterGoal.indexOf(i) !== -1}
              style={{
                backgroundColor:
                  waterGoal.indexOf(i) !== -1 ? '#6ab3f8' : '#fff',
                color: waterGoal.indexOf(i) !== -1 ? '#fff' : '#144fc6',
              }}
            >
              <span>250 ml</span>
            </SmallCup>
          ))}
      </ListSmallCup>
    </Wrapper>
  );
}
