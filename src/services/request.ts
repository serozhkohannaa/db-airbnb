import axios from 'axios';

export function getData(url: string) {
  return axios.get(url)
	.then(res => res.data)
	.catch(err => console.log(err))
}

export function postData(url: string, postData) {
  return axios.post(url, postData)
	.then(res => res.data)
	.catch(err => console.log(err))
}