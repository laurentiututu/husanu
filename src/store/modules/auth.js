import config from '../resources/endpoints/auth.json'
import axios from 'axios'
import { vm } from '@/main'
import i18n from '../../i18n'

const state = {
  userData: {}
}
const getters = {
  getUserData: state => state.userData
}
const actions = {
  async fetchRegister({ dispatch }, credentials) {
    await axios
    .post(config.signup, credentials)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
  },
  async resendActivationUrl({ dispatch }, credentials) {
    await axios
    .post(config.resend_activation, credentials)
    .then(response => {
      dispatch('spawnNotification', {
        type: 'success',
        message: 'Activation link has been sent successfully.',
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
  async updatePassword({ dispatch }, credentials) {
    await axios
    .patch(config.pass_update, credentials)
    .then(response => {
      dispatch('spawnNotification', {
        type: 'success',
        message: response.data.message,
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
  async fetchLogin({ commit, dispatch }, credentials) {
    await axios
    .post(config.login, credentials)
    .then(response => {
      let user = {
        firstName: response.data.data.user.firstName,
        lastName: response.data.data.user.lastName,
        email: response.data.data.user.email,
        role: response.data.data.user.role
      }
      localStorage.setItem('token', response.data.data.accessToken)
      localStorage.setItem('refresh_token', response.data.data.refreshToken)
      localStorage.setItem('user', JSON.stringify(user))
      commit('setUserData', response.data.data.user)
      dispatch('spawnNotification', {
        type: 'success',
        message: 'You\'ve logged in successfully.',
        action1: { label: 'OK' }
      });
      vm.$router.push('/')
    })
    .catch(error => {
      dispatch('spawnNotification', {
        type: 'danger',
        message: error.response.data.message,
        action1: { label: 'OK' }
      });
    })
  },
  async fetchForgotPassword({ commit, dispatch }, credentials) {
    await axios
    .post(config.pass_forgot, credentials)
    .then(response => {
      dispatch('spawnNotification', {
        type: 'success',
        message: response.data.message,
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
  async fetchResetPassword({ commit, dispatch }, credentials) {
    await axios
    .patch(config.pass_reset, credentials)
    .then(response => {
      dispatch('spawnNotification', {
        type: 'success',
        message: 'Password changed successfully.',
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
}
const mutations = {
  setUserData: (state, data) => state.userData = data
}

export default {
  state, getters, actions, mutations
}