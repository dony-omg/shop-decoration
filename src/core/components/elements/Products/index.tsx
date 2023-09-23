import ElementContainer from '../../common/ElementContainer';

/**
 * @name Setting
 * @returns JSX.Element
 */
const Setting = () => {
    return (
        <div>Setting Shop Header</div>
    )
}

interface Props {
    field?: any
}

export default function Products({ field }: Props) {
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
            <div>Products</div>
        </ElementContainer>
    )
}
