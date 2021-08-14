import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';

const MovableTopping = (props) => {
    const { children, toppingId, toppingIndex, moveTopping } = props;
    const ref = useRef(null);

    const [{ isDragging }, drag] = useDrag({ 
        type: 'sort-toppings',
        item: { id: toppingId, index: toppingIndex },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: 'sort-toppings',
        hover: (item, monitor) => {
            if (!ref.current) {
                return;
            }

            const dragIndex = item.index;
            const hoverIndex = toppingIndex;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 1.5;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveTopping(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    return (
        <div
            ref={ref}
            style={{ width: 568, marginRight: 18, opacity }}
        >
            {children}
        </div>
    );
};

MovableTopping.propsTypes = {
    children: PropTypes.node.isRequired,
    toppingId: PropTypes.number.isRequired,
    toppingIndex: PropTypes.number.isRequired,
    moveTopping: PropTypes.func,
};

export default MovableTopping;
