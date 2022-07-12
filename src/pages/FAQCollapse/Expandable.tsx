import 'pages/FAQCollapse/Expandable.scss';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

interface IExpandable {
  expanded: boolean;
  toggle: (expanded?: boolean | React.MouseEvent) => void;
}

export const ExpandableContext = createContext<IExpandable | null>(null);
ExpandableContext.displayName = 'ExpandableContext';

export function useExpandable() {
  const context = useContext(ExpandableContext);
  if (context === null) {
    throw new Error('useExpandableContext must be used within a ExpandableContext');
  }
  return context;
}

interface ExpandableProps {
  children: React.ReactNode;
  className?: string;
  shouldExpand?: boolean;
  onExpand: (expanded?: boolean | React.MouseEvent) => void;
  [x: string]: any;
}
const Expandable = ({
  children,
  shouldExpand,
  className = '',
  onExpand,
  ...otherProps
}: ExpandableProps) => {
  const [expanded, setExpanded] = useState(false);
  const combinedClassNames = ['Expandable', className].filter(Boolean).join(' ');

  const isExpandControlled = shouldExpand !== undefined;

  useEffect(() => {
    if (!isExpandControlled) {
      onExpand(expanded);
    }
  }, [expanded, onExpand, isExpandControlled]);

  const toggle = useCallback(() => setExpanded((prevExpanded) => !prevExpanded), []);

  const getState = isExpandControlled ? shouldExpand : expanded;
  const getToggle = isExpandControlled ? onExpand : toggle;

  const value = useMemo(() => ({ expanded: getState, toggle: getToggle }), [getState, getToggle]);

  return (
    <ExpandableContext.Provider value={value}>
      <div className={combinedClassNames} {...otherProps}>
        {children}
      </div>
    </ExpandableContext.Provider>
  );
};

interface BodyProps {
  children: React.ReactNode;
  className?: string;
  expanded?: boolean;
  [x: string]: any;
}

function Body({ children, className = '', expanded, ...otherProps }: BodyProps) {
  const expandableContext = useExpandable();
  const isExpanded = expanded ? expanded : expandableContext?.expanded;
  const combinedClassNames = ['Expandable-panel', className].filter(Boolean).join(' ');
  return isExpanded ? (
    <div className={combinedClassNames} {...otherProps}>
      {children}
    </div>
  ) : null;
}

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
  toggle?: () => void;
  [x: string]: any;
}

function Header({ children, className = '', toggle, ...otherProps }: HeaderProps) {
  const combinedClassName = ['Expandable-header', className].filter(Boolean).join('');

  return (
    <div className={combinedClassName} aria-hidden="true" {...otherProps}>
      {children}
    </div>
  );
}

interface IconProps {
  className?: string;
  expanded?: boolean;
  [x: string]: any;
}
function Icon({ className = '', expanded, ...otherProps }: IconProps) {
  const expandableContext = useExpandable();

  const combinedClassNames = ['Expandable-btn', className].filter(Boolean).join(' ');

  return (
    <button className={combinedClassNames} {...otherProps} onClick={expandableContext.toggle}>
      {expanded ? (
        expanded
      ) : expandableContext?.expanded ? (
        <MdKeyboardArrowDown />
      ) : (
        <MdKeyboardArrowUp />
      )}
    </button>
  );
}

Expandable.Header = Header;
Expandable.Body = Body;
Expandable.Icon = Icon;
export default Expandable;
