import axios from 'axios';

// __DEV__ 값을 통해 현재 환경이 개발 환경인지 아닌지 판단할 수 있습니다.
const baseURL = 'http://192.168.4.196:8080/FirstProject';
const client = axios.create({
  baseURL,
});
client.defaults.withCredentials = true;

export default client;
