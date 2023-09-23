import React from 'react'
import { Tooltip } from 'antd'
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

export function Field(props) {
    const { field, overlay, ...rest } = props;
    const { type } = field;

    const Component = getRenderer(type);

    let className = "canvas-field";
    if (overlay) {
        className += " overlay";
    }

    return (
        <Tooltip title={field.title}>
            <div className={className} style={{
                border: '1px dotted #ff4d4f',
                textAlign: 'left'
            }}>
                {/** //TODO: remove this div */}
                <div>
                    title: <strong>{field.title}</strong> <br />
                    id:<strong>{field.id}</strong> <br />
                    type:<strong>{field.type}</strong>
                </div>
                <Component {...rest} />
            </div>
        </Tooltip>
    );
}

interface SortableFieldProps {
    id: string;
    index: number;
    field: any;
}

const SortableField = ({ id, index, field }: SortableFieldProps) => {
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


    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };
    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Field field={field} />
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
                        <Field key={item.id} id={item.id} field={item} index={i} />
                    ))}
                </div>
            </div>
        </div>
    )
}
