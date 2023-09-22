import React, { useId, useRef } from 'react'
import { useDraggable } from "@dnd-kit/core";
import { nanoid } from "nanoid";
import { CSS } from "@dnd-kit/utilities";
import { Divider, Typography } from 'antd'
import { fields } from './Items'

const { Title } = Typography;


export function SidebarField(props) {
    const { field, overlay } = props;
    const { title } = field;

    let className = "sidebar-field";
    if (overlay) {
        className += " overlay";
    }

    return (
        <div className={className} style={{
            padding: 10,
            marginBottom: 10,
            backgroundColor: '#f5f5f5',
            border: '1px dotted #1677ff',
            textAlign: 'center',
        }}>
            <div>
                title: <strong>{field.title}</strong> <br />
                id:<strong>{field.id}</strong> <br />
                type:<strong>{field.type}</strong>
            </div>

            {title}
        </div>
    );
}

interface DraggableSidebarFieldProps {
    label?: string,
    field?: any
}

/**
 * @name DraggableSidebarField Component
*/
const DraggableSidebarField = ({ label, field }: DraggableSidebarFieldProps) => {

    const id = useRef(nanoid())

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id.current,
        data: {
            field,
            fromSidebar: true
        }
    });


    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={{
                // padding: 10,
                // marginBottom: 10,
                // backgroundColor: '#f5f5f5',
                // border: '1px solid #e8e8e8',
                transform: CSS.Translate.toString(transform),
            }}
        >
            <SidebarField label={label} field={field} />
        </div>
    )
}

interface SidebarProps {
    fieldsRegKey?: number
}
/**
 * @name Sidebar Component
 * @returns JXS.Element
 */
export default function Sidebar({ fieldsRegKey }: SidebarProps) {

    const containerStyle: React.CSSProperties = {
        width: 350,
        backgroundColor: '#ffffff',
        position: 'absolute',
        padding: 10,
        top: 0,
        left: 0,
        bottom: 0
    }
    return (
        <div key={fieldsRegKey} id="element-list" style={containerStyle}>
            <Title level={4}>Template</Title>
            <Divider />
            {fields.map((item) => (
                <DraggableSidebarField
                    field={item}
                    key={item.type}
                    label={item.title}
                />
            ))}
        </div>
    )
}
