<template>
  <section>
    <h3 class="title historial-title">Historial de mis postulaciones</h3>
    <div class="q-pa-md" style="max-width: 500px">
      <q-list>

        <div v-for="(item, key) in items" :key="key">
          <q-item>
            <q-item-section>
              <q-item-label>{{ item.titulo }}</q-item-label>
              <q-item-label caption lines="2" v-html="item.descripcion" />
              <q-item-label caption lines="2">Fecha de publicación: <b>{{ computedDate(item.fechaPublicacion) }}</b></q-item-label>
              <q-item-label caption lines="2">
                Fecha límite a postular: <b class="date-2">{{ computedDate(item.fechaCaducidad) }}</b>
              </q-item-label>
            </q-item-section>

            <q-item-section side top v-if="companies">
              <q-item-label caption>Empresa:  {{ item.empresaId }}</q-item-label>
              <q-icon name="star" color="yellow" />
            </q-item-section>
          </q-item>
          <q-separator spaced inset />
        </div>
      </q-list>

      <!-- <pre>{{ items }}</pre> -->

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useQuasar, date } from 'quasar'
import { api } from 'boot/axios'

const $q = useQuasar()
const dataUser = $q.localStorage.getItem('dataUser')
const record = ref([]);
const publications = ref([])
const items = ref([]);
const companies = ref([]);

const historials = (vals) => {
  let newArr = [];
  record.value.map(item => {
    newArr = [...newArr, publications.value.find(x => x.id == item.ofertaId)]
  })
  return items.value = newArr
}
const computedDate = (val) => {
  return date.formatDate(val, 'DD MMMM YYYY')
}

const handleGetHistorial = () => {
  api.get(`/Postulaciones/GetByPostulante/${dataUser._id}`)
    .then(async (response) => {
      if (response.status == 200) {
        record.value = response.data
      }
    })
    .catch((err) => {
      console.error(err)
    })
}
const handleGetPublications = () => {
  api.get(`/OfertasTrabajo`)
    .then((response) => {
      if (response.status == 200) {
        publications.value = response.data
        historials(response.data)
      }
    })
    .catch((err) => {
      console.error(err)
    })
}
const handleGetCompanies = () => {
  api.get(`/Empresas`)
    .then((response) => {
      if (response.status == 200) {
        companies.value = response.data
      }
    })
    .catch((err) => {
      console.error(err)
    })
}

handleGetHistorial()
handleGetPublications()
handleGetCompanies()
</script>

<style lang="scss" scoped>
.historial-title {
  padding-left: 2rem;
}
.date-2 {
  color: #4caf50;
}
</style>
