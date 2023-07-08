
const routes = [
  { path: '', component: () => import('pages/Login.vue') },
  { path: '/registrar-empresa', component: () => import('pages/RegisterCompany.vue') },
  { path: '/registrar-usuario', component: () => import('pages/RegisterUser.vue') },
  { path: '/:catchAll(.*)*', component: () => import('pages/ErrorNotFound.vue') },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/home',
        component: () => import('pages/IndexPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/bolsa-trabajo-empresa',
        component: () => import('pages/JobBagCompany.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/bolsa-trabajo-usuario',
        component: () => import('pages/JobBagUser.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/historial',
        component: () => import('pages/Historial.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/perfil-profesional',
        component: () => import('pages/ProfileProfessional.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/empresas',
        component: () => import('pages/Companies.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/mi-perfil',
        component: () => import('pages/Profile.vue'),
        meta: { requiresAuth: true }
      },
    ]
  }
]

export default routes
