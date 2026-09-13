import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import PartnerPage from "../pages/PartnerPage";
import ContactsPage from "../pages/ContactsPage";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/partners/:slug',
    element: <PartnerPage />,
  },
  {
    path: '/contacts',
    element: <ContactsPage />,
  },
]);