import { createStore } from 'vuex'
import axios from 'axios'

//localStorage.clear();
const user = JSON.parse(localStorage.getItem("user"));
if (user) { authHeader() }

export function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common['Authorization'] = "Bearer " + user.token;
}

export default createStore({
  state() {
    return {
      posts: [],
      user: user,
      status: ""
    }
  },
  getters: {
    posts: state => {
      return state.posts;
    },
    user: state => {
      return state.user.user;
    },
    isLoggedIn: state => !!state.user
  },
  mutations: {
    SET_POSTS(state, posts) {
      state.posts = posts;
    },
    AUTH_REQUEST(state) {
      state.status = "pending";
    },
    AUTH_SUCCESS(state, user) {
      state.user = user;
      state.status = "success";
    },
    AUTH_ERROR(state) {
      state.status = "error";
    },
    LOGOUT(state) {
      state.status = "";
      state.user = null;
    }
  },
  actions: {
    getPosts({ commit }) {
      axios.get("http://localhost:3000/api/posts")
      .then(response => {
        commit("SET_POSTS", response.data.posts)
      })
    },
    signup({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("AUTH_REQUEST");
        axios.post("http://localhost:3000/api/user/signup", {
          email: user.email,
          password: user.password,
          firstName: user.firstName,
          lastName: user.lastName
        })
        .then((response) => {
          const user = response.data;
          localStorage.setItem("user", JSON.stringify(user));
          authHeader();
          commit("AUTH_SUCCESS", user);
          resolve(response);
        })
        .catch((error) => {
          commit("AUTH_ERROR", error);
          reject(error);
        })
      })
    },
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("AUTH_REQUEST");
        axios.post("http://localhost:3000/api/user/login", {
          email: user.email,
          password: user.password
        })
        .then((response) => {
          const user = response.data;
          localStorage.setItem("user", JSON.stringify(user));
          authHeader();
          commit("AUTH_SUCCESS", user);
          resolve(response);
        })
        .catch((error) => {
          commit("AUTH_ERROR", error);
          reject(error);
        })
      })
    },
    logout({ commit }) {
      commit("LOGOUT");
      localStorage.removeItem("user");
    },
    newpost({ commit }, post) {
      return new Promise((resolve, reject) => {
        commit("AUTH_REQUEST");
        axios.post("http://localhost:3000/api/posts", post, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        })
      })
    },
    deletePost({ commit }, post) {
      return new Promise((resolve, reject) => {
        commit("AUTH_REQUEST");
        axios.delete("http://localhost:3000/api/posts/" + post.id, {
          data: {
            userId: post.userId
          }
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        })
      })
    }
  },
  modules: {
  }
})
