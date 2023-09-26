import { ArrowLeftOutlined, SettingOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Form,
  Input,
  Popconfirm,
  Space,
  Tabs,
  TabsProps,
  Typography
} from "antd";
import { useState } from "react";
import { IField, IShopHeaderElementSetting } from "../../../types";
import ElementContainer from "../../common/ElementContainer";
import SettingPopContainer from "../../common/SettingPopContainer";

const { Text } = Typography;

interface SettingProps {
  field?: IField;
  onUpdateSetting?: (id: string, setting: IShopHeaderElementSetting) => void;
  configContent?: () => JSX.Element;
}

/**
 * @name Setting
 * @returns JSX.Element
 */
export const Setting = ({ field, onUpdateSetting }: SettingProps) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {};

  const onFinish = (values: IShopHeaderElementSetting) => {
    if (field && field.id) {
      onUpdateSetting && onUpdateSetting(field.id, values);
    }
  };

  return (
    <SettingPopContainer
      onConfirm={handleOk}
      onCancel={handleCancel}
      description={
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
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      }
    />
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
export default function ShopHeader({ field, ...props }: Props) {
  const settingOption: SettingProps = {
    field: {
      ...field,
      id: field?.id ?? null,
      type: field?.type ?? null
    },
    configContent: () => <Setting field={field} {...props} />,
    ...props
  };

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
    <ElementContainer settingOption={settingOption}>
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
        <Tabs defaultActiveKey="1" items={items} onChange={() => {}} />
      </div>
    </ElementContainer>
  );
}
