import React from "react";

import { Setting as ShopHeaderSetting } from "./ShopHeader";
import { Setting as ProductSetting } from "./Products";
import { Setting as CarouselSetting } from "./Carousel";


interface Block {
    component: string;
    _uid: string;
}

const Components = {
    shopHeader: ShopHeaderSetting,
    products: ProductSetting,
    carousel: CarouselSetting
};

const renderComponent = (block: any) => {
    if (typeof Components[block.component] !== "undefined") {
        return React.createElement(Components[block.component], {
            key: block._uid,
            block: block,
            ...block
        });
    }

    return React.createElement(() => <div>Component not found</div>, {
        key: block._uid
    });
};

export default renderComponent;
