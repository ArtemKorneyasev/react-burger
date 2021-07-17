import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';

const MovableTopping = (props) => {
    const { children, toppingId, toppingIndex, findTopping, moveTopping } = props;

    const [, drag] = useDrag(() => ({
        type: 'sort-toppings',
        item: { id: toppingId, toppingIndex },
        end: (item, monitor) => {
            const { id: droppedId, toppingIndex } = item;
            const didDrop = monitor.didDrop();
            const { index: droppedIndex } = findTopping(droppedId);
            if (!didDrop) {
                moveTopping(toppingIndex, droppedIndex);
            }
        },
    }), [toppingId, toppingIndex, moveTopping]);

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
    }), []);

    return (
        <div ref={item => drag(drop(item))}>
            {children}
        </div>
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
