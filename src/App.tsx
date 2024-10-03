import { QueryClient, QueryClientProvider } from 'react-query';
import AllProducts from './Components/AllProducts/AllProducts';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Electronics from './Pages/Electronics/Electronics';
import Jewelery from './Pages/Jewelery/Jewelery';
import Men from './Pages/Men/Men';
import Women from './Pages/Women/Women';
import Cart from './Pages/Cart/Cart';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import NotFound from './Pages/NotFound/NotFound';
import { CartProvider } from './Contexts/CartContext';


function App() {
  const queryClient = new QueryClient();
  // i used react router dom for routing to different pages 
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <AllProducts/>,
        },
        {
          path:"/home",
          element: <AllProducts/>,
        },
        {
          path:'/electronics',
          element:<Electronics/>
        },
        {
          path:'/jewelery',
          element:<Jewelery/>
        },
        {
          path:`/mens-clothing`,
          element:<Men/>
        },
        {
          path:`/womens-clothing`,
          element:<Women/>
        },
        {
          path:`/productDetails/:id`,
          element:<ProductDetails/>
        },
        {
          path:`/cart`,
          element:<Cart/>
        },
        {
          path:`*`,
          element:<NotFound/>
        }
      ]
    },
    
  ])
  return (
    <>
    <CartProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
    </CartProvider>
    </>
  );
}

export default App;
