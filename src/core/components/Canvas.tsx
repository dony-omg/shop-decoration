import React from 'react'
import { useDroppable } from '@dnd-kit/core';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { renderers } from './Items';


function getRenderer(type: string) {
    if (type === "spacer") {
        return () => {
            return <div className="spacer">spacer</div>;
        };
    }

    return renderers[type] || (() => <div>No renderer found for {type}</div>);
}

interface SortableFieldProps {
    id: string;
    index: number;
    field: any;
}

const SortableField = ({ id, index, field, ...props }: SortableFieldProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({
        id,
        data: {
            index,
            id,
            field
        }
    });

    const Component = getRenderer(field.type);

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };
    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Component {...props} />
        </div>
    )
}

interface Props {
    items?: any[];
}

/**
 * @name Canvas Component
 * @returns JSX.Element
 */
export default function Canvas({ items, id }: Props) {
    const {
        listeners,
        setNodeRef,
        transform,
        transition
    } = useDroppable({
        id: "canvas_droppable",
        data: {
            parent: null,
            isContainer: true
        }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    const containerStyle: React.CSSProperties = {
        width: '350px', // '350px
        minHeight: 500,
        textAlign: 'center',
        background: '#ffffff',
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        //TODO: remove this margin
        margin: '0 auto',
        height: '1000px',
    };
    return (
        <div id="mobile-container" style={containerStyle}>
            <div
                ref={setNodeRef}
                className="canvas"
                style={style}
                {...listeners}
            >
                <div
                    className="canvas-fields"
                    data-container={id}
                >
                    {items.map((item, i) => (
                        <SortableField key={item.id} id={item.id} field={item} index={i} />
                    ))}
                </div>
            </div>
        </div>
    )
}
