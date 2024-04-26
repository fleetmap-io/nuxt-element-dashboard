export const state = () => ({
  user: null,
  geofences: [],
  devices: [],
  groups: [],
  schedules: [],
  drivers: [],
  users: [],
  cognitoSession: null,
  showDashboardHeader: true,
  selectedDevices: [],
  dateRange: [],
  loading: false,
  email: null,
  tachoDevices: null,
  tachoDownloads: [],
  lastUpdate: null,
  title: 'Relatórios'
})

export const getters = {
  title: state => state.title,
  loading: (state) => {
    return state.loading
  },
  dateRange: (state) => {
    return state.dateRange
  },
  selectedDevices: (state) => {
    return state.selectedDevices
  },
  user: (state) => {
    return state.user
  },
  geofences: (state) => {
    return state.geofences
  },
  devices: (state) => {
    return state.devices
  },
  groups: (state) => {
    return state.groups
  },
  schedules: (state) => {
    return state.schedules
  },
  drivers: (state) => {
    return state.drivers
  },
  users: (state) => {
    return state.users
  },
  cognitoSession: (state) => {
    return state.cognitoSession
  },
  showDashboardHeader: (state) => {
    return state.showDashboardHeader
  },
  tachoDownloads: (state) => {
    return state.tachoDownloads
  },
  tachoLastUpdate: (state) => {
    return state.lastUpdate
  }
}

export const mutations = {
  setTitle (state, title) {
    state.title = title
  },
  setLoading (state, loading) {
    state.loading = loading
  },
  setSelectedDevices (state, devices) {
    state.selectedDevices = devices
  },
  setDateRange (state, dateRange) {
    state.dateRange = dateRange
  },
  setDevices (state, devices) {
    state.devices = devices
  },
  setGroups (state, groups) {
    state.groups = groups
  },
  setGeofences (state, geofences) {
    geofences.sort((a, b) => a.name.localeCompare(b.name))
    state.geofences = geofences
  },
  setUser (state, session) {
    state.user = session
  },
  setSchedules (state, schedules) {
    state.schedules = schedules
  },
  addSchedule (state, schedule) {
    state.schedules.push(schedule)
  },
  setDrivers (state, drivers) {
    state.drivers = drivers
  },
  setDriversByGroup (state, { groupId, drivers }) {
    const g = state.groups.find(g => g.id === groupId)
    if (g) {
      g.drivers = drivers.map(d => d.id)
    }
    drivers.forEach((d) => {
      const driver = state.drivers.find(driver => driver.id === d.id)
      if (driver) {
        driver.groupName = g.name
      }
    })
  },
  setUsers (state, users) {
    state.users = users
  },
  setShowDashboardHeader (state, show) {
    state.showDashboardHeader = show
  }
}

export const actions = {
}
