<script setup>
import { ref, onMounted } from 'vue'
import BaseCard from '@/components/BaseCard.vue'

const champions = ref([])

onMounted(async () => {
  try {
    // Fetch the list of champions from the Riot Games API
    const championListResponse = await fetch(
      'http://ddragon.leagueoflegends.com/cdn/11.14.1/data/en_US/champion.json',
    )
    const championListData = await championListResponse.json()
    const championKeys = Object.keys(championListData.data)

    // Fetch detailed information for each champion
    const detailedChampions = await Promise.all(
      championKeys.map(async (championKey) => {
        const championResponse = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/11.14.1/data/en_US/champion/${championKey}.json`,
        )
        const championData = await championResponse.json()
        const championDetails = championData.data[championKey]

        return {
          id: championDetails.id,
          name: championDetails.name,
          image: `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championKey}_0.jpg`,
          // Add more properties as needed
        }
      }),
    )

    // Set the champions ref to the detailed champion data
    champions.value = detailedChampions
  } catch (error) {
    console.error('Error fetching champion data:', error)
  }
})
</script>

<template>
  <main class="min-h-screen bg-gradient-to-r from-green-900 to-blue-700">
    <div class="container mx-auto grid grid-cols-8 gap-4 py-8">
      <BaseCard
        v-for="champion in champions"
        :key="champion.id"
        :champion="champion"
      />
    </div>
  </main>
</template>
