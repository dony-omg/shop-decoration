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
            extra={<CloseOutlined onClick={() => { onClose?.() }} />}
            style={{
                boxShadow: `rgba(0, 0, 0, 0.16) 0px 1px 4px`,
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