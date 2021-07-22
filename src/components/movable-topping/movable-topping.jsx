import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';

const MovableTopping = (props) => {
    const { children, toppingId, toppingIndex, findTopping, moveTopping } = props;

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'sort-toppings',
        item: { id: toppingId, toppingIndex },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end: (item, monitor) => {
            const { id: droppedId, toppingIndex } = item;
            const didDrop = monitor.didDrop();
            if (!didDrop) {
                const { index: droppedIndex } = findTopping(droppedId);
                moveTopping(toppingIndex, droppedIndex);
            }
        },
    }), [toppingId, toppingIndex, findTopping, moveTopping]);

    const [, drop] = useDrop(() => ({
        accept: 'sort-toppings',
        canDrop: () => false,
        hover({ id: draggedId }) {
            if (draggedId !== toppingId) {
                const { index: overIndex } = findTopping(toppingId);
                const { index: draggedIndex } = findTopping(draggedId);
                moveTopping(draggedIndex, overIndex);
            }
        },
    }), [findTopping, moveTopping]);

    const opacity = isDragging ? 0 : 1;

    return (
        <li
            ref={item => drag(drop(item))}
            style={{ width: 568, marginRight: 18, opacity }}
        >
            {children}
        </li>
    );
};

MovableTopping.propsTypes = {
    children: PropTypes.node.isRequired,
    toppingId: PropTypes.number.isRequired,
    toppingIndex: PropTypes.number.isRequired,
    findTopping: PropTypes.func.isRequired,
    moveTopping: PropTypes.func.isRequired,
};

export default MovableTopping;
