import HomePage from './pages/HomePage'
import CourseSearch from './pages/CourseSearch'
import UniversityDetails from './pages/UniversityDetails'
import UniversityFinder from './pages/UniversityFinder'
import Dashboard from './pages/Dashboard'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import IndexLayout from './components/layouts/IndexLayout'
import UniversitiesLayout from './components/layouts/UniversitiesLayout'
import DashboardLayout from './components/layouts/DashboardLayout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NotFound from './pages/NotFound'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <IndexLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'universities',
        element: <UniversitiesLayout />,
        children: [
          {
            index: true,
            element: <UniversityFinder />,
          },
          {
            path: ':universityName/:id',
            element: <UniversityDetails />,
          },
        ],
      },
      {
        path: 'courses',
        element: <CourseSearch />,
      },
      {
        path: 'privacy-policy',
        index: <PrivacyPolicy />,
      },
      {
        path: 'terms-of-service',
        index: <TermsOfService />,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
])

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
