import request from '../request/request'
import API from '../request/api'

const commonApi = {
  //更新用户信息
  updateUser(params = {}) {
    return request.put(API.user, params) ;
  },
  //获取商品详情
  productDetail( id: number ) {
    return request.get<Res.ProductDetail>(API.productDetail(id)) ;
  },
  //收藏商品
  collectProduct(params = {}) {
    return request.post(API.collectProduct, params) ;
  },
}

export default commonApi

