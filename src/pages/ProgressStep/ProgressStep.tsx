import { steps } from 'mocks/steps';
import 'pages/ProgressStep/ProgressStep.css';
import { useMemo, useState } from 'react';

export default function ProgressStep() {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepsActive, setStepsActive] = useState<number[]>([currentStep]);

  const next = () => {
    setCurrentStep(currentStep + 1);
    setStepsActive([...stepsActive, currentStep + 1]);
  };

  const prev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
    setStepsActive(stepsActive.filter((step) => step !== currentStep));
  };

  const width = useMemo(() => {
    return ((stepsActive.length - 1) / (steps.length - 1)) * 100 + '%';
  }, [stepsActive]);

  return (
    <div className="wrapper">
      <div className="progress">
        <div className="progress__steps">
          <div className="progress__lines" style={{ width }}></div>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} active={stepsActive.includes(item.key)} />
          ))}
        </div>
        <div className="steps-action">
          <button className="btn" disabled={currentStep === 1} onClick={prev}>
            Prev
          </button>
          <button className="btn" disabled={currentStep === steps.length} onClick={next}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

interface StepProps {
  title: string;
  active: boolean;
}
function Step({ title, active }: StepProps) {
  return (
    <div className={`circle ${active && 'active'}`}>
      <span>{title}</span>
    </div>
  );
}
