import { useState } from "react";

import React from "react";
import ElementContainer from "../../common/ElementContainer";
import SettingPopContainer from "../../common/SettingPopContainer";
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
    <SettingPopContainer
      onConfirm={handleOk}
      onCancel={handleCancel}
      description={<>Content</>}
    />
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
