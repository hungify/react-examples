import React, { useContext } from 'react';
import type {
  PolymorphicComponentPropWithRef,
  PolymorphicRef,
} from '~/interfaces/react';
import { DragContext } from './DragProvider';
import type { DragType } from './shared';

type DragItemProps<C extends React.ElementType> =
  PolymorphicComponentPropWithRef<
    C,
    {
      dragId: string;
      dragType: DragType;
    }
  >;

const DragItem = React.forwardRef(
  <C extends React.ElementType = 'div'>(
    props: DragItemProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const { draggable, dragStart, drag, dragEnd } = useContext(DragContext);

    const { as, dragId, dragType, ...restProps } = props;

    const Component = as || 'div';

    return (
      <Component
        onDragStart={(e) => dragStart(e, dragId, dragType)}
        draggable={draggable}
        onDragEnd={dragEnd}
        onDrag={drag}
        ref={ref}
        {...restProps}
      />
    );
  },
);

DragItem.displayName = 'DragItem';

export default DragItem;
