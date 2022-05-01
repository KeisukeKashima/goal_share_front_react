import axios from "axios"

export const axiosClient = axios.create({
  baseURL: "http://localhost:8080",
  // リクエストに Cookie を添えて送信するために withCredentials オプションを有効にする(これがないとapi側でセットしたクッキーがブラウザに保存されない)
  withCredentials: true,
  responseType: "json",
  headers: {
    "Content-Type": "application/json"
  }
})
