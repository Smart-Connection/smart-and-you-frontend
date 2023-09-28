<script lang="ts" setup>
import * as yup from "yup";
import { useForm } from "vee-validate";
import { getRoleList } from "~/helpers/role";
import { createUser, getUser, editUser } from "~/services/UserService";
import { User, EditableUser } from "~/types/entity/User";

// Props
const props = defineProps<{
  type: string;
}>();

// Composable
const router = useRouter();
const route = useRoute();
const { data: user, loading: userLoading, execute } = getUser();

// Data
const authUser = useState<User>("user");
const loading = ref<boolean>(false);

// Form
const schema = yup.object({
  email: yup
    .string()
    .email("L'email n'est pas valide")
    .required("L'email est requis"),
  role: yup.string().required("Le rôle est requis"),
});
const { handleSubmit, resetForm } = useForm<EditableUser>({
  validationSchema: schema,
});

// Init
if (route.params.id) {
  await execute(parseInt(route.params.id.toString()));
  if (user.value) {
    resetForm({ values: user.value });
  }
} else {
  resetForm({ values: { role: "USER" } });
}

// Computed
const disabled = computed(() => {
  if (props.type === "create") return false;
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
  if (props.type === "create") {
    const { error } = await createUser(values);
    if (!error) router.push("/modules/user");
  } else if (props.type === "edit" && user.value?.id) {
    const { error } = await editUser(user.value?.id, values);
    if (!error) router.push("/modules/user");
  }

  loading.value = false;
});
</script>
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <ui-info
      v-if="user?.account_creation_token"
      class="col-span-2"
      type="alert"
      title="Attention"
      description="Cette utilisateur n'a pas finalisé sont inscription. "
    >
      <ui-button color="secondary">Renvoyer l'invitation</ui-button>
    </ui-info>
    <ui-card
      title="Informations personnel"
      v-if="type === 'edit' && user?.firstname"
    >
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
      :class="type === 'create' || !user?.firstname ? 'col-span-2' : ''"
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
      <ui-button
        v-if="type !== 'create' && !disabled"
        color="error"
        @click="submit"
        class="mr-2"
      >
        Supprimer
      </ui-button>
      <ui-button v-if="!disabled" @click="submit" :loading="loading">
        {{ type === "create" ? "Ajouter" : "Modifier" }}
      </ui-button>
    </div>
  </div>
</template>
