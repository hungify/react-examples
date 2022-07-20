import { useRef, useState } from 'react';
import {
  TiArrowBackOutline,
  TiArrowForwardOutline,
  TiMinus,
  TiPlus,
  TiTimes,
  TiArrowDownOutline,
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
  }
`;

const Button = styled.button`
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

interface Point {
  offsetX: number;
  offsetY: number;
}
type UndoStep = Record<number, Point[]>;
type RedoStep = Record<number, Point[]>;

export default function DrawingApp() {
  const [widthLine, setWidthLine] = useState(5);
  const [colorLine, setColorLine] = useState('#000000');
  const [isDrawing, setIsDrawing] = useState(false);
  const [storeDrawing, setStoreDrawing] = useState<ImageData[]>([]);
  const ctxRef = useRef<HTMLCanvasElement>(null);

  const [undoSteps, setUndoSteps] = useState<UndoStep>({});
  const [redoStep, setRedoStep] = useState<RedoStep>({});

  const [undo, setUndo] = useState(0);
  const [redo, setRedo] = useState(0);

  const handleWidthLineChange = (type: 'increase' | 'decrease') => () => {
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
    const { offsetX, offsetY } = e.nativeEvent;

    const ctx = ctxRef.current?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(offsetX, offsetY);
    }
    const temp: UndoStep = {
      ...undoSteps,
      [undo + 1]: [],
    };

    temp[undo + 1].push({ offsetX, offsetY });
    setUndoSteps(temp);
    setUndo(undo + 1);
  };
  const drawing = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const canvas = ctxRef.current;
    const ctx = ctxRef.current?.getContext('2d');

    if (isDrawing && ctx && canvas) {
      const { offsetX, offsetY } = e.nativeEvent;

      const temp: UndoStep = {
        ...undoSteps,
      };
      temp[undo].push({ offsetX, offsetY });
      setUndoSteps(temp);

      ctx.lineTo(offsetX, offsetY);

      ctx.lineWidth = widthLine;
      ctx.strokeStyle = colorLine;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.stroke();
    }
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
    if (redo > 0 && ctx) {
      const data: Point[] = redoStep[redo];
      ctx.strokeStyle = colorLine;
      ctx.beginPath();
      ctx.lineWidth = 5;
      ctx.moveTo(data[0].offsetX, data[0].offsetY);
      data.forEach((item, index) => {
        if (index !== 0) {
          ctx.lineTo(item.offsetX, item.offsetY);
          ctx.stroke();
        }
      });
      ctx.closePath();
      const temp: RedoStep = {
        ...redoStep,
        [redo]: [],
      };
      setUndo(undo + 1);
      setRedo(redo - 1);
      setRedoStep(temp);
      setUndoSteps({
        ...undoSteps,
        [undo + 1]: [...data],
      });
    }
  };

  const handleUndo = () => {
    const ctx = ctxRef.current?.getContext('2d');
    if (undo > 0 && ctx) {
      const data: Point[] = undoSteps[undo];
      ctx.strokeStyle = colorLine;
      ctx.beginPath();
      ctx.lineWidth = 5;
      ctx.moveTo(data[0].offsetX, data[0].offsetY);
      data.forEach((item, index) => {
        if (index !== 0) {
          ctx.lineTo(item.offsetX, item.offsetY);
          ctx.stroke();
        }
      });
      ctx.closePath();
      ctx.strokeStyle = 'black';
      const temp: UndoStep = {
        ...undoSteps,
        [undo]: [],
      };
      const te = {
        ...redoStep,
        [redo + 1]: [...data],
      };
      setUndo(undo - 1);
      setRedo(redo + 1);
      setRedoStep(te);
      setUndoSteps(temp);
    }
  };

  const handleSave = () => {
    const canvas = ctxRef.current;
    const ctx = ctxRef.current?.getContext('2d');
    if (canvas && ctx) {
      ctx.fillStyle = '#fff';
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'art.png';
      link.href = url;
      link.click();
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
      <Menu
        colorLine={colorLine}
        widthLine={widthLine}
        onChangeColorLine={handleColorLineChange}
        onChangeWidthLine={handleWidthLineChange}
        onClear={handleClear}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onSave={handleSave}
        undo={undo}
        redo={redo}
      />
    </Wrapper>
  );
}

interface MenuProps {
  widthLine: number;
  colorLine: string;
  undo: number;
  redo: number;
  onChangeWidthLine: (type: 'increase' | 'decrease') => () => void;
  onChangeColorLine: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  onRedo: () => void;
  onUndo: () => void;
  onSave: () => void;
}

function Menu({
  widthLine,
  colorLine,
  undo,
  redo,
  onChangeWidthLine,
  onChangeColorLine,
  onClear,
  onUndo,
  onRedo,
  onSave,
}: MenuProps) {
  return (
    <Toolbox>
      <Button onClick={onChangeWidthLine('decrease')} disabled={widthLine === 5}>
        <TiMinus />
      </Button>
      <div>{widthLine}</div>
      <Button onClick={onChangeWidthLine('increase')} disabled={widthLine === 30}>
        <TiPlus />
      </Button>
      <input type="color" value={colorLine} onChange={onChangeColorLine} />
      <Button onClick={onClear}>
        <TiTimes />
      </Button>

      {/* <Button onClick={onUndo} disabled={undo === 0}>
        <TiArrowForwardOutline />
      </Button>
      <Button onClick={onRedo} disabled={redo === 0}>
        <TiArrowBackOutline />
      </Button> */}

      <Button onClick={onSave}>
        <TiArrowDownOutline />
      </Button>
    </Toolbox>
  );
}
