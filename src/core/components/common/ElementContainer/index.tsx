import React from 'react'
import { Popover, Space, Button } from 'antd';
import { DragOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons';

interface SettingProps {
    field?: any,
    configContent?: (props: { field?: any }) => React.ReactNode,
    onRemove?: (id: string) => void,
    listeners?: any,
    setActivatorNodeRef?: (node: HTMLElement) => void
}
const SettingAction = ({ listeners, setActivatorNodeRef, onRemove, ...props }: SettingProps) => (
    <Space direction="vertical">
        <Button {...listeners} node={setActivatorNodeRef} icon={<DragOutlined />} size={"small"} />
        <Popover placement="right" content={props?.configContent?.({ field: props.field })} title="Setting" trigger={"click"} arrow={false}>
            <Button icon={<SettingOutlined />} size={"small"} />
        </Popover>
        <Button danger icon={<DeleteOutlined />} size={"small"} onClick={() => { onRemove?.(props?.field?.id) }} />
    </Space>
);

interface ElementContainerProps {
    children: React.ReactNode
    popoverOption?: any,
    settingOption?: SettingProps
}

export default function ElementContainer({ children, popoverOption, settingOption }: ElementContainerProps) {
    return (
        <Popover
            placement="right"
            content={<SettingAction {...settingOption} />}
            trigger="hover"
            {...popoverOption}
        >
            {children}
        </Popover>
    )
}
