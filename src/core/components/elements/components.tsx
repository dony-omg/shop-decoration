import React from "react";

import { Setting as ProductSetting } from "./Products";
import { Setting as CarouselSetting } from "./Carousel";


type ComponentProps = {
    block: Block;
};

interface Block {
    component: string;
    _uid: string;
}

const Components: { [key: string]: React.ComponentType<ComponentProps> } = {
    products: ProductSetting,
    carousel: CarouselSetting
};

const renderComponent = (block: Block) => {
    if (typeof Components[block.component] !== "undefined") {
        return React.createElement(Components[block.component], {
            key: block._uid,
            block: block
        });
    }

    return React.createElement(() => <div>Component not found</div>, {
        key: block._uid
    });
};

export default renderComponent;
