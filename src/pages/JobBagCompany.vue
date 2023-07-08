<template>
  <section>
    <h3 class="title">Bolsa de trabajo</h3>
    <q-btn label="Crear una publicación" color="secondary" @click="modal = true" />

    <div class="q-mt-md">
      <div class="q-mb-sm">Mis publicaciones</div>
      <q-banner rounded dense inline-actions class="wrapper-border q-mb-md publication" v-for="(publication, key) in data"
        :key="key">
        <span class="title">{{ publication.titulo }}</span>
        <p v-html="publication.descripcion" />
        <span class="date">Esta publicación vence: <i>{{ computedDate(publication.fechaCaducidad) }}</i></span>
        <template v-slot:action>

          <div class="buttons">
            <q-btn flat round color="blue-grey-6" icon="edit" @click="getPublicationById(publication.id)" />
            <q-btn flat round color="red-5" icon="delete"  @click="confirm = true, idItem = publication.id" />
          </div>

        </template>
      </q-banner>
    </div>

    <CreateJob v-model="modal" @createItem="createItem" />
    <EditJob v-model="modalEdit" :dataItem="dataEdit" @closeModalEdit="closeModalEdit" />

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="primary" text-color="white" />
          <span class="q-ml-sm">¿Estás seguro que deseas eliminar este valor?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="secondary" v-close-popup @click="idItem = null" />
          <q-btn flat label="Sí, eliminar" color="primary" @click="handleDeleteItem" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </section>
</template>

<script setup>
import CreateJob from '../components/CreateJobModal.vue'
import EditJob from '../components/EditJobModal.vue'

import { ref, computed } from 'vue';
import { useQuasar, date } from 'quasar'
import { api } from 'boot/axios'

const modal = ref(false)
const modalEdit = ref(false)
const $q = useQuasar()
const id = $q.localStorage.getItem('dataUser')._id
const data = ref([])
const dataEdit = ref([])
const idItem = ref(null)
const confirm = ref(false)

const computedDate = (val) => {
  return date.formatDate(val, 'DD MMMM YYYY')
}

const createItem = () => {
  modal.value = false;
  getPublications()
}
const closeModalEdit = () => {
  modalEdit.value = false;
  getPublications()
}

const getPublications = () => {
  api.get(`/OfertasTrabajo/GetByEmpresa/${id}`)
    .then((response) => {
      if (response.status == 200) {
        data.value = response.data
      }
    })
    .catch((err) => {
      console.error(err)
    })
}
const getPublicationById = (id) => {
  modalEdit.value = true
  api.get(`/OfertasTrabajo/${id}`)
    .then(async(response) => {
      if (response.status == 200) {
        dataEdit.value = response.data
      }
    })
    .catch((err) => {
      console.error(err)
    })
}

const handleDeleteItem = () => {
  api.delete(`/OfertasTrabajo/${idItem.value}`)
    .then((response) => {
      if (response.status == 200) {
        $q.notify({
          type: 'positive',
          position: 'top-right',
          message: 'Registro eliminado'
        })
        confirm.value = false
        getPublications()
      }
    })
    .catch((err) => {
      console.error(err)
    })
}

getPublications()

</script>

<style lang="scss" scoped>
.wrapper-border {
  border: 1px solid rgb(221, 221, 221);
  box-shadow: 2px 2px 3px #dddddd9e;
}

.publication {
  .title {
    color: #C10015;
    font-size: 16px;
  }

  p {
    color: #787878;
    font-weight: 400;
    font-size: 13px;
    margin-bottom: .5rem;
  }

  .date {
    color: #787878;
    font-weight: 400;
    font-size: 12px;
  }
}
</style>
