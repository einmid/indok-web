import { useQuery } from "@apollo/client";
import Layout from "@components/Layout";
import ListingBanner from "@components/pages/listings/detail/ListingBanner";
import ListingTitle from "@components/pages/listings/detail/ListingTitle";
import ListingBody from "@components/pages/listings/detail/ListingBody";
import { LISTING } from "@graphql/listings/queries";
import { Listing } from "@interfaces/listings";
import { Button, Container, Grid, Hidden, makeStyles, Paper } from "@material-ui/core";
import ArrowForward from "@material-ui/icons/ArrowForward";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import { NextPage } from "next";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import renderers from "@components/pages/listings/markdown/renderer";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(4),
    },
  },
  bottom: {
    position: "sticky",
    bottom: 0,
    padding: theme.spacing(2),
    zIndex: 100,
  },
  description: {
    wordBreak: "break-word",
  },
}));

// page to show details about a listing and its organization
const ListingPage: NextPage = () => {
  const { listingId } = useRouter().query;

  // fetches the listing, using the URL parameter as the argument
  const { loading, error, data } = useQuery<{ listing: Listing }>(LISTING, {
    variables: { id: parseInt(listingId as string) },
  });

  const classes = useStyles();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <>
      {data && (
        <Layout>
          <Hidden smDown>
            <ListingBanner listing={data.listing} />
          </Hidden>
          <Container className={classes.container}>
            <Grid container direction="column" alignItems="center" justify="center">
              <Grid item container direction="column" spacing={4} alignItems="stretch" justify="center" xs={10}>
                <Grid item>
                  <ListingTitle listing={data.listing} />
                </Grid>
                <Grid item>
                  <ListingBody>
                    <ReactMarkdown
                      renderers={renderers}
                    >
                      {data.listing.description}
                    </ReactMarkdown>
                  </ListingBody>
                </Grid>
              </Grid>
            </Grid>
          </Container>
          <Hidden mdUp>
            <Paper className={classes.bottom}>
              <Grid container direction="row" justify="space-between" alignItems="center">
                {data.listing.organization && (
                  <Grid item xs>
                    <Button
                      size="small"
                      endIcon={<OpenInNewIcon />}
                      href={`/about/organizations/${data.listing.organization.slug}/`}
                    >
                      {data.listing.organization.name.slice(0, 20)}
                    </Button>
                  </Grid>
                )}
                <Hidden smUp>
                  {data.listing.url && (
                    <Grid item>
                      <Button variant="contained" color="primary" href={data.listing.url} endIcon={<ArrowForward />}>
                        Søk her
                      </Button>
                    </Grid>
                  )}
                </Hidden>
              </Grid>
            </Paper>
          </Hidden>
        </Layout>
      )}
    </>
  );
};

export default ListingPage;
