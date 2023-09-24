import { Space, Button, Input, Avatar, Typography, TabsProps, Tabs, Form } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import ElementContainer from '../../common/ElementContainer';

const { Text } = Typography;

interface SettingProps {
    field?: any,
    onUpdateSetting?: (id: string, setting: any) => void,
}

/**
 * @name Setting
 * @returns JSX.Element
 */
const Setting = ({ field, onUpdateSetting }: SettingProps) => {
    const [form] = Form.useForm();
    const onFinish = (values: any) => {

        onUpdateSetting && onUpdateSetting(field.id, values);
    };

    return (
        <Form
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
            initialValues={{
                shopName: field?.optionSetting?.shopName,
                description: field?.optionSetting?.description,
            }}
        >
            <Form.Item name="shopName" label="Name Shop" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item >
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
        </Form>
    )
}

interface Props {
    field?: any,
}
/**
 * @name ShopHeader Component
 * @param field 
 * @returns JSX.Element
 */
export default function ShopHeader({ field, ...props }: Props) {

    // console.log('optionSetting', props);

    const settingOption = {
        field: {
            ...field,
            title: 'Setting Shop Header'
        },
        configContent: () => <Setting field={field} {...props} />,
        ...props,
    }

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Shop',
            children: '',
        },
        {
            key: '2',
            label: 'Product',
            children: '',
        },
        {
            key: '3',
            label: 'Category',
            children: '',
        },
    ];

    return (
        <ElementContainer
            settingOption={settingOption}
        >
            <div id="element-shop-header" style={{ padding: 10 }}>
                <div style={{ display: 'flex' }}>
                    <Button type='link'><ArrowLeftOutlined /></Button>
                    <Input />
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 10,
                    marginBottom: 10

                }}>
                    <Space>
                        <Avatar size="large" />
                        <div>
                            <Text strong>{field?.optionSetting?.shopName || ' Shop Name'}</Text>
                            <br />
                            <Text>{field?.optionSetting?.description || 'Shop Description'}</Text>
                        </div>
                    </Space>
                    <Button>Follow</Button>
                </div>
            </div>
            <div style={{ padding: '0 10px' }}><Tabs defaultActiveKey="1" items={items} onChange={() => { }} /></div>
        </ElementContainer >
    )
}
