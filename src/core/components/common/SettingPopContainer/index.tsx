import { SettingOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import React, { useState } from "react";

interface SettingPopContainerProps {
  description: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export default function SettingPopContainer({
  description,
  ...props
}: SettingPopContainerProps) {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    //Handle ok here
    props.onConfirm && props.onConfirm();
    setConfirmLoading(false);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
    //Handle cancel here
    props.onCancel && props.onCancel();
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
      description={description}
    >
      <Button
        icon={<SettingOutlined />}
        size={"small"}
        onClick={showPopconfirm}
      />
    </Popconfirm>
  );
}
