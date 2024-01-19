import config from '../resources/endpoints/booking.json'
import axios from 'axios'

const state = {
  settingsAdmin: [],
  settingsPublic: [],
  bookingHours: [],
  bookingsAdmin: []
}
const getters = {
  getBookingSettingsAdmin: state => state.settingsAdmin,
  getBookingSettingsPublic: state => state.settingsPublic,
  getBookingHours: state => state.bookingHours,
  getBookingsAdmin: state => state.bookingsAdmin
}
const actions = {
  async fetchBookings ({ commit, dispatch }, data) {
    await axios
    .get(config.all_admin, { params: data ? { employee: data } : {} })
    .then(response => {
      console.log(response)
      commit('setBookingsAdmin', response.data.data.bookings)
    })
    .catch(error => {
      console.log(error)
    })
  },
  async assignBooking ({ commit, dispatch }, data) {
    await axios
    .patch(config.assign.replace('{{id}}', data.booking), { employee: data.employee.id })
    .then(response => {
      console.log(response)
      dispatch('spawnNotification', {
        type: 'success',
        message: `Appointment assigned to ${data.employee.name}`,
        action1: { label: 'OK' }
      });
    })
    .catch(error => {
      console.log(error)
    })
  },
  async updateBooking ({ commit, dispatch }, data) {
    await axios
    .patch(config.id.replace('{{id}}', data.booking), { status: data.status })
    .then(response => {
      console.log(response)
      dispatch('spawnNotification', {
        type: 'success',
        message: 'Booking status updated.',
        action1: { label: 'OK' }
      });
    })
    .catch(error => {
      console.log(error)
    })
  },
  async fetchBookingHours ({ commit, dispatch }, data) {
    await axios
    .get(config.all_public, { params: { date: data } })
    .then(response => {
      console.log(response)
      commit('setBookingHours', response.data.data)
    })
    .catch(error => {
      console.log(error)
    })
  },
  async fetchBookingSettingsPublic ({ commit, dispatch}) {
    axios
    .get(config.settings.all_public)
    .then(response => {
      console.log(response)
      commit('setBookingSettingsPublic', response.data.data)
    })
  },
  async fetchBookingSettingsAdmin ({ commit, dispatch }) {
    axios
    .get(config.settings.all_admin)
    .then(response => {
      let weekDays = []
      response.data.data.bookingsettings.forEach(day => {
        let rules = {
          startHour: null,
          endHour: null,
          dayOff: false,
          interval: null
        }
        let exceptions = []
        day.settings.forEach(setting => {
          setting.type == 'rule'
          ? rules = {
            startHour: setting.startHour,
            endHour: setting.endHour,
            dayOff: setting.dayOff,
            interval: setting.interval,
            id: setting._id
          }
          : exceptions.push({
            exceptionDate: setting.exceptionDate || null,
            startHour: setting.startHour || null,
            endHour: setting.endHour || null,
            dayOff: setting.dayOff || false,
            interval: setting.interval || null,
            id: setting._id || null
          })
        })
        weekDays.push({
          name: day.day,
          id: day._id,
          rules: rules,
          exceptions: exceptions
        })
      })
      console.log(weekDays)
      commit('setBookingSettingsAdmin', weekDays)
    })
    .catch(error => {
      console.log(error)
    })
  },
  async updateBookingRules ({ commit, dispatch}, data) {
    await axios
    .post(config.settings.rule, data)
    .then(response => {
      console.log(response)
      dispatch('fetchBookingSettingsAdmin')
    })
    .catch(error => {
      console.log(error)
    })
  },
  async newBookingException ({ commit, dispatch }, data) {
    await axios
    .post(config.settings.exception, data)
    .then(response => {
      console.log(response)
      dispatch('fetchBookingSettingsAdmin')
    })
    .catch(error => {
      console.log(error)
    })
  },
  async removeBookingException ({ commit, dispatch }, data) {
    console.log(data)
    await axios
    .delete(config.settings.exception, { data: data })
    .then(() => {
      dispatch('fetchBookingSettingsAdmin')
    })
    .catch(error => {
      console.log(error)
    })
  },
  async createBooking ({ commit, dispatch }, data) {
    await axios
    .post(config.all_public, data)
    .then(response => {
      dispatch('spawnNotification', {
        type: 'success',
        message: 'Appointment made successfully. An email confirmation has been sent.',
        action1: { label: 'OK' }
      });
    })
    .catch(error => {
      console.log(error)
    })
  }
}
const mutations = {
  setBookingSettingsAdmin: (state, settings) => state.settingsAdmin = settings,
  setBookingSettingsPublic: (state, settings) => state.settingsPublic = settings,
  setBookingHours: (state, hours) => state.bookingHours = hours,
  setBookingsAdmin: (state, bookings) => state.bookingsAdmin = bookings
}

export default {
  state, getters, actions, mutations
}