import config from '../resources/endpoints/blog.json'
import axios from 'axios'

const state = {
  categoriesAdmin: [],
  categories: []
}
const getters = {
  getCategoriesAdmin: state => state.categoriesAdmin,
  getCategories: state => state.categories
}
const actions = {
  async fetchCategoriesAdmin ({ commit, dispatch }) {
    await axios
    .get(config.category.all_admin)
    .then(response => {
      commit('setCategoriesAdmin', response.data.data.categories)
    })
    .catch(error => {
      console.log(error)
    })
  },
  async fetchCategories ({ commit, dispatch }) {
    await axios
    .get(config.category.all_public)
    .then(response => {
      commit('setCategories', response.data.data.categories)
    })
    .catch(error => {
      console.log(error)
    })
  },
  async addCategory ({ commit, dispatch }, data) {
    await axios
    .post(config.category.new, data)
    .then(response => {
      commit('updateCategories', response.data.data.category)
    })
    .catch(error => {
      console.log(error)
    })
  },
  async updateCategory ({ commit, dispatch }, data) {
    await axios
    .patch(config.category.id.replace('{{id}}', data.id), data.status)    
    .then(response => {
      dispatch('fetchCategoriesAdmin')
    })
    .catch(error => {
      console.log(error)
    })
  }
}
const mutations = {
  setCategoriesAdmin: (state, categories) => state.categoriesAdmin = categories,
  setCategories: (state, categories) => state.categories = categories,
  updateCategories: (state, category) => state.categoriesAdmin.unshift(category)
}

export default {
  state, getters, actions, mutations
}