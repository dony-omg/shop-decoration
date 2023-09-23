import React from "react";
import ShopHeader from "./elements/ShopHeader";
import Products from "./elements/Products";
import Promotion from "./elements/Promotion";
import Carousel from "./elements/Carousel";
import Typography from "./elements/Typography";
// These will be available from the sidebar
export const fields = [
    {
        type: "shopHeader",
        title: "Shop Header",
    },
    {
        type: "products",
        title: "Products",
    },
    {
        type: "promotion",
        title: "Promotion",
    },
    {
        type: "carousel",
        title: "Carousel",
    },
    {
        type: "typography",
        title: "Typography",
    },
    {
        type: "input",
        title: "Text Input"
    },
    {
        type: "button",
        title: "Button"
    }
]

// These define how we render the field
export const renderers = {
    shopHeader: () => <ShopHeader />,
    products: () => <Products />,
    promotion: () => <Promotion />,
    carousel: () => <Carousel />,
    typography: () => <Typography />,
    input: () => <input type="text" placeholder="This is a text input" />,
    select: () => (
        <select>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
    ),
    button: () => <button>Button</button>
};