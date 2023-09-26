import { useState } from "react";
import {
  Card,
  Col,
  Row,
  Typography,
  Form,
  Input,
  Popconfirm,
  Button
} from "antd";
import { SettingOutlined } from "@ant-design/icons";
import ElementContainer from "../../common/ElementContainer";

const { Meta } = Card;
const { Title } = Typography;
/**
 * @name Setting
 * @returns JSX.Element
 */
const Setting = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const showPopconfirm = () => {
    setOpen(true);
  };

  /**
   * @name handleOk OK button popconfirm
   */
  const handleOk = () => {
    setConfirmLoading(true);
    // trigger submit form
    form.submit();
  };

  /**
   * @name handleCancel Cancel button popconfirm
   */
  const handleCancel = () => {
    setOpen(false);
  };

  /**
   * @name onFinish handle submit form
   * @param values
   */
  const onFinish = (values: any) => {
    // if (field && field.id) {
    //     onUpdateSetting && onUpdateSetting(field.id, values);
    //     setOpen(false);
    //     setConfirmLoading(false);
    // }
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
      description={
        <Form
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            name="nameShop"
            label="Name Shop"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      }
    >
      <Button
        icon={<SettingOutlined />}
        size={"small"}
        onClick={showPopconfirm}
      />
    </Popconfirm>
  );
};

const ProductCard = () => (
  <Card
    hoverable
    cover={
      <img
        alt="example"
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
      />
    }
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card>
);

interface Props {
  field?: any;
}
export default function Products({ field, ...props }: Props) {
  const colCount = 2;
  const numberOfProducts = 4;

  const settingOption = {
    field,
    configContent: Setting,
    ...props
  };

  return (
    <ElementContainer settingOption={settingOption}>
      <div style={{ margin: "5px 0" }}>
        <Title level={5} style={{ marginLeft: 5 }}>
          Fashion
        </Title>
        <Row gutter={[8, 8]}>
          {[...Array(numberOfProducts)].map((_, index) => (
            <Col span={24 / colCount}>
              <ProductCard key={index} />
            </Col>
          ))}
        </Row>
      </div>
    </ElementContainer>
  );
}
