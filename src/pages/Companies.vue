<template>
  <div class="q-pa-md">
    <q-card class="my-card" flat bordered>
      <q-card-section>
        <div class="text-h6">Listado de empresas</div>
        <div class="text-subtitle2" style="color: brown;">Destacadas en el 2023</div>
      </q-card-section>

      <q-markup-table>
        <thead>
          <tr>
            <th class="text-left">Empresa</th>
            <th class="text-right">Email</th>
            <th class="text-right">Dirección</th>
            <th class="text-right">RUC</th>
            <th class="text-right">Teléfono</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, key) in companies" :key="key">
            <td class="text-left">{{ item.nombre }}</td>
            <td class="text-right">{{ item.correoElectronico }}</td>
            <td class="text-right">{{ item.direccion }}</td>
            <td class="text-right">{{ item.ruc }}</td>
            <td class="text-right">{{ item.telefono }}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card>
  </div>
</template>


<script setup>
import { api } from 'boot/axios'
import { ref } from 'vue';

const companies = ref([]);

const getCompanies = () => {
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

getCompanies()
</script>
