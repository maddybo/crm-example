<template>
  <table class="table">
    <tr class="row row-header">
      <th class="cell cell-header avatar-cell"></th>
      <th class="cell cell-header name-cell">Full Name</th>
      <th class="cell cell-header actions-cell">Action</th>
    </tr>
    <tr class="row row-data" v-for="user in users" :key="user.id">
      <td class="cell">
        <img :src="user.avatar" />
      </td>
      <td class="cell">{{ user.first_name }} {{ user.last_name }}</td>
      <td class="cell">
        <div class="actions">
          <router-link :to="`/user/${user.id}`" class="action-button">
            <font-awesome-icon :icon="['fas', 'pen-to-square']" />
          </router-link>
          <div class="action-button" @click="remove(user.id)">
            <font-awesome-icon :icon="['fas', 'trash']" />
          </div>
        </div>
      </td>
    </tr>
  </table>
</template>

<style scoped src="./user-table.scss" />

<script setup lang="ts">
import { User } from "@/types/user.ts";
import { PropType } from "vue";

const emit = defineEmits(["refresh"]);
defineProps({
  users: {
    type: Array as PropType<User[]>,
  },
});

const remove = async (id: number) => {
  await fetch(`https://reqres.in/api/users/${id}`, {
    method: "DELETE",
  });
  emit("refresh");
};
</script>
