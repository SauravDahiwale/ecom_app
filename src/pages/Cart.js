import React from "react";
import {
  Box,
  Button,
  CardContent,
  CardMedia,
  Container,
  TextField,
} from "@mui/material";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { useTheme } from "@emotion/react";
import Rating from "@mui/material/Rating";
import { getSubTotal } from "../utils";
import { addToCart, removeFromCart } from "../feature/cart-slice";
import { useNavigate } from "react-router-dom";

function Cart() {
  const cart = useSelector((state) => state.cart?.value);
  const theme = useTheme();
  const subtotal= getSubTotal(cart)?.toFixed(2);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  function updateQuantity(e, {product,quantity}){
    const updatedQuantity = e.target.valueAsNumber;
    if(updatedQuantity < quantity){
     // remove from card
     dispatch(removeFromCart({product}));
    }
    else{
       dispatch(addToCart({ product }));
    }
  }

  function goToHome(){
    navigate("/");
  }
  function checkOutItems(){
     navigate("/Checkout");
  }
  return (
    <Container sx={{ py: 8 }}>
      <Grid container spacing={2}>
        <Grid item container spacing={2} md={8}>
          {cart?.map(({ product, quantity }) => {
            const { title, id, price, description, rating, image } = product;
            return (
              <Grid item key={id} xs={12}>
                <Card
                  sx={{
                    display: "flex",
                    py: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={image}
                    sx={{
                      width: theme.spacing(30),
                      height: theme.spacing(30),
                      objectFit: "contain",
                      pt: theme.spacing(),
                    }}
                    alt={title}
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flex: 1,
                    }}
                  >
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      <Typography variant="h5">{title}</Typography>
                      <Rating readOnly precision={0.5} value={rating.rate} />
                      <form>
                        <TextField
                          sx={{
                            width:theme.spacing(8),
                          }}
                          inputProps={{
                            min: 0,
                            max: 10,
                          }}
                          id={`${id}-product-id`}
                          type="number"
                          variant="standard"
                          label="Quantity"
                          value={quantity}
                          onChange={(e)=> updateQuantity(e,{product,quantity})}
                        ></TextField>
                      </form>
                    </Box>
                    <Box>
                      <Typography variant="h5" paragraph>
                        {getSubTotal([{ product, quantity }])?.toFixed(2)}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <Grid
          item
          container
          fullwidth
          md={4}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box fullwidth sx={{
            width: "100%",
          }}>
            <Card sx={{
              padding:2,
              display: "flex",
              flexDirection:"column",
              gap: 2, 
            }} fullwidth>
              <Typography variant="h4">Subtotal</Typography>
              <Typography variant="h5"> {subtotal} </Typography>
              {subtotal>0 ? (
              <Button variant="contained" onClick={checkOutItems}> Buy now</Button>
               ) : 
              (<Button variant="contained" onClick={goToHome}> Shop Products</Button>
             )}
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Cart;
