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
import SettingCardContainer from "../../common/SettingCardContainer";
import React from "react";

const { Meta } = Card;
const { Title } = Typography;



interface SettingProps {
    field?: any;
    optionSetting: any;
    onUpdateSetting?: (id: string, setting: any) => void;
    onCloseSetting?: () => void;
}

/**
 * @name Setting for element
 * @returns JSX.Element
 */
export const Setting = ({ field, onUpdateSetting, onCloseSetting }: SettingProps) => {
    return <SettingCardContainer
        title="Setting Products"
        onClose={onCloseSetting}
        onSaving={() => { }}
    >
        Setting CarouselElement
    </SettingCardContainer>;
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


export default function Products() {
    const colCount = 2;
    const numberOfProducts = 2;


    return (
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
    );
}
