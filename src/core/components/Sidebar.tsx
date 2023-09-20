import React, { useId } from 'react'
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Divider, Typography } from 'antd'
import { fields } from './Items'

const { Title } = Typography;

interface DraggableSidebarFieldProps {
    label?: string,
    field?: any
}

/**
 * @name DraggableSidebarField Component
*/
const DraggableSidebarField = ({ label, field }: DraggableSidebarFieldProps) => {

    const id = useId()

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
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
                padding: 10,
                marginBottom: 10,
                backgroundColor: '#f5f5f5',
                border: '1px solid #e8e8e8',
                transform: CSS.Translate.toString(transform),
            }}
        >
            <div>{label}</div>
        </div>
    )
}

// interface SidebarProps {
// }
/**
 * @name Sidebar Component
 * @returns JXS.Element
 */
export default function Sidebar() {

    const containerStyle: React.CSSProperties = {
        width: 350,
        backgroundColor: '#ffffff',
        position: 'absolute',
        textAlign: 'center',
        padding: 10,
        top: 0,
        left: 0,
        bottom: 0
    }
    return (
        <div id="element-list" style={containerStyle}>
            <Title level={4}>Template</Title>
            <Divider />
            {fields.map((item) => (
                <DraggableSidebarField
                    field={item}
                    key={item.type}
                    // id={item.id}
                    label={item.title}
                // isActive={draggedItem?.id === item.id}
                />
            ))}
        </div>
    )
}
