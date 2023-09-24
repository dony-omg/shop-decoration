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
}
export default function Promotion({ field, ...props }: Props) {
    const settingOption = {
        field,
        configContent: Setting,
        ...props,
    }

    return (
        <ElementContainer
            settingOption={settingOption}
        >
            <div>Promotion</div>
        </ElementContainer>
    )
}
