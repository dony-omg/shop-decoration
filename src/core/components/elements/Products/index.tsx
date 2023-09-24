import { Card, Col, Row, Typography, Form, Input } from 'antd';
import ElementContainer from '../../common/ElementContainer';
const { Meta } = Card;
const { Title } = Typography;
/**
 * @name Setting
 * @returns JSX.Element
 */
const Setting = () => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log(values);
    };

    return (
        <Form
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
        >
            <Form.Item name="nameShop" label="Name Shop" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
        </Form>
    )
}

const ProductCard = () => (
    <Card
        hoverable
        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
    >
        <Meta title="Europe Street beat" description="www.instagram.com" />
    </Card>
)

interface Props {
    field?: any,
}
export default function Products({ field, ...props }: Props) {
    const colCount = 2;
    const numberOfProducts = 4;

    const settingOption = {
        field,
        configContent: Setting,
        ...props,
    }

    return (
        <ElementContainer
            settingOption={settingOption}
        >
            <div style={{ margin: '5px 0' }}>
                <Title level={5} style={{ marginLeft: 5 }}>Fashion</Title>
                <Row gutter={[8, 8]}>
                    {[...Array(numberOfProducts)].map((_, index) => <Col span={24 / colCount}><ProductCard key={index} /></Col>)}
                </Row>
            </div>
        </ElementContainer>
    )
}
