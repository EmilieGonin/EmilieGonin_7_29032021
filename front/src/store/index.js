import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    posts: []
  },
  getters: {
    posts: state => {
      return state.posts;
    }
  },
  mutations: {
    SET_POSTS(state, posts) {
      state.posts = posts
    }
  },
  actions: {
    getPosts({ commit }) {
      axios.get("http://localhost:3000/api/posts")
      .then(response => {
        commit("SET_POSTS", response.data.posts)
      })
    }
  },
  modules: {
  }
})
