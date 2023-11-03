import { ArrowLeftOutlined, CloseOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";
import {
    Avatar,
    Button,
    Form,
    Input,
    Space,
    Tabs,
    TabsProps,
    Typography
} from "antd";
import React from "react";
import { IField, IShopHeaderElementSetting } from "../../../types";
import { Card } from "antd";
import SettingCardContainer from "../../common/SettingCardContainer";


const { Text } = Typography;

interface SettingProps {
    field?: IField;
    optionSetting: any;
    onUpdateSetting?: (id: string, setting: IShopHeaderElementSetting) => void;
    onCloseSetting?: () => void;
    // configContent?: () => JSX.Element;
    // handleActiveElement?: () => void;
}

/**
 * @name Setting
 * @returns JSX.Element
 */
export const Setting = ({ field, onUpdateSetting, onCloseSetting }: SettingProps) => {
    const [form] = Form.useForm();


    const onFinish = (values: any) => {
        if (field && field.id) {
            onUpdateSetting && onUpdateSetting(field.id, values);
            onCloseSetting && onCloseSetting();
        }
    };

    return (
        <SettingCardContainer
            title="Shop header setting"
            onClose={onCloseSetting}
            onSaving={() => { form.submit() }}
        >
            <Form
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
                initialValues={{
                    shopName: field?.optionSetting?.shopName,
                    description: field?.optionSetting?.description
                }}
            >
                <Form.Item
                    name="shopName"
                    label="Name Shop"
                // rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                // rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

            </Form>
        </SettingCardContainer>
    );
};

interface Props {
    field?: IField;
}
/**
 * @name ShopHeader Component
 * @param field IField
 * @returns JSX.Element
 */
export default function ShopHeader({ field }: Props) {

    const items: TabsProps["items"] = [
        {
            key: "1",
            label: "Shop",
            children: ""
        },
        {
            key: "2",
            label: "Product",
            children: ""
        },
        {
            key: "3",
            label: "Category",
            children: ""
        }
    ];

    return (
        <>
            <div id="element-shop-header" style={{ padding: 10 }}>
                <div style={{ display: "flex" }}>
                    <Button type="link">
                        <ArrowLeftOutlined />
                    </Button>
                    <Input />
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: 10,
                        marginBottom: 10
                    }}
                >
                    <Space>
                        <Avatar size="large" />
                        <div>
                            <Text strong>
                                {field?.optionSetting?.shopName || " Shop Name"}
                            </Text>
                            <br />
                            <Text>
                                {field?.optionSetting?.description || "Shop Description"}
                            </Text>
                        </div>
                    </Space>
                    <Button>Follow</Button>
                </div>
            </div>
            <div style={{ padding: "0 10px" }}>
                <Tabs defaultActiveKey="1" items={items} onChange={() => { }} />
            </div>
        </>
    );
}
