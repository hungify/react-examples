import styled from 'styled-components';
import ReactDOM from 'react-dom';
import { useState } from 'react';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  background-color: rebeccapurple;
`;
const Button = styled.button`
  background-color: #ffffff;
  color: rebeccapurple;
  font-family: inherit;
  font-weight: bold;
  padding: 1rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  &:focus {
    outline: none;
  }

  &:active {
    transform: scale(0.98);
  }
`;

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning';
}
export default function ToastNotification() {
  const [toast, setToast] = useState<Toast[]>([]);

  const handleShowToast = () => {
    setToast([
      ...toast,
      {
        id: new Date().getTime(),
        message: `This is a toast message ${new Date().getTime()}`,
        type: 'success',
      },
    ]);
    setTimeout(() => {
      toast.pop();
      setToast([...toast]);
    }, 2000);
  };

  return (
    <Wrapper>
      {toast.length > 0 && (
        <>
          <ToastMessage>
            {toast.map((t) => (
              <Message key={t.id}>
                <span>{t.message}</span>
              </Message>
            ))}
          </ToastMessage>
        </>
      )}
      <Button onClick={handleShowToast}>Show Notification</Button>
    </Wrapper>
  );
}

interface ToastMessageProps {
  children: React.ReactNode;
}
function ToastMessage({ children }: ToastMessageProps) {
  return ReactDOM.createPortal(
    <ToastContainer id="toast-container">{children}</ToastContainer>,
    document.body
  );
}

const ToastContainer = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Message = styled.div`
  background-color: #fff;
  border-radius: 5px;
  padding: 1rem 2rem;
  margin: 0.5rem;
`;
