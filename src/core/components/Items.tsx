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
    imageUrl:
      "https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*4i58ToAcxaYAAAAAAAAAAAAADrJ8AQ/original"
  },
  {
    type: "products",
    title: "Products",
    imageUrl:
      "	https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*VXtCTp93KPAAAAAAAAAAAAAADrJ8AQ/original"
  },
  {
    type: "promotion",
    title: "Promotion",
    imageUrl:
      "https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*oyOcTrB12_YAAAAAAAAAAAAADrJ8AQ/original"
  },
  {
    type: "carousel",
    title: "Carousel",
    imageUrl:
      "https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*bPMSSqbaTMkAAAAAAAAAAAAADrJ8AQ/original"
  },
  {
    type: "typography",
    title: "Typography",
    imageUrl:
      "https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*MLt3R6m9huoAAAAAAAAAAAAADrJ8AQ/original"
  },
  {
    type: "input",
    title: "Text Input",
    imageUrl:
      "https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*Y3R0RowXHlAAAAAAAAAAAAAADrJ8AQ/original"
  },
  {
    type: "button",
    title: "Button",
    imageUrl:
      "https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*BrFMQ5s7AAQAAAAAAAAAAAAADrJ8AQ/original"
  }
];

// These define how we render the field
export const renderers = {
  shopHeader: ShopHeader,
  products: Products,
  promotion: Promotion,
  carousel: Carousel,
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
