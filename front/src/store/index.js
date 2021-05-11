import { createStore } from 'vuex'
import axios from 'axios'

//localStorage.clear();
const user = JSON.parse(localStorage.getItem("user"));
if (user) { authHeader(user) }

export function authHeader(user) {
  axios.defaults.headers.common['Authorization'] = "Bearer " + user.token;
}

export default createStore({
  state() {
    return {
      posts: [],
      post: {},
      user: user,
      loading: false,
      error: ""
    }
  },
  getters: {
    posts: state => {
      return state.posts;
    },
    post: state => {
      return state.post;
    },
    user: state => {
      return state.user.user;
    },
    loading: state => {
      return state.loading;
    },
    error: state => {
      if (state.error) {
        return state.error;
      }
    },
    isLoggedIn: state => !!state.user
  },
  mutations: {
    SET_POSTS(state, posts) {
      state.posts = posts;
      state.loading = false;
    },
    SET_POST(state, post) {
      state.post = post;
      state.loading = false;
    },
    AUTH_SUCCESS(state, user) {
      localStorage.setItem("user", JSON.stringify(user));
      authHeader(user);
      state.user = user;
      state.loading = false;
      state.error = "";
    },
    LOGOUT(state) {
      state.user = null;
    },
    SUCCESS(state) {
      state.loading = false;
      state.error = "";
    },
    REQUEST(state) {
      state.loading = true;
    },
    ERROR(state, error) {
      state.error = "Erreur : " + error;
    },
    RESET_ERROR(state) {
      state.error = "";
    }
  },
  actions: {
    // User
    signup({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("REQUEST");
        axios.post("http://localhost:3000/api/user/signup", {
          email: user.email,
          password: user.password,
          firstName: user.firstName,
          lastName: user.lastName
        })
        .then((response) => {
          commit("AUTH_SUCCESS", response.data);
          resolve(response);
        })
        .catch((error) => {
          commit("ERROR", error.response.data.error);
          reject(error);
        })
      })
    },
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("REQUEST");
        axios.post("http://localhost:3000/api/user/login", {
          email: user.email,
          password: user.password
        })
        .then((response) => {
          commit("AUTH_SUCCESS", response.data);
          resolve(response);
        })
        .catch((error) => {
          commit("ERROR", error.response.data.error);
          reject(error);
        })
      })
    },
    logout({ commit }) {
      commit("LOGOUT");
      localStorage.removeItem("user");
    },
    editUser({ commit }, [ user, id ]) {
      return new Promise((resolve, reject) => {
        commit("REQUEST");
        axios.put("http://localhost:3000/api/user/" + id, user, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(() => {
          commit("REQUEST");
          axios.get("http://localhost:3000/api/user/" + id)
          .then(response => {
            const token = JSON.parse(localStorage.getItem("user")).token;
            const user = {
              ...response.data,
              token: token
            }
            commit("AUTH_SUCCESS", user);
            resolve(response);
          })
        })
        .catch((error) => {
          commit("ERROR", error.response.data.error);
          reject(error);
        })
      })
    },
    deleteUser({ commit }, userId) {
      return new Promise((resolve, reject) => {
        commit("REQUEST");
        axios.delete("http://localhost:3000/api/user/" + userId)
        .then((response) => {
          commit("SUCCESS");
          this.dispatch("logout");
          resolve(response);
        })
        .catch((error) => {
          commit("ERROR", error.response.data.error);
          reject(error);
        })
      })
    },
    // Posts
    getPosts({ commit }) {
      commit("REQUEST");
      axios.get("http://localhost:3000/api/posts")
      .then(response => {
        commit("SET_POSTS", response.data.posts)
      })
    },
    getPost({ commit }, { postId }) {
      commit("REQUEST");
      axios.get("http://localhost:3000/api/posts/" + postId)
      .then(response => {
        commit("SET_POST", response.data.post);
      })
    },
    newpost({ commit }, post) {
      return new Promise((resolve, reject) => {
        commit("REQUEST");
        axios.post("http://localhost:3000/api/posts", post, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          commit("SUCCESS");
          resolve(response);
        })
        .catch((error) => {
          commit("ERROR", error.response.data.error);
          reject(error);
        })
      })
    },
    editPost({ commit }, [ post, id ]) {
      return new Promise((resolve, reject) => {
        commit("REQUEST");
        axios.put("http://localhost:3000/api/posts/" + id, post, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          commit("SUCCESS");
          resolve(response);
        })
        .catch((error) => {
          commit("ERROR", error.response.data.error);
          reject(error);
        })
      })
    },
    deletePost({ commit }, post) {
      return new Promise((resolve, reject) => {
        commit("REQUEST");
        axios.delete("http://localhost:3000/api/posts/" + post.id, {
          data: {
            userId: post.userId
          }
        })
        .then((response) => {
          commit("SUCCESS");
          resolve(response);
        })
        .catch((error) => {
          commit("ERROR", error.response.data.error);
          reject(error);
        })
      })
    },
    // Comments
    newcomment({ commit }, comment) {
      return new Promise((resolve, reject) => {
        commit("REQUEST");
        axios.post("http://localhost:3000/api/comment", comment)
        .then((response) => {
          commit("SUCCESS");
          resolve(response);
        })
        .catch((error) => {
          commit("ERROR", error.response.data.error);
          reject(error);
        })
      })
    },
    editComment({ commit }, [ comment, id ]) {
      return new Promise((resolve, reject) => {
        commit("REQUEST");
        axios.put("http://localhost:3000/api/comment/" + id, comment)
        .then((response) => {
          commit("SUCCESS");
          resolve(response);
        })
        .catch((error) => {
          commit("ERROR", error.response.data.error);
          reject(error);
        })
      })
    },
    deleteComment({ commit }, comment) {
      return new Promise((resolve, reject) => {
        commit("REQUEST");
        axios.delete("http://localhost:3000/api/comment/" + comment.id, {
          data: {
            userId: comment.userId
          }
        })
        .then((response) => {
          commit("SUCCESS");
          resolve(response);
        })
        .catch((error) => {
          commit("ERROR", error.response.data.error);
          reject(error);
        })
      })
    },
    // Errors
    newError({ commit }, error) {
      commit("ERROR", error);
    },
    resetError({ commit }) {
      commit("RESET_ERROR");
    }
  },
  modules: {
  }
})
