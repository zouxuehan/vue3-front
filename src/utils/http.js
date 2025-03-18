import axios from 'axios'
// import { useUserStore } from '@/stores/user'

const http = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
})

http.interceptors.request.use(
  async (config) => {
    const { useUserStore } = await import('@/stores/user')
    const userStore = useUserStore()
    if (userStore.getToken) {
      config.headers.Authorization = `Bearer ${userStore.getToken}`
    }
    return config
  },
  (error) => {
    const { response } = error
    if (response.status == 401) {
      return refreshToken(response.config)
    }
    return Promise.reject(error)
  },
)

http.interceptors.response.use(
  (response) => {
    return checkStatus(response)
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 状态检查
const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    const { data } = response.data
    if (data.code && data.code != 200) {
      return Promise.reject(response)
    }
    return data.data || data
  }
  return Promise.reject(response)
}

// token超时刷新
let requestQueue = []
let isRefreshing = false

const refreshToken = (config) => {
  if (!isRefreshing) {
    isRefreshing = true
    return userStore
      .refreshToken()
      .then(() => {
        return config
      })
      .finally(() => {
        isRefreshing = false
        requestQueue.forEach((cb) => cb())
        requestQueue = []
      })
  } else {
    return new Promise((resolve) => {
      requestQueue.push(() => {
        resolve(config)
      })
    })
  }
}

export default http
