import { Carousel } from "antd";
import React from "react";
import SettingCardContainer from "../../common/SettingCardContainer";



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
        title="Setting CarouselElement"
        onClose={onCloseSetting}
        onSaving={() => { }}
    >
        Setting CarouselElement
    </SettingCardContainer>;
};

const contentStyle: React.CSSProperties = {
    margin: 0,
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79"
};

interface Props {
    field?: any;
}
export default function CarouselElement({ field, ...props }: Props) {
    const settingOption = {
        field,
        configContent: Setting,
        ...props
    };

    const onChange = (currentSlide: number) => {
        console.log(currentSlide);
    };

    return (
        <div>
            <Carousel afterChange={onChange}>
                {[...Array(4)].map((item, index) => (
                    <div>
                        <h3 style={contentStyle}>{index}</h3>
                    </div>
                ))}
            </Carousel>
        </div>
    );
}
