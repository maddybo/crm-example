<template>
  <div class="user-list">
    <div class="title">User list</div>
    <div class="content">
      <div class="top">
        <m-search />
        <button class="add-user" @click="createUser()">
          <font-awesome-icon :icon="['fas', 'plus']" /> Add user
        </button>
      </div>
      <user-table
        v-if="loaded"
        :users="users?.data"
        @refresh="fetchPage(users?.page || 1)"
      />
      <empty v-else />
    </div>

    <div class="pagination">
      <div class="page" @click="prevPage()">«</div>
      <div
        v-for="page in users?.total_pages"
        :key="page"
        class="page"
        :class="{ active: page === users?.page }"
        @click="fetchPage(page)"
      >
        {{ page }}
      </div>
      <div class="page" @click="nextPage()">»</div>
    </div>
  </div>
</template>

<style scoped src="./user-list.scss" />

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { UsersResponse } from "@/types/users-response";
import { useRoute, useRouter } from "vue-router";
import MSearch from "@/components/m-search/m-search.vue";
import UserTable from "./components/user-table/user-table.vue";
import empty from "@/components/empty/empty.vue";

const users = ref<UsersResponse>();
const loaded = ref(false);

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  const page = parseInt(route.query.page as string);
  fetchPage(page ? page : 1);
});

const fetchPage = async (page: number) => {
  const response = await fetch(`https://reqres.in/api/users?page=${page}`);

  if (response.ok) {
    const data: UsersResponse = await response.json();

    users.value = data;
    router.replace({ query: { page } });
  }
  loaded.value = true;
};

const nextPage = () => {
  if (!users.value) return;
  if (users.value.page < users.value.total_pages) {
    fetchPage(users.value.page + 1);
  }
};

const prevPage = () => {
  if (!users.value) return;
  if (users.value.page > 1) {
    fetchPage(users.value.page - 1);
  }
};

const createUser = () => {
  router.push({ name: "user" });
};
</script>
