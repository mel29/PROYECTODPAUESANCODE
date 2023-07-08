<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lff">
      <q-header elevated>
        <q-toolbar>
          <q-toolbar-title>
            <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          </q-toolbar-title>

          <q-btn-dropdown color="secondary" label="" dropdown-icon="more_vert">
            <q-list>
              <q-item clickable v-close-popup @click="handleLogout">
                <q-item-section>
                  <q-item-label>Cerrar sessión</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>

        </q-toolbar>
      </q-header>

      <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="400">
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>

            <q-item clickable v-ripple to='/bolsa-trabajo-empresa' exact v-if="value.ruc">
              <q-item-section avatar>
                <q-icon name="local_library" />
              </q-item-section>
              <q-item-section>
                Mis publicaciones
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple to='/bolsa-trabajo-usuario' exact>
              <q-item-section avatar>
                <q-icon name="work" />
              </q-item-section>
              <q-item-section>
                Publicaciones
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple to='/historial' v-if="value.dni">
              <q-item-section avatar>
                <q-icon name="timeline" />
              </q-item-section>
              <q-item-section>
                Mis postulaciones
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple to='/perfil-profesional' v-if="value.dni">
              <q-item-section avatar>
                <q-icon name="military_tech" />
              </q-item-section>
              <q-item-section>
                Perfil profesional
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple to='/empresas' v-if="value.dni">
              <q-item-section avatar>
                <q-icon name="apartment" />
              </q-item-section>
              <q-item-section>
                Empresas
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple to='/mi-perfil'>
              <q-item-section avatar>
                <q-icon name="person" />
              </q-item-section>
              <q-item-section>
                Perfil
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">{{ value.name }}</div>
            <div>{{ value.ruc ? 'Empresa' : 'Usuario' }}</div>
          </div>
        </q-img>
      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const $store = useStore();
const router = useRouter();
const $q = useQuasar()

const drawer = ref(false);
const value = $q.localStorage.getItem('dataUser')

const handleLogout = () => {
  $q.localStorage.clear()
  router.push('/');
}
</script>

<style lang="scss" scoped>
.q-router-link--exact-active {
  color: #1a667e !important;
}
.q-toolbar {
  background-color: $secondary;
}
.q-item__section--avatar {
  min-width: 46px;
}
</style>
