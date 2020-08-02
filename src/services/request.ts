import axios from 'axios';

export function getData(url: string) {
	return axios.get(url)
	  .then(res => res.data)
	  .catch(err => console.log(err))
}