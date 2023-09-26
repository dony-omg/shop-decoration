import { Button, Form, Popconfirm } from "antd";
import { useState } from "react";
import { SettingOutlined } from "@ant-design/icons";

import ElementContainer from "../../common/ElementContainer";

/**
 * @name Setting
 * @returns JSX.Element
 */
/**
 * @name Setting
 * @returns JSX.Element
 */
export const Setting = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const [form] = Form.useForm();

  const showPopconfirm = () => {
    setOpen(true);
  };

  /**
   * @name handleOk OK button popconfirm
   */
  const handleOk = () => {
    setConfirmLoading(true);
    // form.submit()
  };

  /**
   * @name handleCancel Cancel button popconfirm
   */
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Popconfirm
      title="Setting"
      trigger={"click"}
      arrow={false}
      placement="right"
      open={open}
      onConfirm={handleOk}
      okButtonProps={{ loading: confirmLoading }}
      onCancel={handleCancel}
      description={<>Content</>}
    >
      <Button
        icon={<SettingOutlined />}
        size={"small"}
        onClick={showPopconfirm}
      />
    </Popconfirm>
  );
};

interface Props {
  field?: any;
}
export default function Promotion({ field }: Props) {
  const settingOption = {
    field,
    configContent: Setting,
    onDrag: () => {
      console.log("onDrag");
    },
    onDelete: () => {
      console.log("onDrag");
    }
  };

  return (
    <ElementContainer settingOption={settingOption}>
      <div>Promotion</div>
    </ElementContainer>
  );
}
