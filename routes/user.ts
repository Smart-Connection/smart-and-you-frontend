import type { RouteLink } from '@/common/types/Routes'
import { QuestionMarkCircleIcon } from '@heroicons/vue/24/solid'

// user routes list
export const USER_ROUTES: RouteLink[] = [
  {
    label: 'Help',
    icon: QuestionMarkCircleIcon,
    path: '/help',
    routes: ['/help']
  }
]
