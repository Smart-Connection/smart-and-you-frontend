<script lang="ts" setup>
import * as yup from "yup";
import { useForm } from "vee-validate";
import { getRoleList } from "~/helpers/role";
import {
  resendEmail,
  getUser,
  editUser,
  deleteUser,
} from "~/services/UserService";
import { User, EditableUser } from "~/types/entity/User";

// Form
const schema = yup.object().shape({
  email: yup
    .string()
    .email("L'email n'est pas valide")
    .required("L'email est requis"),
  role: yup.string().required("Le rôle est requis"),
  firstname: yup.string().required("Le prénom est requis"),
  lastname: yup.string().required("Le nom est requis"),
});

// Composable
const router = useRouter();
const route = useRoute();
const { data: user, loading: userLoading, execute } = getUser();
const { handleSubmit, resetForm } = useForm<EditableUser>({
  validationSchema: schema,
});

// Data
const authUser = useState<User>("user");
const loading = ref<boolean>(false);
const pageLoading = ref<boolean>(true);

// Init
if (route.params.id) {
  await execute(route.params.id as string);
  if (user.value) {
    resetForm({ values: user.value });
  } else {
    router.push("/modules/user");
  }
}

// Breadcrumbs
const breadcrumbs = computed(() => [
  {
    label: "List des utilisateurs",
    path: "/modules/user",
  },
  {
    label: user.value?.firstname
      ? `${user.value.firstname} ${user.value.lastname}`
      : "...",
    path: user.value?.id
      ? `/modules/user/${user.value.id}`
      : "/modules/user/create",
  },
]);

// Computed
const disabled = computed(() => {
  if (authUser.value.role === "SUPER_ADMIN") return false;
  else if (
    authUser.value.role === "ADMIN" &&
    user.value?.role !== "SUPER_ADMIN"
  )
    return false;
  return true;
});

// Functions
const submit = handleSubmit(async (values) => {
  loading.value = true;
  if (user.value) {
    const { error } = await editUser(user.value.id, values);
    if (!error) router.push("/modules/user");
  }
  loading.value = false;
});

const deleteModal = async () => {
  if (user.value) {
    const { error } = await deleteUser(user.value.id);
    if (!error) router.push("/modules/user");
  }
};
</script>
<template>
  <ui-page-header title="Utilisateurs" :breadcrumbs="breadcrumbs" />
  <p v-if="!pageLoading">Charge</p>
  <div v-if="user" class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <ui-info
      v-if="user.account_creation_token"
      class="col-span-2"
      type="alert"
      title="Attention"
      description="Cet utilisateur n'a pas finalisé sont inscription. "
    >
      <ui-button color="secondary" @click="resendEmail(user.id)">
        Renvoyer l'invitation
      </ui-button>
    </ui-info>
    <ui-card title="Informations personnel" v-if="user.firstname">
      <template #content>
        <ui-form-input-text
          name="firstname"
          type="text"
          placeholder="Jean"
          label="Prénom"
          required
          :disabled="disabled"
        />
        <ui-form-input-text
          name="lastname"
          type="text"
          placeholder="Dupont"
          label="Nom"
          required
          :disabled="disabled"
        />
      </template>
    </ui-card>
    <ui-card
      title="Informations d'authentification"
      :class="!user.firstname ? 'col-span-2' : ''"
    >
      <template #content>
        <ui-form-input-text
          name="email"
          type="text"
          label="Email"
          required
          placeholder="jean.dupont@mail.com"
          :disabled="disabled"
        />
        <ui-form-input-select
          name="role"
          label="Rôle"
          :items="getRoleList(disabled)"
          required
          :disabled="disabled"
        />
      </template>
    </ui-card>
    <div class="flex items-center justify-end col-span-2">
      <ui-delete-modal
        v-if="!disabled"
        @confirm="deleteModal"
        title="Suppression d'un utilisateur"
        description="Si vous cliquez sur supprimer, cette utilisateur sera totalement supprimé"
      />
      <ui-button
        v-if="!disabled"
        @click="submit"
        class="ml-2"
        :loading="loading"
      >
        Modifier
      </ui-button>
    </div>
  </div>
</template>
