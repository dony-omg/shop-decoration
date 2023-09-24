import { Card, Col, Row, Typography } from 'antd';
import ElementContainer from '../../common/ElementContainer';
const { Meta } = Card;
const { Title } = Typography;
/**
 * @name Setting
 * @returns JSX.Element
 */
const Setting = () => {
    return (
        <div>Setting Product</div>
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
    onRemove?: (id: string) => void
}
export default function Products({ field, ...props }: Props) {
    const colCount = 2;
    const numberOfProducts = 4;

    const settingOption = {
        field,
        configContent: Setting,
        onDrag: () => { console.log('onDrag') },
        onDelete: () => {
            props?.onRemove?.(field.id);
        },
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
