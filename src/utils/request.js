import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd',
  timeout: 5000
})

export const get = async (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params }).then((res) => resolve(res.data), err => reject(err))
  })
}
export const post = async (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => resolve(res.data), err => reject(err))
  })
}
