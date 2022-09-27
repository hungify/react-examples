import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    font-size: 24px;
    font-weight: 600;
    margin: 10px;
  }
`;

const WrapSwitch = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  width: 200px;
  span {
    font-weight: 500;
    margin-left: 10px;
  }
`;

export default function GoodCheapFast() {
  const [checkedList, setCheckedList] = useState([
    {
      label: 'Good',
      checked: false,
    },
    {
      label: 'Cheap',
      checked: false,
    },
    {
      label: 'Fast',
      checked: false,
    },
  ]);

  const handleChecked = ({
    label,
    checked,
  }: {
    label: string;
    checked: boolean;
  }) => {
    const newCheckedList = [...checkedList];
    const index = newCheckedList.findIndex((item) => item.label === label);
    newCheckedList[index]!.checked = checked;

    const checkedALl = newCheckedList.every((item) => item.checked);
    if (checkedALl) {
      if (label === 'Good') {
        newCheckedList[2]!.checked = false;
      } else if (label === 'Cheap') {
        newCheckedList[0]!.checked = false;
      } else if (label === 'Fast') {
        newCheckedList[1]!.checked = false;
      }
    }
    setCheckedList(newCheckedList);
  };

  return (
    <Wrapper>
      <h2>How do you want your project to be?</h2>
      {checkedList.map((item) => (
        <WrapSwitch key={item.label}>
          <Switch
            checked={item.checked}
            onChecked={handleChecked}
            label={item.label}
          />
          <span>{item.label}</span>
        </WrapSwitch>
      ))}
    </Wrapper>
  );
}

interface SwitchProps {
  checked: boolean;
  label: string;
  onChecked: ({ label, checked }: { label: string; checked: boolean }) => void;
}

function Switch({ checked, label, onChecked }: SwitchProps) {
  const handleSwitch = () => {
    onChecked({ label, checked: !checked });
  };
  return (
    <Switcher
      onClick={handleSwitch}
      style={{
        background: checked ? '#8e44ad' : '#d0d0d0',
      }}
    >
      <Circle active={checked} />
    </Switcher>
  );
}

interface CircleProps {
  active: boolean;
}

const Switcher = styled.div`
  position: relative;
  border-radius: 50px;
  cursor: pointer;
  display: inline-block;
  width: 80px;
  height: 40px;
`;

const slideOn = keyframes`
 0% {
    transform: translateX(0) scale(1);
  }
  50% {
    transform: translateX(20px) scale(1.2);
  }
  100% {
    transform: translateX(40px) scale(1);
  }
`;

const slideOff = keyframes`
   0% {
    transform: translateX(40px) scale(1);
  }
  50% {
    transform: translateX(20px) scale(1.2);
  }
  100% {
    transform: translateX(0) scale(1);
  }
`;
const Circle = styled.div<CircleProps>`
  background: #fff;
  height: 34px;
  width: 34px;
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: 3px;
  align-items: center;
  justify-content: center;
  animation: ${(props) => (props.active ? slideOn : slideOff)} 0.3s linear
    forwards;
`;
