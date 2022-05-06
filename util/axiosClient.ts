import axios from "axios"

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
