
import { Box, Typography, Button, IconButton, Card, CardMedia, CardContent, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../../Contexts/CartContext';
import { Link as RouterLink } from 'react-router-dom'; 
import { Product } from '../../interfaces/productState';

const CartItem = ({ product }:{product: Product}) => {
  const { addProduct, removeProduct, removeEntireProduct } = useCart();

  return (
    <Card sx={{ display: 'flex', width: '100%' }}>
      <CardMedia
        component="img"
        sx={{ width: 100, height: 100, objectFit: 'cover' }}
        image={product.image } 
        alt={product.title}
      />
      <CardContent sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          {product.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => removeProduct(product.id)} size="small">
            <RemoveIcon />
          </IconButton>
          <Typography sx={{ mx: 1 }}>{product.quantity}</Typography>
          <IconButton onClick={() => addProduct(product)} size="small">
            <AddIcon />
          </IconButton>
        </Box>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => removeEntireProduct(product.id)}
        >
          Remove
        </Button>
      </CardContent>
    </Card>
  );
};

const Cart = () => {
  const { cart, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <Box sx={{ maxWidth: 600,minHeight:'100vh' ,mx: 'auto', p: 2, textAlign: 'center' }}>
        <ShoppingCartIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          Your cart is empty
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Looks like you haven't added any products to your cart yet.
        </Typography>
        <Button
          component={RouterLink}
          to="/"
          variant="contained"
          color="primary"
          startIcon={<ShoppingCartIcon />}
          sx={{backgroundColor:'#2c3e50'}}
        >
          Start Shopping
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping Cart
      </Typography>
      <Stack spacing={2}>
        {cart.map(product => (
          <CartItem key={product.id} product={product} />
        ))}
      </Stack>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="secondary" onClick={clearCart} sx={{backgroundColor:'#2c3e50'}}>
          Clear Cart
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;