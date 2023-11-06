import React from 'react';
import { DragContext } from './DragProvider';
import type {
  PolymorphicComponentPropWithRef,
  PolymorphicRef,
} from '~/interfaces/react';
import DropZone from './DropZone';

type DropZonesProps<C extends React.ElementType> =
  PolymorphicComponentPropWithRef<
    C,
    {
      dropType: string;
      prevId: string;
      nextId: string;
      split?: 'x' | 'y';
      remember: boolean;
    }
  >;

const DropZones = React.forwardRef(
  <C extends React.ElementType = 'div'>(
    props: DropZonesProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const { isDragging, dragType } = React.useContext(DragContext);
    const {
      as,
      dropType,
      prevId,
      nextId,
      split = 'y',
      remember,
      children,
      ...restProps
    } = props;

    const Component = as || 'div';

    return (
      <Component style={{ position: 'relative' }} {...restProps} ref={ref}>
        {children}
        {dragType === dropType && isDragging && (
          <div
            style={{
              position: 'absolute',
              inset: '0px',
              display: 'flex',
              flexDirection: split === 'x' ? 'row' : 'column',
            }}
          >
            <DropZone
              dropId={prevId}
              style={{ width: '100%', height: '100%' }}
              dropType={dropType}
              remember={remember}
            />
            <DropZone
              dropId={nextId}
              style={{ width: '100%', height: '100%' }}
              dropType={dropType}
              remember={remember}
            />
          </div>
        )}
      </Component>
    );
  },
);

DropZones.displayName = 'DropZones';

export default DropZones;
