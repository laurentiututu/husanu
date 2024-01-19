import config from '../resources/endpoints/user.json'
import axios from 'axios'
import i18n from '../../i18n'

const state = {
  user: {},
  userDetails: {},
  usersAdmin: []
}
const getters = {
  getCurrentUser: state => state.user,
  getCurrentUserDetails: state => state.userDetails,
  getUsersAdmin: state => state.usersAdmin
}
const actions = {
  async fetchCurrentUser ({ commit, dispatch }) {
    await axios
    .get(config.me)
    .then(response => {
      commit('setCurrentUser', response.data.data.user)
    })
    .catch(error => {
      dispatch('spawnNotification', {
        type: 'danger',
        message: error.response.data.message,
        action1: { label: 'OK' }
      });
    })
  },
  async fetchCurrentUserDetails ({ commit, dispatch }) {
    await axios
    .get(config.me_data + `?lang=${i18n.locale}`)
    .then(response => {
      commit('setCurrentUserDetails', response.data.data.userData)
    })
    .catch(error => {
      dispatch('spawnNotification', {
        type: 'danger',
        message: error.response.data.message,
        action1: { label: 'OK' }
      });
    })
  },
  async updateCurrentUser ({ commit, dispatch }, data) {
    await axios
    .patch(config.me, data)
    .then(response => {
      console.log(response)
      commit('setCurrentUser', response.data.data.user)
    })
    .catch(error => {
      dispatch('spawnNotification', {
        type: 'danger',
        message: error.response.data.message,
        action1: { label: 'OK' }
      });
    })
  },
  async updateCurrentUserDetails ({ commit, dispatch }, data) {
    await axios
    .post(config.me_data + `?lang=${i18n.locale}`, data)
    .then(response => {
      console.log(response)
      commit('setCurrentUserDetails', response.data.data.userData)
    })
    .catch(error => {
      dispatch('spawnNotification', {
        type: 'danger',
        message: error.response.data.message,
        action1: { label: 'OK' }
      });
    })
  },
  async updateUserImage({ commit, dispatch }, image) {
    await axios
    .patch(config.picture, image)
    .then(response => {
      commit('setCurrentUser', response.data.data.user)
      dispatch('spawnNotification', {
        type: 'success',
        message: 'Profile picture updated successfully.',
        action1: { label: 'OK' }
      });
    })
    .catch(error => {
      dispatch('spawnNotification', {
        type: 'danger',
        message: error.response.data.message,
        action1: { label: 'OK' }
      });
    })
  },
  async deleteUserImage({ commit }) {
    const response = await axios
    .delete(config.picture)
  },
  async fetchUsersAdmin ({ commit, dispatch }) {
    await axios
    .get(config.all_admin)
    .then(response => {
      console.log(response)
      commit('setUsersAdmin', response.data.data.users)
    })
    .catch(error => {
      dispatch('spawnNotification', {
        type: 'danger',
        message: error.response.data.message,
        action1: { label: 'OK' }
      });
    })
  },
  async updateUserDetails ({ commit, dispatch }, data) {
    await axios
    .patch(config.id.replace('{{id}}', data.user), data.data)
    .then(response => {
      console.log(response)
      dispatch('fetchUsersAdmin')
    })
    .catch(error => {
      dispatch('spawnNotification', {
        type: 'danger',
        message: error.response.data.message,
        action1: { label: 'OK' }
      });
    })
  }
}
const mutations = {
  setCurrentUser: (state, user) => state.user = user,
  setCurrentUserDetails: (state, userDetails) => state.userDetails = userDetails,
  setUsersAdmin: (state, users) => state.usersAdmin = users,
}

export default {
  state, getters, actions, mutations
}