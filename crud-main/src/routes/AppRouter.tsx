import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from '../components/Auth/ProtectedRoute';
import Error from '../pages/Error';
import LottieHandler from '../components/feedback/LottieHandler/LottieHandler';
import PageSuspenseFallback from '../components/feedback/PageSuspenseFallback/PageSuspenseFallback';
// Layout
const RootLayout = lazy(() => import('../layouts/RootLayout/RootLayout'));
// Pages
const Home = lazy(() => import('../pages/Home'));
const Register = lazy(() => import('../pages/Register'));
const Login = lazy(() => import('../pages/Login'));
const Profile = lazy(() => import('../pages/Profile'));
const ProductDetails = lazy(() => import('../pages/ProductDetails'));
const UpdateProduct = lazy(() => import('../pages/UpdateProduct'));


const router = createBrowserRouter([
   {
      path: '/',
      element: (
         <Suspense fallback={<LottieHandler type='loading' width="350px" />}>
            <RootLayout />
         </Suspense>
      ),
      errorElement: <Error />,
      children: [
         {
            index: true,
            element: (
               <ProtectedRoute>
                  <Home />
               </ProtectedRoute>
            )
         },
         {
            path: ':productId',
            element: (
               <PageSuspenseFallback>
                  <ProductDetails />
               </PageSuspenseFallback>
            ),
            loader: ({ params }) =>
            {
               if (params.productId)
               {
                  if (/[A-Z]/g.test(params.productId))
                  {
                     throw new Response("Bad Request", {
                        statusText: "Product not found",
                        status: 400,
                     });
                  }
               }
               return true;
            }
         },
         {
            path: ':productId/edit',
            element: (
               <PageSuspenseFallback>
                  <UpdateProduct />
               </PageSuspenseFallback>
            )
         },
         {
            path: 'register',
            element: (
               <PageSuspenseFallback>
                  <Register />
               </PageSuspenseFallback>
            ),
         },
         {
            path: 'login',
            element: (
               <PageSuspenseFallback>
                  <Login />
               </PageSuspenseFallback>
            ),
         },
         {
            path: 'profile',
            element: (
               <ProtectedRoute>
                  <PageSuspenseFallback>
                     <Profile />
                  </PageSuspenseFallback>
               </ProtectedRoute>
            )
         },
      ]
   }
])


const AppRouter = () =>
{
   return <RouterProvider router={router} />
}

export default AppRouter;
