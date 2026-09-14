import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { PartnerPage } from '../pages/PartnerPage'
import { ContactsPage } from '../pages/ContactsPage'
import { VacanciesPage } from '../pages/VacanciesPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/vacancies',
    element: <VacanciesPage />,
  },
  {
    path: '/partners/:slug',
    element: <PartnerPage />,
  },
  {
    path: '/contacts',
    element: <ContactsPage />,
  },
])
