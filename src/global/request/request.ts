export interface Response {
  code: number;
  msg: string;
  page?: {
    index: number;
    size: number;
    count?: number;
    total?: number;
  };
}

export interface ResponseData<T> extends Response {
  data: T;
}

const globalError = (response:Response) => {
  uni.showModal({
    title: String(response.code),
    content: response.msg,
    confirmText: "确定",
    showCancel: false
  });
};

const showError = (error_code: string, message: string, successCallback?: Function) => {
  uni.showModal({
    title: String(error_code),
    content: message,
    confirmText: "确定",
    showCancel: false,
    success: res => {
      successCallback &&
        typeof successCallback === "function" &&
        successCallback();
    }
  });
};

const interceptorsRequest = (method: UniApp.RequestOptions['method'], url: string, data: N, header = {}) => {
  let params = { method, url, data, header };
  return params;
};

const request = <T>(method: UniApp.RequestOptions['method'], url: string, data: Object, header: N) => {
  let params = interceptorsRequest(method, url, data, header);
  params.header = {
    'content-type': 'application/json; charset=utf-8',
    'cookie': wx.getStorageSync("cookie")
  }
  return new Promise<T>((resolve, reject) => {
    uni.request({
      method,
      url: params.url,
      header: params.header,
      data: params.data,
      success: (res) => {
        let cookie = res.cookies;
        if (cookie.length > 0 ) {
          wx.setStorageSync("cookie", cookie[cookie.length - 1]);
        }
        const resData = res.data as ResponseData<T>
        if (res.statusCode === 200) {
          if(resData.code === 500) {
            let message = resData.msg
            showError("提示", message);
            reject(res.data);
          }else if(resData.code === 401) {
            //登录过期过期逻辑
            showError("登录过期", "请重新登录", () => {
              uni.reLaunch({ url: "/pages/index/index" });
            });
            reject(resData);
          }
          else {
            resolve(resData.data);
          }
        }else {
          reject(resData.msg);
          globalError({code:500, msg:'500'});
        }
      },
      fail: err => {
        uni.showModal({
          title: "网络",
          content: "网络出现问题，请检查网络是否连接畅通！",
          confirmText: "确定",
          showCancel: false
        });
        reject(err);
      }
    });
  });
};

/* [请求库]
 ** @params url         { string }   @default => '' [接口地址，统一在 api 文件中]
 ** @params data/params { object }   @default => {} [发送数据]
 ** @params header      { object }   @default => {} [请求 Header 配置]
 */

export default {
  post: function(url = "", data = {}, header = {}) {
    return request("POST", url, data, header);
  },
  put: function(url = "", data = {}, header = {}) {
    return request("PUT", url, data, header);
  },
  get: function<T>(url = "", data = {}, header = {}) {
    return request<T>("GET", url, data, header);
  },
  delete: function(url = "", data = {}, header = {}) {
    return request("DELETE", url, data, header);
  }
};
