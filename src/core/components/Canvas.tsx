import { useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useEffect } from "react";
import { renderers } from "./Items";
import { CaretDownOutlined, CaretUpOutlined, ControlOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";

function getRenderer(type: string) {
    if (type === "spacer") {
        return () => {
            return (
                <div
                    style={{
                        width: "100%",
                        height: 50,
                        backgroundColor: "#f5f5f5",
                        color: "#f5f5f5"
                    }}
                >
                    spacer
                </div>
            );
        };
    }

    return renderers[type] || (() => <div>No renderer found for {type}</div>);
}

export function Field(props) {
    const { field, overlay, ...rest } = props;
    const { type } = field;

    const Component = getRenderer(type);

    if (overlay) {
        return (
            <div
                style={{
                    width: "100%",
                    height: 60,
                    backgroundColor: "#f5f5f5",
                    color: "#f5f5f5"
                }}
            >
                Overlay
            </div>
        );
    }

    return (
        <div>
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
    activeElement?: any;
    onRemove?: (id: string) => void;
    onUpdateSetting?: (id: string, setting: any) => void;
    handleActiveElement?: (dis: number, element: any) => void;
    handleMoveElement?: (index: number, step: string) => void;
}

const SortableField = ({ id, index, field, activeElement, ...props }: SortableFieldProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
    } = useSortable({
        id,
        data: {
            index,
            id,
            field
        }
        // disabled: true
    });
    const [action, setAction] = React.useState(false);
    const ref = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref && activeElement?.id === id) {
            const distanceFromTop = ref?.current?.offsetTop || 0;
            props?.handleActiveElement?.(distanceFromTop, field)
        }
    }, [index]);

    const handleClick = React.useCallback(() => {
        setAction(true);
        if (ref.current) {
            ref.current.scrollIntoView({
                behavior: "smooth",
            });

            // const distanceFromTop = getElementDistanceFromTop(ref.current);
            const distanceFromTop = ref.current.offsetTop;

            props?.handleActiveElement?.(distanceFromTop, field)
        }
    }, []);

    const handelMoveElement = (step: number) => {
        props?.handleMoveElement?.(index, step);
    }

    const style = {
        position: 'relative',
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <div
            ref={ref}
            id={`canvas-field-${id}`}
            className={`canvas-field-wrapper  ${activeElement?.id === id ? 'active' : ''}`}
            data-id={id}
            onMouseEnter={() => { setAction(true); }}
            onMouseLeave={() => { setAction(false); }}
        >
            <div className="element-label">
                {field?.type}
            </div>
            <div id={id} ref={setNodeRef} style={style} {...attributes}>
                <div className="overlay-element"
                    onClick={() => handleClick()}
                ></div>
                <Field
                    field={field}
                    onRemove={props?.onRemove}
                    listeners={listeners}
                    setActivatorNodeRef={setActivatorNodeRef}
                    onUpdateSetting={props?.onUpdateSetting}
                />
            </div>

            {(action || activeElement?.id === id) &&
                (<div className="element-action">
                    <ul>
                        <li><Button type="text" size="small" disabled={index === 0 || index === 1} onClick={() => { handelMoveElement(-1) }}><CaretUpOutlined /></Button></li>
                        <li><Button type="text" size="small" disabled={index === 0} onClick={() => { handelMoveElement(1) }}><CaretDownOutlined /></Button></li>
                        <li><Button type="text" size="small" disabled={index === 0} onClick={() => {
                            props?.onRemove?.(id);
                            props?.handleActiveElement?.(0, null)

                        }}
                        ><DeleteOutlined /></Button></li>
                    </ul>
                </div>)}
        </div>
    );
};

interface Props {
    items?: any[] | undefined;
    activeElement?: any;
    onRemove?: (id: string) => void;
    onUpdateSetting?: (id: string, setting: any) => void;
    handleActiveElement?: (dis: number, element: any) => void;
    handleMoveElement?: (step: number, id: string) => void;
}

/**
 * @name Canvas Component
 * @returns JSX.Element
 */
export default function Canvas({ items, id, activeElement, ...props }: Props) {
    const { listeners, setNodeRef, transform, transition, attributes } =
        useDroppable({
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

    //TODO: no issue with this
    // Pls check sidebar
    return (
        <div
            ref={setNodeRef}
            className="canvas canvas-wrapper"
            style={{
                width: "350px",
                // margin: "0 auto",
                background: "#ffffff",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                ...style
            }}
            {...listeners}
            {...attributes}
        >
            <div className="canvas-fields">
                {items.map((item, i) => (
                    <SortableField
                        key={item.id}
                        id={item.id}
                        field={item}
                        index={i}
                        activeElement={activeElement}
                        onRemove={props.onRemove}
                        onUpdateSetting={props.onUpdateSetting}
                        handleActiveElement={props.handleActiveElement}
                        handleMoveElement={props.handleMoveElement}
                    />
                ))}
            </div>
            <div style={{
                height: 'calc(100vh + -180px)',
            }}></div>
        </div>
    );
}
