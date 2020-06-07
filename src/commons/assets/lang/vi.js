import * as langUI from "../../../modules/ui/lang";
import { MODULE_NAME as MODULE_UI } from "../../../modules/ui/models";

import * as langProductItem from "../../../modules/products/lang";
import { MODULE_NAME as MODULE_PRODUCT } from "../../../modules/products/models";

export default {
  translation: {
    [MODULE_UI]: {
      ...langUI.vi
    },
    [MODULE_PRODUCT]: {
      ...langProductItem.vi
    }
  }
};
