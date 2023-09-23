import React from 'react'
import { Popover, Space, Button } from 'antd';
import { DragOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons';

interface SettingProps {
    field?: any,
    configContent?: (props: { field?: any }) => React.ReactNode,
    onDrag?: () => void,
    onDelete?: () => void,
}
const SettingAction = ({ ...props }: SettingProps) => (
    <Space direction="vertical">
        {props?.onDrag && <Button onDrag={() => props?.onDrag?.()} icon={<DragOutlined />} size={"small"} />}
        <Popover placement="right" content={props?.configContent?.({ field: props.field })} title="Setting" trigger={"click"} arrow={false}>
            <Button icon={<SettingOutlined />} size={"small"} />
        </Popover>
        {props?.onDelete && <Button danger icon={<DeleteOutlined />} size={"small"} onClick={() => props?.onDelete?.()} />}
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
