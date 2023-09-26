import type { RouteLink } from '@/common/types/Routes'
import { AdjustmentsHorizontalIcon } from '@heroicons/vue/24/solid'

// Super admin routes list
export const SUPER_ADMIN_ROUTES: RouteLink[] = [
  {
    label: 'Gestion',
    icon: AdjustmentsHorizontalIcon,
    child: [
      {
        label: 'Clients',
        path: '/client',
        routes: ['/client']
      },
      {
        label: 'Utilisateurs',
        path: '/user',
        routes: ['/user']
      }
    ]
  }
]
