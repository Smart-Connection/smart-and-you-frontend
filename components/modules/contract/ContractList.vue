<script lang="ts" setup>
import { getContracts } from "~/services/ContractService";
import { User } from "~/types/entity/User";

// Composables
const user = useState<User>("user");

// TODO: Get calendar with role
const {
  loading: loadingSessions,
  data: sessions,
  execute: getSessions,
} = useAsyncData({
  promise: () =>
    getContracts({
      status: "CLOSE",
    }),
});
</script>
<template>
  <ui-page-header title="Prestations">
    <nuxt-link to="/modules/contract/create">
      <ui-button> Ajouter </ui-button>
    </nuxt-link>
  </ui-page-header>
  <ui-calendar />
</template>
