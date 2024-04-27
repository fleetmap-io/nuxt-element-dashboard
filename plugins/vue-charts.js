import {
  Chart as ChartJS,
  Title,
  Tooltip,
  TimeScale,
  Legend,
  BarElement,
  CategoryScale, LinearScale, ArcElement, PointElement, LineElement
} from 'chart.js'
import 'chartjs-adapter-luxon'

import { Bar, Pie, Line } from 'vue-chartjs/legacy'
import Vue from 'vue'

ChartJS.register(TimeScale, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, PointElement, LineElement)
Vue.component('BarChart', Bar)
Vue.component('PieChart', Pie)
Vue.component('LineChart', Line)
