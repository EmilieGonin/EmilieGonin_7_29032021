<template>
  <div class="account" v-if="isLoggedIn">
    <!--Account Form-->
    <form
      class="form"
      :class="{ 'form--mobile': onMobile }"
      @submit.prevent="editUser"
      enctype="multipart/form-data"
      action="index.html"
      method="post"
    >
      <FormItem>
        <template #title>Paramètres du compte</template>
        <template #fields>
          <!--Avatar Container-->
          <div class="form__field">
            <div class="account__file-buttons">
              <!--Undo Upload File Button-->
              <div
                class="account__button"
                @click="removePreview()"
                v-if="preview && user.avatar"
              >
                <i class="fas fa-undo-alt fa-fw"></i>
              </div>
              <!--Delete Avatar Button-->
              <div
                class="account__button"
                @click="removeFile()"
                v-if="(file || user.avatar) && !deleteFile"
              >
                <i class="fas fa-times fa-fw"></i>
              </div>
            </div>
            <!--Avatar-->
            <UserAvatar
              v-if="isLoggedIn && !preview && !deleteFile"
              :user="user"
              :size="'100px'"
            ></UserAvatar>
            <!--Default Avatar if current removed-->
            <UserAvatar
              v-else-if="isLoggedIn && !preview && deleteFile"
              :user="user"
              :size="'100px'"
              :defaultAvatar="true"
            ></UserAvatar>
            <!--Preview-->
            <img
              class="account__preview"
              :src="preview"
              v-else-if="isLoggedIn && preview"
              alt=""
            />
            <label class="form__label-file" for="file">Modifier l'avatar</label>
            <input
              class="hidden"
              type="file"
              id="file"
              ref="file"
              @change="handleFile()"
              accept="image/png, image/jpeg"
            />
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
            <!--First Name Edit Button-->
            <button
              @click="firstNameEditable = !firstNameEditable"
              class="form__button form__button--mini"
              type="button"
            >
              <i
                :class="{
                  'fas fa-pen': !firstNameEditable,
                  'fas fa-times': firstNameEditable
                }"
              ></i>
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
            <!--Last Name Edit Button-->
            <button
              @click="lastNameEditable = !lastNameEditable"
              class="form__button form__button--mini"
              type="button"
            >
              <i
                :class="{
                  'fas fa-pen': !lastNameEditable,
                  'fas fa-times': lastNameEditable
                }"
              ></i>
            </button>
          </div>
        </template>
        <!--Submit Button-->
        <template #button>Mettre à jour les données du compte</template>
      </FormItem>
      <!--Remove Account Button-->
      <button
        class="form__button form__button--delete"
        @click="deleteUser()"
        type="button"
      >
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
      onMobile: false,
      firstName: this.$store.getters.user.firstName,
      lastName: this.$store.getters.user.lastName,
      firstNameEditable: false,
      lastNameEditable: false,
      file: "",
      preview: "",
      deleteFile: false
    };
  },
  components: {
    FormItem,
    UserAvatar
  },
  computed: mapGetters(["user", "isLoggedIn", "error", "confirmation"]),
  watch: {
    firstNameEditable(editable) {
      if (editable) {
        this.$refs.firstName.removeAttribute("readonly");
        this.$refs.firstName.select();
      } else {
        this.$refs.firstName.setAttribute("readonly", true);
      }
    },
    lastNameEditable(editable) {
      if (editable) {
        this.$refs.lastName.removeAttribute("readonly");
        this.$refs.lastName.select();
      } else {
        this.$refs.lastName.setAttribute("readonly", true);
      }
    }
  },
  mounted() {
    this.checkDevice();
    window.addEventListener("resize", this.checkDevice);
  },
  methods: {
    checkDevice() {
      this.onMobile = window.innerWidth < 700;
    },
    handleFile() {
      this.file = this.$refs.file.files[0];
      this.preview = URL.createObjectURL(this.file);
      event.target.value = "";
      this.deleteFile = false;
    },
    removePreview() {
      this.file = "";
      this.preview = "";
    },
    removeFile() {
      this.file = "";
      this.preview = "";
      this.deleteFile = true;
    },
    deleteUser() {
      if (confirm("Voulez-vous vraiment supprimer votre compte ?")) {
        this.$store
          .dispatch("deleteUser", this.user.id)
          .then(() => this.$router.push("/login"))
          .catch(() =>
            console.error(
              "Une erreur s'est produite pendant la suppression de l'utilisateur."
            )
          );
      }
    },
    editUser() {
      const user = {
        firstName: this.firstName,
        lastName: this.lastName
      };
      const formData = new FormData();
      if (this.deleteFile) {
        user.deletefile = true;
        user.avatar = "";
      } else if (this.file) {
        formData.append("file", this.file);
      }
      formData.append("user", JSON.stringify(user));
      this.$store
        .dispatch("editUser", [formData, this.user.id])
        .then(() => {
          this.file = "";
          this.preview = "";
          this.firstNameEditable = false;
          this.lastNameEditable = false;
          this.$store.dispatch(
            "newConfirmation",
            "Les données ont bien été modifiées !"
          );
        })
        .catch(() =>
          console.error(
            "Une erreur s'est produite pendant la modification de l'utilisateur."
          )
        );
    }
  }
};
</script>

<style lang="scss">
// Importing the global css file
@import "@/assets/global.scss";

.account {
  &__file-buttons {
    display: flex;
    flex-direction: column;
    gap: 3px;
    position: absolute;
    top: 25px;
    transform: translateX(65px);
  }
  &__button {
    padding: 5px;
    border-radius: 20px;
    cursor: pointer;
    background: $primary-color;
    color: white;
    border: none;
    font-size: $font-mini;
  }
  &__preview {
    width: 100px;
    height: 100px;
    border-radius: 100px;
    object-fit: cover;
  }
}
</style>
