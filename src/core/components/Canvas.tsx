import { useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import { renderers } from "./Items";
import { CaretDownOutlined, CaretUpOutlined, ControlOutlined, DeleteOutlined } from "@ant-design/icons";

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
    onRemove?: (id: string) => void;
    onUpdateSetting?: (id: string, setting: any) => void;
    handleActiveElement?: (dis: number) => void;
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
        }
        // disabled: true
    });
    const [action, setAction] = React.useState(false);
    const ref = React.useRef<HTMLDivElement>(null);

    const handleClick = React.useCallback(() => {
        // console.log('click', ref.current);
        if (ref.current) {
            ref.current.scrollIntoView({
                behavior: "smooth",
            });

            // const distanceFromTop = getElementDistanceFromTop(ref.current);
            const distanceFromTop = ref.current.offsetTop
            props?.handleActiveElement?.(distanceFromTop)
        }
    }, []);

    const style = {
        position: 'relative',
        transform: CSS.Transform.toString(transform),
        transition
    };
    return (
        <div
            ref={ref}
            className="canvas-field-wrapper"
            onClick={() => handleClick()}
            style={{
                border: action ? '2px solid #2630ec' : '2px solid transparent',
            }}
            onMouseEnter={() => { setAction(true); }}
            onMouseLeave={() => { setAction(false); }}
        >
            <div className="element-label">
                {field?.type}
            </div>
            <div id={id} ref={setNodeRef} style={style} {...attributes}>
                <div className="overlay-element"></div>
                <Field
                    field={field}
                    onRemove={props?.onRemove}
                    listeners={listeners}
                    setActivatorNodeRef={setActivatorNodeRef}
                    onUpdateSetting={props?.onUpdateSetting}
                />
            </div>

            {action &&
                (<div className="element-action">
                    <ul>
                        <li><CaretUpOutlined /></li>
                        <li><CaretDownOutlined /></li>
                        <li><DeleteOutlined /></li>
                    </ul>
                </div>)}
        </div>
    );
};

interface Props {
    items?: any[] | undefined;
    onRemove?: (id: string) => void;
    onUpdateSetting?: (id: string, setting: any) => void;
    handleActiveElement?: (dis: number) => void;
}

/**
 * @name Canvas Component
 * @returns JSX.Element
 */
export default function Canvas({ items, id, ...props }: Props) {
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
                        onRemove={props.onRemove}
                        onUpdateSetting={props.onUpdateSetting}
                        handleActiveElement={props.handleActiveElement}
                    />
                ))}
            </div>
            <div style={{
                height: 'calc(100vh + -180px)',
            }}></div>
        </div>
    );
}
