import { useQuery } from "@apollo/client";
import PayWithVipps from "@components/ecommerce/PayWithVipps";
import Layout from "@components/Layout";
import { GET_PRODUCT } from "@graphql/ecommerce/queries";
import { Product } from "@interfaces/ecommerce";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { KeyboardArrowLeft } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { redirectIfNotLoggedIn } from "src/utils/redirect";

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    textAlign: "center",
  },
  listitem: {
    textAlign: "center",
  },
  wrapIcon: {
    alignItems: "center",
    justifyContent: "center",
    display: "inline-flex",
    width: "100%",
    marginBottom: theme.spacing(1),

    "& > svg": {
      height: "unset",
      marginRight: theme.spacing(2),
    },
  },
  errrorContainer: {
    width: "fit-content",
  },
}));

const CheckoutPage: NextPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const { productId, quantityStr } = router.query;
  const quantity = typeof quantityStr == "string" ? parseInt(quantityStr) : 1;

  const [product, setProduct] = useState<Product>();
  const [orderError, setOrderError] = useState<string>("");

  const { loading, error } = useQuery<{ product: Product }>(GET_PRODUCT, {
    variables: { productId: productId },
    onCompleted: (data) => setProduct(data.product),
  });

  if (redirectIfNotLoggedIn()) {
    return null;
  }

  return (
    <Layout>
      <Container>
        <Box mt={2}>
          <Button startIcon={<KeyboardArrowLeft />} onClick={() => router.back()}>
            Tilbake
          </Button>
        </Box>
        <Box mb={2}>
          <Card>
            <CardHeader title="Betaling"></CardHeader>
            <CardContent>
              <Grid container alignItems="center" direction="column" spacing={3}>
                <Grid item xs={12}>
                  <Alert variant="filled" severity="info">
                    Betalingsløsningen er under utvikling. Dersom du opplever problemer, kontakt{" "}
                    <a style={{ color: "blue" }} href="mailto:feedback@rubberdok.no">
                      feedback@rubberdok.no
                    </a>
                  </Alert>
                </Grid>
                {!(productId && quantity) ? (
                  <>
                    <Typography variant="h3">Feil</Typography>
                    <Alert severity="error" variant="filled">
                      ProduktID og antall mangler
                    </Alert>
                  </>
                ) : error ? (
                  <>
                    <Typography variant="h3">Feil</Typography>
                    <Alert severity="error" variant="filled">
                      {error.message}
                    </Alert>
                  </>
                ) : loading ? (
                  <CircularProgress />
                ) : (
                  <>
                    <Grid item xs={12}>
                      <Typography variant="h3">Bekreft ordredetaljer</Typography>
                      {product && quantity ? (
                        <List className={classes.list}>
                          <ListItem className={classes.listitem}>
                            <ListItemText primary={product.name} secondary={product.description} />
                          </ListItem>
                          <ListItem className={classes.listitem}>
                            <ListItemText primary={`${product.price} kr`} secondary="Pris per enhet" />
                          </ListItem>
                          <ListItem className={classes.listitem}>
                            <ListItemText
                              primary={`${quantity} stk`}
                              secondary={`Maksimalt antall tillatt: ${product.maxBuyableQuantity}`}
                            />
                          </ListItem>
                          <Divider variant="middle" component="li" />
                          <ListItem className={classes.listitem}>
                            <ListItemText primary={`${product.price * quantity} kr`} secondary="Totalbeløp" />
                          </ListItem>
                        </List>
                      ) : (
                        <Typography>Ingen produkt funnet</Typography>
                      )}
                    </Grid>

                    {product && quantity && typeof productId == "string" && (
                      <Grid item xs={12}>
                        <PayWithVipps
                          productId={productId}
                          quantity={Number(quantity)}
                          onError={(e) => e && setOrderError(e.message)}
                        />
                      </Grid>
                    )}
                    {orderError && (
                      <Grid item xs={12}>
                        <Alert severity="error" variant="filled">
                          {orderError}
                        </Alert>
                      </Grid>
                    )}
                  </>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Layout>
  );
};

export default CheckoutPage;
