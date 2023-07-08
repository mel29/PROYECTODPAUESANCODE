<template>
  <section>
    <h3 class="title">Bolsa de trabajo</h3>
    <span>Aqui puedes encontar un buen trabajo</span>
    <div class="q-mt-md">

      <q-banner rounded dense inline-actions class="wrapper-border q-mb-md publication" v-for="(publication, key) in data"
        :key="key">
        <span class="title">{{ publication.titulo }}</span>
        <p v-html="publication.descripcion" />
        <span class="date">Esta publicación vence: <i>{{ computedDate(publication.fechaCaducidad) }}</i></span>
        <template v-slot:action>

          <div class="buttons" v-if="!dataUser.ruc">
            <q-btn outline  color="secondary" label="Postular" @click="handlePostular(publication.id)" />
          </div>

        </template>
      </q-banner>
    </div>

  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useQuasar, date } from 'quasar'
import { api } from 'boot/axios'


const $q = useQuasar()
const dataUser = $q.localStorage.getItem('dataUser')
const data = ref([])

const computedDate = (val) => {
  return date.formatDate(val, 'DD MMMM YYYY')
}

const getPublications = () => {
  api.get(`/OfertasTrabajo`)
    .then((response) => {
      if (response.status == 200) {
        data.value = response.data
      }
    })
    .catch((err) => {
      console.error(err)
    })
}
const handlePostular = (id) => {
  const payload = {
    usuarioId: dataUser._id,
    ofertaId: id,
    fechaPostulacion: date.formatDate(Date.now(), 'YYYY-MM-DDTHH:mm:ss.SSSZ')
  }

  api.post(`/Postulaciones`, payload)
    .then(async(response) => {
      if (response.status == 200) {
        $q.notify({
          type: 'positive',
          position: 'top-right',
          message: 'Acabas de notificar esta postulación'
        })
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
