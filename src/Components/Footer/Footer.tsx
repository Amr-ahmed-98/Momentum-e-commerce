
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '10px 0',
        textAlign: 'center',
        marginTop: 'auto', 
      }}
    >
      <Typography variant="body1">5/10/2024</Typography>
      <Typography variant="body1">© 2024 Momentum</Typography>
    </Box>
  );
};

export default Footer;
