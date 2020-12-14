const MODE = process.env.NODE_ENV
const PRODUCTION_PREFIX = "";
const DEVELOPMENT_PREFIX = ""; //填写服务器地址
const PREFIX = MODE === "production" ? PRODUCTION_PREFIX : DEVELOPMENT_PREFIX;

export default {
  MODE,
  // 用户
  user: `${PREFIX}/v1/user`,
  // 商品详情
  productDetail: (id: number) => `${PREFIX}/v1/mini/products/${id}`,
  // 收藏商品
  collectProduct: `${PREFIX}/v1/collection`,
};
