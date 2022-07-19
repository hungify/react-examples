import { useRef, useState } from 'react';
import {
  TiArrowBackOutline,
  TiArrowForwardOutline,
  TiMinus,
  TiPlus,
  TiTimes,
} from 'react-icons/ti';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const Canvas = styled.canvas`
  border: 2px solid steelblue;
`;
const Toolbox = styled.div`
  background-color: steelblue;
  border: 1px solid slateblue;
  display: flex;
  width: 804px;
  * {
    background-color: #fff;
    border: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    height: 50px;
    width: 50px;
    margin: 0.25rem;
    padding: 0.25rem;
    cursor: pointer;
  }
`;

const Button = styled.button`
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;

export default function DrawingApp() {
  const [widthLine, setWidthLine] = useState(5);
  const [colorLine, setColorLine] = useState('#000');
  const [isDrawing, setIsDrawing] = useState(false);
  const [storeDrawing, setStoreDrawing] = useState<ImageData[]>([]);
  const ctxRef = useRef<HTMLCanvasElement>(null);

  const handleChangeWithLine = (type: string) => () => {
    if (type === 'increase') {
      setWidthLine(widthLine + 5);
    } else if (type === 'decrease') {
      setWidthLine((prev) => {
        if (prev === 5) {
          return widthLine;
        } else {
          return prev - 5;
        }
      });
    }
  };
  const handleColorLineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColorLine(e.target.value);
  };

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    setIsDrawing(true);
    const canvas = ctxRef.current;
    const ctx = ctxRef.current?.getContext('2d');
    if (ctx && canvas) {
      // const clientX = e.clientX;
      // const clientY = e.clientY;

      // const buttonTop = e.currentTarget.getBoundingClientRect().top;
      // const buttonLeft = e.currentTarget.getBoundingClientRect().left;

      // const xPos = clientX - buttonLeft;
      // const yPos = clientY - buttonTop;

      const x = e.nativeEvent.offsetX;
      const y = e.nativeEvent.offsetY;

      ctx.beginPath();
      ctx.moveTo(x, y);
      // ctx.moveTo(xPos, yPos);
      e.preventDefault();
    }
  };
  const drawing = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const canvas = ctxRef.current;
    const ctx = ctxRef.current?.getContext('2d');

    if (isDrawing && ctx && canvas) {
      const x = e.nativeEvent.offsetX;
      const y = e.nativeEvent.offsetY;
      ctx.lineTo(x, y);

      ctx.lineWidth = widthLine;
      ctx.strokeStyle = colorLine;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.stroke();
    }

    e.preventDefault();
  };
  const stopDraw = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const ctx = ctxRef.current?.getContext('2d');
    const canvas = ctxRef.current;

    if (isDrawing && ctx) {
      ctx.stroke();
      ctx.closePath();
      setIsDrawing(false);
    }
    e.preventDefault();
    if (canvas && e.type !== 'mouseOut') {
      const imgLastToStore = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      if (imgLastToStore) {
        setStoreDrawing([...storeDrawing, imgLastToStore]);
      }
    }
  };

  const handleClear = () => {
    const ctx = ctxRef.current?.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      setStoreDrawing([]);
    }
  };

  const handleRedo = () => {
    const ctx = ctxRef.current?.getContext('2d');
    if (ctx) {
      const imgLastToStore = ctx?.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
      if (imgLastToStore) {
        setStoreDrawing([...storeDrawing.slice(0, -1)]);
      }
    }
  };

  const handleUndo = () => {
    const ctx = ctxRef.current?.getContext('2d');
    const canvas = ctxRef.current;
    if (ctx && canvas) {
      const imgLastToStore = storeDrawing[storeDrawing.length - 1];
      if (imgLastToStore) {
        ctx.putImageData(imgLastToStore, 0, 0);
        setStoreDrawing(storeDrawing.slice(0, storeDrawing.length - 1));
      }
    }
  };

  return (
    <Wrapper>
      <Canvas
        ref={ctxRef}
        height={700}
        width={800}
        onMouseDown={startDraw}
        onMouseMove={drawing}
        onMouseUp={stopDraw}
      />
      <Toolbox>
        <Button onClick={handleChangeWithLine('decrease')} disabled={widthLine === 5}>
          <TiMinus />
        </Button>
        <div>{widthLine}</div>
        <Button onClick={handleChangeWithLine('increase')} disabled={widthLine === 30}>
          <TiPlus />
        </Button>
        <input type="color" value={colorLine} onChange={handleColorLineChange} />
        <Button onClick={handleClear}>
          <TiTimes />
        </Button>
        <Button onClick={handleRedo}>
          <TiArrowForwardOutline />
        </Button>
        <Button onClick={handleUndo} disabled={widthLine === 5}>
          <TiArrowBackOutline />
        </Button>
      </Toolbox>
    </Wrapper>
  );
}
