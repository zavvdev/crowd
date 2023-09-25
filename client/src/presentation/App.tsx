import { RouterProvider } from '@tanstack/react-router';
import { router } from '~/presentation/router';

export function App() {
  return <RouterProvider router={router} />;
}
