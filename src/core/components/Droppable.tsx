import React from 'react'
import { useDroppable } from '@dnd-kit/core';


/**
 * @see https://dnd-kit.alexandrtovmach.com/api/useDroppable
 * @description When a draggable element is moved over your droppable element, the isOver property will become true.
 */
export default function Droppable(props: any) {
    const { isOver, setNodeRef } = useDroppable({
        id: 'droppable',
    });
    const style = {
        color: isOver ? 'green' : undefined,
    };
    return (
        <div ref={setNodeRef} style={style}>
            {props.children}
        </div>
    )
}
