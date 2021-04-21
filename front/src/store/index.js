import { createStore } from 'vuex'
import axios from 'axios'

const user = JSON.parse(localStorage.getItem("user"));
console.log(user);

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
    }
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
      state.user = null;
      state.loggedIn = false;
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
          commit("AUTH_SUCCESS", user);
          resolve(response);
        })
        .catch((error) => {
          commit("AUTH_ERROR", error);
          reject(error);
        })
      })
    }
  },
  modules: {
  }
})
