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
      post: {},
      user: user,
      status: "",
      loading: true
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
    isLoggedIn: state => !!state.user
  },
  mutations: {
    SET_POSTS(state, posts) {
      state.posts = posts;
    },
    SET_POST(state, post) {
      state.post = post;
      state.loading = false;
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
    getPost({ commit }, { postId }) {
      axios.get("http://localhost:3000/api/posts/" + postId)
      .then(response => {
        commit("SET_POST", response.data.post);
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
    },
    newcomment({ commit }, comment) {
      return new Promise((resolve, reject) => {
        commit("AUTH_REQUEST");
        axios.post("http://localhost:3000/api/comment", comment)
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
