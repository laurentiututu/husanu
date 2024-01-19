import config from '../resources/endpoints/blog.json'
import axios from 'axios'
import { vm } from '@/main'

const state = {
  articles_admin: [],
  articles: [],
  currentImage: {},
  totalPages: 0,
  currentPage: 0,
  currentArticle: {}
}
const getters = {
  getArticlesAdmin: state => state.articles_admin,
  getArticles: state => state.articles,
  getCurrentImage: state => state.currentImage,
  totalPages: state => state.totalPages,
  currentPage: state => state.currentPage,
  getCurrentArticle: state => state.currentArticle
}
const actions = {
  async fetchArticle ({ commit, dispatch }, slug) {
    await axios
    .get(config.article.article_slug.replace('{{slug}}', slug))
    .then(response => {
      console.log(response)
      commit('setCurrentArticle', response.data.data.article)
    })
    .catch(error => {
      console.log(error)
    })
  },
  async fetchArticlesAdmin ({ commit, dispatch }, query) {
    await axios
    .get(config.article.all_admin
      + `?page=${query.page}&limit=6`
      + `${query.category !== 'All' ? `&category=${query.category}` : ``}`
    )
    .then(response => {
      commit('setArticlesAdmin', response.data.data.articles)
      commit('setTotalPages', response.data.data.pages)
      commit('setCurrentPage', response.data.data.currentPage)
    })
    .catch(error => {
      console.log(error)
    })
  },
  async fetchArticles ({ commit, dispatch }, query) {
    await axios
    .get(config.article.all_public
      + `?page=${query.page}&limit=6`
      + `${query.category !== 'All' ? `&category=${query.category}` : ``}`
    )
    .then(response => {
      commit('setArticles', response.data.data.articles)
      commit('setTotalPages', response.data.data.pages)
      commit('setCurrentPage', response.data.data.currentPage)
    })
    .catch(error => {
      console.log(error)
    })
  },
  async addArticle ({ commit, dispatch }, data) {
    console.log(data)
    await axios
    .post(config.article.new, data.article)
    .then(async response => {
      console.log(response)
      await dispatch('addCover', { id: response.data.data.article.id, cover: data.cover})
      dispatch('fetchCategoriesAdmin')
      dispatch('fetchArticlesAdmin')
    })
    .catch(error => {
      console.log(error)
    })
  },
  async removeArticle({ dispatch }, data) {
    await axios
    .delete(config.article.id.replace('{{id}}', data))
    .then(() => {
      console.log('Post deleted')
      dispatch('fetchCategoriesAdmin')
      dispatch('fetchArticlesAdmin', { 
        category: vm.$route.query.category ||'All',
        page: vm.$route.query.page || 1 
      })
    })
    .catch(error => {
      console.log(error)
    })
  },
  async addCover ({ commit, dispatch }, data) {
    await axios
    .put(config.article.cover.replace('{{id}}', data.id), data.cover)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
  },
  async addImage ({ commit, dispatch }, data) {
    await axios
    .put(config.file, data)
    .then(response => {
      console.log(response)
      commit('setCurrentImage', response.data.data.file)
    })
    .catch(error => {
      console.log(error)
    })
  },
  async deleteImage ({ commit, dispatch}, data) {
    await axios
    .delete(config.file + `/${data}`)
    .then(() => {
      commit('setCurrentImage', {})
    })
    .catch(error => {
      console.log(error)
    })
  }
}
const mutations = {
  setArticlesAdmin: (state, articles) => state.articles_admin = articles,
  setArticles: (state, articles) => state.articles = articles,
  setTotalPages: (state, pages) => state.totalPages = pages,
  setCurrentImage: (state, image) => state.currentImage = image,
  setCurrentPage: (state, page) => state.currentPage = page,
  setCurrentArticle: (state, article) => state.currentArticle = article
}

export default {
  state, getters, actions, mutations
}