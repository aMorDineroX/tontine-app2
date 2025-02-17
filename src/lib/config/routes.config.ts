export const ROUTES = {
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
  },
  DASHBOARD: {
    HOME: '/dashboard',
    TONTINES: '/dashboard/tontines',
    CREATE_TONTINE: '/dashboard/tontines/create',
    TONTINE_DETAILS: (id: string) => `/dashboard/tontines/${id}`,
  },
  PAYMENTS: {
    LIST: '/dashboard/payments',
    CREATE: '/dashboard/payments/create',
  },
} as const;
