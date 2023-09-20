import React from 'react'
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
    key?: string;
    id: string;
    isActive?: boolean;
    label?: string;
}

/**
 * @name ItemElement Component
 * @returns JXS.Element
 */
export default function ItemElement({ id, isActive, label }: Props) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: id });

    return (
        <div
            ref={setNodeRef}
            className={"item" + (isActive ? " active" : "")}
            style={{
                padding: 10,
                marginBottom: 10,
                backgroundColor: '#f5f5f5',
                border: '1px solid #e8e8e8',
                transform: CSS.Translate.toString(transform),
                transition
            }}
            {...attributes}
            {...listeners}
        >
            {label}
        </div>
    )
}
