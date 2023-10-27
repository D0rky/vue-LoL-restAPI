/* eslint-disable prettier/prettier */
import { ref } from 'vue'
import useApi from '@/composables/useApi'

const characters = ref([])
const currentCharacter = ref(null)
const firstLoad = ref(true)

const api = useApi()

const useCharacters = () => {
  const fetchCharacters = async () => {
    try {
      const { data } = await api.instance.get('champion.json')
      console.log(data) // Log the data to inspect its structure
      characters.value = Object.values(data.data)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchCharacter = async (championName) => {
    try {
      const { data } = await api.instance.get(`champion/${championName}.json`)
      currentCharacter.value = data.data[championName]
    } catch (error) {
      console.error(error)
    }
  }

  return {
    characters,
    fetchCharacters,
    fetchCharacter,
    currentCharacter,
    firstLoad,
  }
}

export default useCharacters
