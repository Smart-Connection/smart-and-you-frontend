import type { RouteLink } from '@/common/types/Routes'
import { AdjustmentsHorizontalIcon } from '@heroicons/vue/24/solid'

// Admin routes list
export const ADMIN_ROUTES: RouteLink[] = [
  {
    label: 'Manage',
    icon: AdjustmentsHorizontalIcon,
    child: [
      {
        label: 'Clients',
        path: '/user',
        routes: ['/user']
      },
      {
        label: 'Utilisateurs',
        path: '/user',
        routes: ['/user']
      }
    ]
  }
]
