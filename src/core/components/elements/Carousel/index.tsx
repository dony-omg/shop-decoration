import { Carousel } from 'antd';
import ElementContainer from '../../common/ElementContainer';

/**
 * @name Setting
 * @returns JSX.Element
 */
const Setting = () => {
    return (
        <div>Setting Promotion</div>
    )
}

const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

interface Props {
    field?: any
}
export default function CarouselElement({ field }: Props) {
    const settingOption = {
        field,
        configContent: Setting,
        onDrag: () => { console.log('onDrag') },
        onDelete: () => { console.log('onDrag') },
    }

    const onChange = (currentSlide: number) => {
        console.log(currentSlide);
    };

    return (
        <ElementContainer
            settingOption={settingOption}
        >
            <div >
                <Carousel afterChange={onChange}>
                    {[...Array(4)].map((item, index) => (
                        <div>
                            <h3 style={contentStyle}>{index}</h3>
                        </div>
                    ))}
                </Carousel>
            </div>
        </ElementContainer>
    )
}