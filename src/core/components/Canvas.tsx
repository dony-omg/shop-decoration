import { useDroppable } from '@dnd-kit/core';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from 'react';
import { renderers } from './Items';


function getRenderer(type: string) {
    if (type === "spacer") {
        return () => {
            return (<div style={{
                width: '100%',
                height: 50,
                backgroundColor: '#f5f5f5',
                color: '#f5f5f5'
            }} >spacer</div>);
        };
    }

    return renderers[type] || (() => <div>No renderer found for {type}</div>);
}

export function Field(props) {
    const { field, overlay, ...rest } = props;
    const { type } = field;

    const Component = getRenderer(type);


    if (overlay) {
        return (<div
            style={{
                width: '100%',
                height: 60,
                backgroundColor: '#f5f5f5',
                color: '#f5f5f5'
            }}
        >Overlay</div>)
    }

    return (
        <div style={{
            border: '1px dotted #ff4d4f',
            textAlign: 'left'
        }}>
            <Component
                {...props}
                field={field}
                onRemove={rest?.onRemove}
                onUpdateSetting={rest?.onUpdateSetting}
            />
        </div>
    );
}

interface SortableFieldProps {
    id: string;
    index: number;
    field: any;
    onRemove?: (id: string) => void;
    onUpdateSetting?: (id: string, setting: any) => void;
}

const SortableField = ({ id, index, field, ...props }: SortableFieldProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition
    } = useSortable({
        id,
        data: {
            index,
            id,
            field
        },
        // disabled: true
    });


    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };
    return (
        <div ref={setNodeRef} style={style} {...attributes}>
            <Field
                field={field}
                onRemove={props?.onRemove}
                listeners={listeners}
                setActivatorNodeRef={setActivatorNodeRef}
                onUpdateSetting={props?.onUpdateSetting}
            />
        </div>
    )
}

interface Props {
    items?: any[];
    onRemove?: (id: string) => void;
    onUpdateSetting?: (id: string, setting: any) => void;
}

/**
 * @name Canvas Component
 * @returns JSX.Element
 */
export default function Canvas({ items, id, ...props }: Props) {
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
        },
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
                        <SortableField
                            key={item.id}
                            id={item.id}
                            field={item}
                            index={i}
                            onRemove={props.onRemove}
                            onUpdateSetting={props.onUpdateSetting}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
