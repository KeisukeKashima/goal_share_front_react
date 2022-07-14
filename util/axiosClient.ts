import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios'
import lscache from "lscache";

export const axiosClient = axios.create({
  // next.configでAPP_ENVを設定している
  baseURL: process.env.serviceOrigin,
  // リクエストに Cookie を添えて送信するために withCredentials オプションを有効にする(これがないとapi側でセットしたクッキーがブラウザに保存されない)
  withCredentials: true,
  responseType: "json",
  headers: {
    "Content-Type": "application/json"
  }
})

/**
 * リクエスト インターセプター
 */
axiosClient.interceptors.request.use((config: AxiosRequestConfig) => {
  const idToken = lscache.get('id_token')
  // console.log('idToken', idToken)
  // console.log('config.headers', config.headers)
  if (idToken) {
    // ローカルストレージにidTokenがあればリクエストヘッダーに詰める
    config.headers.Authorization = `Bearer ${idToken}`
  }
  return config
})


/**
 * レスポンス インターセプター
 */
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError) => {
    switch (error.response?.status) {
      case 401:
        // なにかする
        break
      default:
        break
    }
    return Promise.reject(error)
  }
)
