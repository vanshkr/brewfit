import { RouterProvider } from 'react-router';
import { router } from './router';


export function App() {
  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col bg-white relative">
      <RouterProvider router={router} />
      
    </div>
  );
}
