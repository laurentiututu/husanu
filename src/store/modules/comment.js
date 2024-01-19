import config from '../resources/endpoints/blog.json'
import axios from 'axios'

const state = {
  commentsAdmin: [],
  comments: []
}
const getters = {
  getCommentsAdmin: state => state.commentsAdmin,
  getComments: state => state.comments,
}
const actions = {
  async addComment ({ dispatch }, data) {
    await axios
    .post(config.comment.new, data)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
  },
  async fetchCommentsAdmin ({ commit, dispatch }) {
    await axios
    .get(config.comment.all_admin)
    .then(response => {
      commit('setCommentsAdmin', response.data.data.comments)
    })
    .catch(error => {
      console.log(error)
    })
  },
  async fetchComments ({ commit, dispatch }, data) {
    await axios
    .get(config.comment.all_public + `?${data.type}=${data.content}`)
    .then(response => {
      data.type !== 'parent' 
      ? commit('setComments', response.data.data.comments)
      : commit('setReplies', { data: response.data.data.comments, id: data.content } )
    })
    .catch(error => {
      console.log(error)
    })
  },
  async updateComment ({ commit, dispatch }, data) {
    await axios
    .patch(config.comment.status.replace('{{id}}', data.id).replace('{{status}}', data.status))
    .then(response => {
      dispatch('fetchCommentsAdmin')
    })
    .catch(error => {
      console.log(error)
    })
  }
}
const mutations = {
  setCommentsAdmin: (state, comments) => state.commentsAdmin = comments,
  setComments: (state, comments) => state.comments = comments,
  setReplies: (state, replies) => {
    const foundItem = state.comments.findIndex(item => item._id == replies.id)
    state.comments[foundItem].replies = replies.data
  }
}

export default {
  state, getters, actions, mutations
}