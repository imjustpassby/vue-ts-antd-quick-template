import axios, { AxiosError, AxiosResponse } from 'axios'
import qs from 'query-string'
const request = axios.create({
  // baseURL:
  //   process.env.NODE_ENV === 'production'
  //     ? 'https://ipassby.cloud'
  //     : 'http://localhost:9111'
  baseURL: 'https://ipassby.cloud'
})

// object对象存放每次new CancelToken生成的方法
const source: {
  [key: string]: any
} = {}

// 每次请求前都会把api放在此数组中，响应成功后清除此请求api
let requestList: string[] = []
// 不需要取消请求的白名单
const whitelist: string[] = []

request.interceptors.request.use(config => {
  // 取消上一次url相同的请求
  const url = config.url
  if (requestList.length && url! in source && !whitelist.includes(url!)) {
    console.log(`ready to cancel${url}`)
    cancelRequest(url!)
  }
  const cfg = {
    // source对象保存取消方法
    cancelToken: new axios.CancelToken(function executor(c) {
      source[url!] = c
    }),

    ...config
  }
  // 请求前将api推入requestList
  requestList.push(url!)

  if (cfg.method === 'post' || cfg.method === 'put' || cfg.method === 'patch') {
    cfg.data = qs.stringify(config.data)
    cfg.headers['Content-Type'] =
      'application/x-www-form-urlencoded;charset=UTF-8'
  }

  config.withCredentials = true

  return cfg
})

request.interceptors.response.use(
  (res: AxiosResponse) => {
    // 请求完成后，将此请求从请求列表中移除
    const fullUrl = res.config.url
    const frontIndex = fullUrl!.indexOf('/api')
    const tailIndex =
      fullUrl!.indexOf('?') > 0 ? fullUrl!.indexOf('?') : fullUrl!.length
    const url = fullUrl!.substring(frontIndex, tailIndex)
    requestList = requestList.filter(el => el === url)
    delete source[url!]

    return Promise.resolve(res)
  },
  (err: AxiosError) => {
    return Promise.reject(err)
  }
)

export function cancelRequest(api: string, allCancel?: boolean) {
  // 请求列表里存在此api，即发起重复请求，把之前的请求取消掉
  if (requestList.includes(api) && typeof source[api] === 'function') {
    source[api]('终止请求')
  } else if (!api && allCancel) {
    // allCancel为true则请求列表里的请求全部取消
    requestList.forEach(el => {
      source[el]('批量终止请求')
    })
  }
}

export default request.request
