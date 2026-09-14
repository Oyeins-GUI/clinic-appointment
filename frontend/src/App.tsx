import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "@/components/error-boundary";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import {
   ClinicPage,
   ConfirmationPage,
   HomePage,
   BookPage,
   MyAppointmentsPage,
} from "@/pages/clinic-pages";
import { createBrowserRouter, RouterProvider } from "react-router";

const queryClient = new QueryClient();

const router = createBrowserRouter([
   {
      path: "/",
      element: <HomePage />,
   },
   {
      path: "/book",
      element: <BookPage />,
   },
   {
      path: "/confirmation/:id",
      element: <ConfirmationPage />,
   },
   {
      path: "/my-appointments",
      element: <MyAppointmentsPage />,
   },
   {
      path: "/clinic",
      element: <ClinicPage />,
   },
   {
      path: "*",
      element: <NotFound />,
   },
]);

function App() {
   return (
      <QueryClientProvider client={queryClient}>
         <TooltipProvider>
            <ErrorBoundary>
               <RouterProvider router={router} />
            </ErrorBoundary>
            <Toaster />
         </TooltipProvider>
      </QueryClientProvider>
   );
}

export default App;
