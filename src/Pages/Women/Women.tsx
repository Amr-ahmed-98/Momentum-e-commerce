import { useQuery } from 'react-query';
import axios from 'axios';
import { Product } from '../../interfaces/productState';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Button, 
  Rating,
  Box,
  Container,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../Contexts/CartContext';

const StyledCard = styled(Card)(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const StyledCardMedia = styled(CardMedia)({
  paddingTop: '56.25%',
});

const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
});
const Women = () => {
  const navigate = useNavigate();
  const {addProduct} = useCart();
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      try {
        const { data } = await axios.get<Product[]>('https://fakestoreapi.com/products/category/women\'s clothing');
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  });


  const handleAddToCart = (event: React.MouseEvent, product: Product) => {
    event.stopPropagation(); // Prevent navigation when clicking the button
    addProduct(product);
  };

  // when user clicks on a product, navigate to the product details page using the product id 
  const handleProductClick = (productId: number) => {
    navigate(`/ProductDetails/${productId}`);
  };

  // here to handle if the data still fetching so it will render CircularProgress
  if (isLoading) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
  // if there is an error in fetching the data won't show and the error paragraph will show
  if (error) return <Typography color="error">Error fetching products</Typography>;

  return (
    <Container sx={{ my: 10 }}>
         <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={4}>
        {data?.map((product) => (
          <Box key={product.id} gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4', lg: 'span 3' }}>
            <StyledCard>
              <Box 
                onClick={() => handleProductClick(product.id)} 
                sx={{ cursor: 'pointer', flexGrow: 1, display: 'flex', flexDirection: 'column' }}
              >
                <StyledCardMedia
                  image={product.image}
                  title={product.title}
                />
                <StyledCardContent>
                  <Typography gutterBottom variant="h6" component="h2" noWrap>
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" >
                    {product.description.length > 100
                      ? `${product.description.substring(0, 100)}...`
                      : product.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.category}
                  </Typography>
                  <Box display="flex" alignItems="center" mb={1}>
                    <Rating value={product.rating.rate} precision={0.1} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary" ml={1}>
                      ({product.rating.count})
                    </Typography>
                  </Box>
                  <Typography variant="h6" color="text.primary">
                    ${product.price.toFixed(2)}
                  </Typography>
                </StyledCardContent>
              </Box>
              <Button
                variant="contained"
                color="primary"
                sx={{backgroundColor: '#2c3e50'}}
                onClick={(event) => handleAddToCart(event, product)}
                fullWidth
              >
                Add to Cart
              </Button>
            </StyledCard>
          </Box>
        ))}
      </Box>
    </Container>
  );
};


export default Women