<template>
  <div class="account">
    <!--Account Form-->
    <form
      class="form"
      @submit.prevent="updateUser"
      enctype="multipart/form-data"
      action="index.html"
      method="post"
    >
      <FormItem>
        <template #title>Paramètres du compte</template>
        <template #fields>
          <!--Avatar-->
          <div class="form__field">
            <UserAvatar
              v-if="isLoggedIn"
              :user="user"
              :size="'100px'"
            ></UserAvatar>
            <label class="form__label-file" for="file">Modifier l'avatar</label>
            <input class="hidden" type="file" id="file" />
          </div>
          <!--First Name-->
          <div class="form__field">
            <label class="form__label">Prénom</label>
            <input
              class="form__input"
              type="text"
              name="firstName"
              ref="firstName"
              v-model="firstName"
              readonly
              required
            />
            <!--Edit Button-->
            <button
              @click="edit"
              id="edit-firstName"
              class="form__button form__button--mini"
            >
              <i class="fas fa-pen"></i>
            </button>
          </div>
          <!--Last Name-->
          <div class="form__field">
            <label class="form__label">Nom</label>
            <input
              class="form__input"
              type="text"
              name="lastName"
              ref="lastName"
              v-model="lastName"
              readonly
              required
            />
            <!--Edit Button-->
            <button
              @click="edit"
              id="edit-lastName"
              class="form__button form__button--mini"
            >
              <i class="fas fa-pen"></i>
            </button>
          </div>
        </template>
        <!--Submit Button-->
        <template #button>Mettre à jour les données du compte</template>
      </FormItem>
      <!--Remove Account Button-->
      <button class="form__button form__button--delete">
        Supprimer le compte
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FormItem from "@/components/FormItem.vue";
import UserAvatar from "@/components/UserAvatar.vue";

export default {
  name: "Account",
  data() {
    return {
      firstName: this.$store.getters.user.firstName,
      lastName: this.$store.getters.user.lastName,
      file: ""
    };
  },
  components: {
    FormItem,
    UserAvatar
  },
  computed: mapGetters(["user", "isLoggedIn"]),
  methods: {
    edit() {
      const button = event.currentTarget;
      const input = button.id.split("-")[1];
      this.$refs[input].removeAttribute("readonly");
      this.$refs[input].select();
      button.classList.add("hidden");
    }
  }
};
</script>

<style lang="scss">
// Importing the global css file
@import "@/assets/global.scss";
</style>
