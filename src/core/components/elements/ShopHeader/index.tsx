import { Space, Button, Input, Avatar, Typography, TabsProps, Tabs } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import ElementContainer from '../../common/ElementContainer';

const { Text } = Typography;

/**
 * @name Setting
 * @returns JSX.Element
 */
const Setting = ({ field }: { field: any }) => {
    return (
        <div>Setting Shop Header</div>
    )
}

interface Props {
    field?: any
}
/**
 * @name ShopHeader Component
 * @param field 
 * @returns JSX.Element
 */
export default function ShopHeader({ field }: Props) {
    const settingOption = {
        field: {
            ...field,
            title: 'ShopHeader'
        },
        configContent: Setting,
        onDrag: () => { console.log('onDrag') },
        onDelete: () => { console.log('onDrag') },
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
                            <Text strong>Shop Name</Text>
                            <br />
                            <Text>Shop Description</Text>
                        </div>
                    </Space>
                    <Button>Follow</Button>
                </div>
            </div>
            <div style={{ padding: '0 10px' }}><Tabs defaultActiveKey="1" items={items} onChange={() => { }} /></div>
        </ElementContainer >
    )
}
