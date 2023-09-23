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

interface Props {
    field?: any,
    onRemove?: (id: string) => void
}
export default function Promotion({ field, ...props }: Props) {
    const settingOption = {
        field,
        configContent: Setting,
        onDrag: () => { console.log('onDrag') },
        onDelete: () => {
            console.log('onDelete', field);
            props?.onRemove?.(field.id);
        },
    }

    return (
        <ElementContainer
            settingOption={settingOption}
        >
            <div>Promotion</div>
        </ElementContainer>
    )
}
