
import axios from "axios";
import { useQuery } from "react-query";
import { Product } from "../../interfaces/productState";
import { useParams } from "react-router-dom";
import { 
  Box, 
  CircularProgress, 
  Typography, 
  Container, 
  Card, 
  CardMedia, 
  CardContent, 
  Button, 
  Rating,
  Divider
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import { styled } from "@mui/system";

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  paddingTop: '100%', // 1:1 Aspect Ratio
  [theme.breakpoints.up('md')]: {
    width: '50%',
    paddingTop: '50%', // to Maintain aspect ratio of the image in mobile view
  },
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('md')]: {
    width: '50%',
  },
}));

const ProductDetails = () => {
  // to get the product id from the url
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ['productDetails', id],
    queryFn: async () => {
      const response = await axios.get<Product>(`https://fakestoreapi.com/products/${id}`);
      return response.data;
    }
  });

   // here to handle if the data still fetching so it will render CircularProgress
   if (isLoading) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
   // if there is an error in fetching the data won't show and the error paragraph will show
   if (error) return <Typography color="error">Error fetching products</Typography>;
  if (!data) return <Typography color="error">No product data available</Typography>;

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <StyledCard>
        <StyledCardMedia
          image={data.image}
          title={data.title}
        />
        <StyledCardContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12,md:6} } >
              <Typography variant="h4" component="h1" gutterBottom>
                {data.title}
              </Typography>
              <Typography variant="h5" color="black" gutterBottom>
                ${data.price.toFixed(2)}
              </Typography>
              <Box display="flex" alignItems="center" mb={2}>
                <Rating value={data.rating.rate} precision={0.1} readOnly />
                <Typography variant="body2" color="text.secondary" ml={1}>
                  ({data.rating.count} reviews)
                </Typography>
              </Box>
              <Button 
                variant="contained" 
                color="primary" 
                size="large" 
                sx={{ mb: 2,backgroundColor:'#2c3e50' }}
                
              >
                Add to Cart
              </Button>
            </Grid>
            <Grid size={{ xs: 12,md:6} } >
              <Typography variant="subtitle1" gutterBottom>
                Category
              </Typography>
              <Typography variant="body1">
                {data.category}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" gutterBottom>
                Description
              </Typography>
              <Typography variant="body1">
                {data.description}
              </Typography>
            </Grid>
          </Grid>
        </StyledCardContent>
      </StyledCard>
    </Container>
  );
};

export default ProductDetails;