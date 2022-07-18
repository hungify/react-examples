import classnames from 'classnames/bind';
import styles from 'pages/ToastNotification/ToastNotification.module.css';
import { useEffect, useState } from 'react';
import { HiBadgeCheck } from 'react-icons/hi';
import { BiErrorCircle } from 'react-icons/bi';
import { IoMdInformationCircleOutline, IoMdWarning } from 'react-icons/io';
import { RiCloseFill } from 'react-icons/ri';
const cx = classnames.bind(styles);

const TOAST_MESSAGE = [
  {
    type: 'success',
    title: 'Success',
    description: 'This is a success toast component',
    backgroundColor: '#5cb85c',
    icon: <HiBadgeCheck />,
  },
  {
    type: 'info',
    title: 'Info',
    description: 'This is an info toast component',
    backgroundColor: '#5bc0de',
    icon: <IoMdInformationCircleOutline />,
  },
  {
    type: 'warning',
    title: 'Warning',
    description: 'This is a warning toast component',
    backgroundColor: '#f0ad4e',
    icon: <IoMdWarning />,
  },
  {
    type: 'danger',
    title: 'Danger',
    description: 'This is an error toast component',
    backgroundColor: '#d9534f',
    icon: <BiErrorCircle />,
  },
];

const BUTTON_PROPS = [
  {
    id: 1,
    type: 'success',
    className: 'success',
    label: 'Success',
  },
  {
    id: 2,
    type: 'danger',
    className: 'danger',
    label: 'Danger',
  },
  {
    id: 3,
    type: 'info',
    className: 'info',
    label: 'Info',
  },
  {
    id: 4,
    type: 'warning',
    className: 'warning',
    label: 'Warning',
  },
];

type Type = 'success' | 'danger' | 'warning' | 'info';
type Position = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

interface Toast {
  id: number;
  description: string;
  title: string;
  backgroundColor: string;
  icon: React.ReactElement;
}
export default function ToastNotification() {
  const [list, setList] = useState<Toast[]>([]);

  const handleShowToast = (type: Type) => {
    const toastProperties = TOAST_MESSAGE.find((toast) => toast.type === type);
    if (toastProperties) {
      const id = new Date().getTime();
      setList([
        ...list,
        {
          ...toastProperties,
          id,
        },
      ]);
    }
  };

  const handleDeleteToast = (id: number) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  };

  return (
    <div className={cx('wrapper')}>
      <ToastMessage
        position="top-right"
        toastList={list}
        onDeleteToast={handleDeleteToast}
        // autoClose={3000}
      />
      <div className={cx('toast-buttons')}>
        {BUTTON_PROPS.map((e) => (
          <Button
            key={e.id}
            className={e.className}
            label={e.label}
            onClick={() => handleShowToast(e.type as Type)}
          />
        ))}
      </div>
    </div>
  );
}

interface ToastMessageProps {
  toastList: Toast[];
  position: Position;
  onDeleteToast: (id: number) => void;
  autoClose?: number;
}
function ToastMessage({ toastList, onDeleteToast, position, autoClose = 3000 }: ToastMessageProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (toastList.length > 0) {
        onDeleteToast(toastList[0].id);
      }
    }, autoClose);
    return () => clearTimeout(timer);
  }, [autoClose, onDeleteToast, toastList]);

  return (
    <>
      <div
        className={cx('toast-container', {
          [`${position}`]: true,
        })}
      >
        {toastList.map((toast, i) => (
          <div
            key={i}
            style={{ backgroundColor: toast.backgroundColor }}
            className={cx('toast-inner', 'toast', {
              [`${position}`]: true,
            })}
          >
            <div className={cx('toast-header')}>
              {toast.icon}
              <p className={cx('toast-title')}>{toast.title}</p>
              <button onClick={() => onDeleteToast(toast.id)} className="toast-btn-close">
                <RiCloseFill />
              </button>
            </div>
            <p className={cx('toast-message')}>{toast.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

interface ButtonProps {
  label: string;
  className: string;
  onClick: () => void;
}

function Button({ className, onClick, label }: ButtonProps) {
  return (
    <button className={cx(className)} onClick={onClick}>
      {label}
    </button>
  );
}
