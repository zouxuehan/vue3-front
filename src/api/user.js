import http from '@/utils/http'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
export function loginApi(params) {
  const { device_id, device_desc } = appStore
  return http.post('/mobileAuth/login', {
    __DATA: JSON.stringify({ ...params, device_id, device_desc }),
  })
}

export function refreshTokenApi(params) {
  return http.post('/mobileAuth/login', params)
}
