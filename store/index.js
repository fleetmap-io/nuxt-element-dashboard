export const state = () => ({
  session: {},
  geofences: [],
  devices: [],
  groups: [],
  drivers: [],
  users: [],
  dateRange: [new Date(new Date() - 1000 * 60 * 60 * 24 * 3), new Date()],
  loading: true,
  trips: [],
  summary: [],
  events: [],
  percentage: 0
})

export const getters = {
  from: state => state.dateRange[0] && new Date(state.dateRange[0]).toISOString(),
  to: state => state.dateRange[1] && new Date(state.dateRange[1]).toISOString(),
  loading: state => state.loading,
  deviceIds: state => state.devices.map(d => `deviceId=${d.id}`).join('&'),
  dateRange: state => state.dateRange,
  summary: state => state.summary,
  user: state => state.user,
  trips: state => state.trips,
  devices: state => state.devices,
  events: state => state.events,
  session: state => state.session,
  height: () => 300,
  percentage: state => state.percentage
}

export const mutations = {
  SET_DATE_RANGE (state, dateRange) {
    state.dateRange = dateRange
  },
  SET_DEVICES (state, devices) {
    state.devices = devices.slice(0, 20)
  },
  SET_TRIPS (state, trips) {
    state.trips = trips
  },
  SET_SUMMARY (state, summary) {
    state.summary = summary
  },
  SET_EVENTS (state, events) {
    state.events = events
  },
  SET_SESSION (state, session) {
    state.session = session
  },
  SET_LOADING (state, loading) {
    state.loading = loading
  },
  SET_PERCENTAGE (state, percentage) {
    state.percentage = percentage
  }
}

export const actions = {
  async initData ({ commit, dispatch }) {
    commit('SET_SESSION', await this.$axios.$get('session'))
    commit('SET_DEVICES', await this.$axios.$get('devices'))
    dispatch('getData')
  },
  async getData ({ commit, getters, state }) {
    commit('SET_LOADING', true)
    commit('SET_PERCENTAGE', 0)
    try {
      const types = ['trips', 'summary'].map(t => `type=${t}`).join('&')
      const data = await Promise.all(state.devices.map(async (device) => {
        const result = await this.$axios.$get(`reports/allinone?deviceId=${device.id}&from=${getters.from}&to=${getters.to}&${types}`)
        commit('SET_PERCENTAGE', Math.floor(state.percentage + 50 / state.devices.length))
        result.events = await this.$axios.$get(`reports/events?deviceId=${device.id}&from=${getters.from}&to=${getters.to}`)
        commit('SET_PERCENTAGE', Math.floor(state.percentage + 50 / state.devices.length))
        return result
      }))
      const trips = data.map(d => d.trips).flat()
      const summary = data.map(d => d.summary).flat()
      const events = data.map(d => d.events).flat()
      commit('SET_TRIPS', trips)
      commit('SET_SUMMARY', summary)
      commit('SET_EVENTS', events)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
      alert(e.message)
    }
    commit('SET_LOADING', false)
  }
}
