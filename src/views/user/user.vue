<template>
  <div class="user">
    <div v-if="mode === 'add'" class="title">Add user</div>
    <div v-else-if="mode === 'update'" class="title">Update user</div>
    <div v-if="loaded" class="content">
      <div class="box form">
        <div class="form-elements">
          <div class="form-element">
            <div class="element-title">First Name</div>
            <input v-model="user.first_name" />
          </div>
          <div class="form-element">
            <div class="element-title">Last Name</div>
            <input v-model="user.last_name" />
          </div>
        </div>
        <div class="buttons">
          <button v-if="mode === 'add'" @click="save()">Add user</button>
          <button v-else-if="mode === 'update'" @click="save()">
            Update Details
          </button>
        </div>
      </div>
      <div class="box avatar">
        <img :src="user.avatar" />
        <button @click="selectFile()">
          <font-awesome-icon :icon="['fas', 'camera']" /> Change photo
        </button>
        <input
          class="image-input"
          type="file"
          ref="fileInput"
          accept="image/*"
          @change="selectedFile()"
        />
      </div>
    </div>
    <empty v-else />
  </div>
</template>

<style scoped src="./user.scss" />

<script setup lang="ts">
import { UserResponse } from "@/types/user-response";
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import empty from "@/components/empty/empty.vue";
import defaultAvatar from "@/assets/avatar-blank.png";

type Modes = "add" | "update";

const route = useRoute();
const router = useRouter();
const user = reactive({
  first_name: "",
  last_name: "",
  avatar: defaultAvatar,
});
const mode = ref<Modes>("add");
const fileInput = ref();
const uploadFile = ref<Blob | null>(null);
const loaded = ref(false);

onMounted(async () => {
  const id = parseInt(route.params.id as string);
  if (id) {
    const response = await fetch(`https://reqres.in/api/users/${id}`);

    if (response.ok) {
      const data: UserResponse = await response.json();
      user.first_name = data.data.first_name;
      user.last_name = data.data.last_name;
      user.avatar = data.data.avatar;
    }

    mode.value = "update";
  }
  loaded.value = true;
});

const selectFile = () => {
  fileInput.value.click();
};

const selectedFile = async () => {
  uploadFile.value = fileInput.value.files[0];
  if (!uploadFile.value) return;
  user.avatar = await imageToBASE64(uploadFile.value);
};

const save = async () => {
  const { first_name, last_name } = user;

  // Tutaj teoretyczne można byłoby przesyłać avatar, ale api tego nie obsługuje,
  // Jezeli prześle obrazek dostaje błąd
  // if (uploadFile.value) {
  //   const formData = new FormData();
  //   formData.append("avatar", uploadFile.value);
  // }

  let response;
  if (mode.value === "add") {
    response = await fetch(`https://reqres.in/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ first_name, last_name }),
    });
  } else if (mode.value === "update") {
    const id = parseInt(route.params.id as string);
    response = await fetch(`https://reqres.in/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ first_name, last_name }),
    });
  }
  if (response) {
    if (response.ok) {
      router.push({ name: "users" });
    }
  }
};

const imageToBASE64 = async (file: Blob): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.readAsDataURL(file);
  });
};
</script>
