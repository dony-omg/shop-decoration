import React from 'react'
import { Popover, Space, Button } from 'antd';
import { DragOutlined, DeleteOutlined } from '@ant-design/icons';
import { IField } from '../../../types';

interface SettingProps {
    field?: IField,
    configContent?: (props: { field?: IField }) => React.ReactNode,
    onRemove?: (id: string) => void,
    listeners?: any,
    setActivatorNodeRef?: (node: HTMLElement) => void
}
const SettingAction = ({ listeners, setActivatorNodeRef, onRemove, ...props }: SettingProps) => (
    <Space direction="vertical">
        {
            /**
             * @description: If field is not disabled, show drag icon
             * @param {IField} field
             */
            !props?.field?.disabled && <Button
                {...listeners}
                node={setActivatorNodeRef}
                icon={<DragOutlined />}
                size={"small"}
            />
        }

        {props?.configContent?.({ field: props.field })}
        <Button
            danger
            icon={<DeleteOutlined />}
            size={"small"}
            onClick={() => { onRemove?.(props?.field?.id || "") }}

        />
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
