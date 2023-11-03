import React from "react";
import {
    Avatar,
    Button,

    Space,

    Card
} from "antd";
import { CloseOutlined } from "@ant-design/icons";

interface SettingCardContainerProps {
    children: React.ReactNode;
    title?: string;
    subTitle?: string;
    onClose?: () => void;
    onSaving?: () => void;
}

const SettingCardContainer = ({ title, children, onClose, onSaving }: SettingCardContainerProps) => {

    return (
        <Card
            title={title}
            extra={<Button type="text" block onClick={() => { onClose?.() }}><CloseOutlined /></Button>}
            style={{
                boxShadow: `rgba(149, 157, 165, 0.2) 0px 8px 24px`,

            }}
        >
            {children}
            <div style={{
                padding: "5px 0",
                textAlign: "right"
            }}>
                <Button type="primary" onClick={() => { onSaving?.() }}>
                    Save
                </Button>
            </div>
        </Card>
    )
}

export default SettingCardContainer;