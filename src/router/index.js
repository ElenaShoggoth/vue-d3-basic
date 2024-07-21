import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home/HomePage.vue'
import D3PieChart from '../components/D3PieChart/D3PieChart.vue'
import InfoCards from '../components/Cards/InfoCards.vue'
import MainLayout from '../components/MainLayout/MainLayout.vue'
import PageError from '../components/PageError/PageError.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: 'chart',
        name: 'Chart',
        component: D3PieChart
      },
      {
        path: 'cards',
        name: 'Cards',
        component: InfoCards
      },
      {
        path: '/:pathMatch(.*)*',
        component: PageError
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
