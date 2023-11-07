<script setup lang="ts">
import { getUsers } from "@/services/UserService";
import { User } from "~/types/entity/User";
import { addConsultant, removeConsultant } from "@/services/ContractService";
import { EyeIcon, TrashIcon } from "@heroicons/vue/24/solid";

// Props
const props = defineProps<{
  consultants?: User[];
  contractId: string;
  status: string;
}>();

// Data
const user = useState<User>("user");
const consultantsSearchText = ref("");
const consultantsList = ref<User[]>([]);
const modal = ref(false);

// Consultants
const { data: searchedConsultants, execute } = useAsyncData({
  promise: () =>
    getUsers({
      search: consultantsSearchText.value,
      per_page: 5,
      role: "CONSULTANT",
    }),
});

// Init
if (props.consultants) {
  consultantsList.value = props.consultants;
}

// Functions
const searchConsultants = (text: string) => {
  consultantsSearchText.value = text;
  execute();
};

const deleteConsultant = async (id: string, index: number) => {
  try {
    await removeConsultant({ user_id: id }, props.contractId);
    consultantsList.value.splice(index, 1);
  } catch (e) {
    console.log(e);
  }
};

// Submit
const submit = async (consultant: User) => {
  try {
    await addConsultant({
      user_id: consultant.id,
      contract_id: props.contractId,
    });
    consultantsList.value.push(consultant);
  } catch (e) {
    console.log(e);
  }
};
</script>
<template>
  <div class="mt-4">
    <ui-card title="Liste des consultants">
      <template #headerActions>
        <ui-button
          v-if="user.role === 'SUPER_ADMIN' && status === 'OPEN'"
          @click="modal = true"
        >
          Ajouter
        </ui-button>
      </template>
      <div v-if="consultants" class="flex flex-col">
        <table class="divide-y divide-gray-300 w-full">
          <thead>
            <tr>
              <th
                class="pb-3 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                Nom
              </th>
              <th
                class="pb-3 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                Email
              </th>
              <th
                class="pb-3 pl-4 pr-3 w-[100px] text-center text-sm font-semibold text-gray-900 sm:pl-0"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-if="consultantsList.length === 0">
              <td
                colspan="3"
                class="py-4 pl-4 pr-3 text-xs font-medium text-gray-900 sm:pl-0 items-center justify-cente"
              >
                <div class="w-full flex items-center justify-center">
                  Aucun consultant
                </div>
              </td>
            </tr>
            <tr
              v-else
              :key="consultant.id"
              v-for="(consultant, index) in consultantsList"
            >
              <td
                class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"
              >
                {{ consultant.firstname }}
                {{ consultant.lastname }}
              </td>
              <td
                class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"
              >
                {{ consultant.email }}
              </td>
              <td>
                <div class="flex">
                  <ui-action-button :to="`/modules/user/view/${consultant.id}`">
                    <EyeIcon class="w-4 h-4" />
                  </ui-action-button>
                  <ui-action-button
                    v-if="user.role === 'SUPER_ADMIN'"
                    class="cursor-pointer"
                    @click="deleteConsultant(consultant.id, index)"
                  >
                    <TrashIcon class="w-4 h-4 text-red-600" />
                  </ui-action-button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ui-card>

    <!-- Modal -->
    <ui-modal v-model="modal" title="Ajouter un consultant">
      <template #headerActions>
        <ui-search @search="searchConsultants($event)" />
      </template>
      <div>
        <table class="divide-y divide-gray-300 w-full">
          <thead>
            <tr>
              <th
                class="pb-3 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                Nom
              </th>
              <th
                class="pb-3 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                Email
              </th>
              <th
                class="pb-3 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-if="searchedConsultants?.data.length === 0">
              <td
                colspan="3"
                class="py-4 pl-4 pr-3 text-xs font-medium text-gray-900 sm:pl-0 items-center justify-cente"
              >
                <div class="w-full flex items-center justify-center">
                  Aucun consultant
                </div>
              </td>
            </tr>
            <tr
              v-else
              :key="consultant.id"
              v-for="consultant in searchedConsultants?.data"
            >
              <td
                class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"
              >
                {{ consultant.firstname }}
                {{ consultant.lastname }}
              </td>
              <td
                class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"
              >
                {{ consultant.email }}
              </td>
              <td>
                <ui-label
                  v-if="consultantsList.find((el) => el.id === consultant.id)"
                  color="green"
                  >Ajouté</ui-label
                >
                <ui-button v-else size="small" @click="submit(consultant)">
                  Ajouter
                </ui-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ui-modal>
  </div>
</template>
