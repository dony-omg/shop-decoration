import { Typography } from 'antd';
import ElementContainer from '../../common/ElementContainer';


/**
 * @name Setting
 * @returns JSX.Element
 */
const Setting = () => {
    return (
        <div>Setting Typography</div>
    )
}

interface Props {
    field?: any,
    onRemove?: (id: string) => void
}
export default function TypographyElement({ field, ...props }: Props) {
    const type = 'Title';
    const content = 'Typography';
    const Render = Typography[type];

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
            <div>
                <Render>{content}</Render>
            </div>
        </ElementContainer>
    )
}
