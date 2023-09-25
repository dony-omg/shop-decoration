import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Divider, Typography, Card, Row, Col } from 'antd';
import { nanoid } from "nanoid";
import React, { useRef } from 'react';
import { fields } from './Items';

const { Title } = Typography;


export function SidebarField(props) {
    const { field, overlay } = props;
    const { title } = field;

    if (overlay) {
        return (<Card title={title}>
            <img alt="example" src={field.imageUrl} style={{ width: '100%' }} />
        </Card>)
    }

    return (
        <Card title={title}
        >
            <img alt="example" src={field.imageUrl} style={{ width: '100%' }} />
        </Card>
    );
}

interface DraggableSidebarFieldProps {
    field?: any
}

/**
 * @name DraggableSidebarField Component
*/
const DraggableSidebarField = ({ field }: DraggableSidebarFieldProps) => {

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
            <SidebarField field={field} />
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
        overflow: 'scroll',
        padding: 10,
    }
    return (
        <div key={fieldsRegKey} id="element-list" style={containerStyle}>
            <Title level={4}>Template</Title>
            <Divider />
            <Row gutter={[16, 16]}>
                {fields.map((item) => (
                    <Col span={12}>
                        <DraggableSidebarField
                            field={item}
                            key={item.type}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    )
}
