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
    field?: any
}
export default function Promotion({ field }: Props) {
    const settingOption = {
        field,
        configContent: Setting,
        onDrag: () => { console.log('onDrag') },
        onDelete: () => { console.log('onDrag') },
    }

    return (
        <ElementContainer
            settingOption={settingOption}
        >
            <div>Promotion</div>
        </ElementContainer>
    )
}
