/* eslint-disable prettier/prettier */
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://ddragon.leagueoflegends.com/cdn/11.14.1/data/en_US/',
})

const useApi = () => {
  return { instance }
}

export default useApi
