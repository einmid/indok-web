import Layout from "@components/Layout";
import { Box, Breadcrumbs, Container, makeStyles, Paper, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React from "react";
import Sidebar from "./Sidebar";

const useStyles = makeStyles(() => ({
  title: {
    color: "white",
    zIndex: -1,
  },
  titleImage: {
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  navItem: {
    fontWeight: 600,
    fontSize: 12,
    textTransform: "uppercase",
    color: "black",
    "&:hover": {
      cursor: "pointer",
    },
  },
  breadcrumb: {
    fontSize: "13px",
    textTransform: "uppercase",
    color: "#676767",
    marginTop: -32,
  },
  heroCard: {
    marginTop: -112,
    padding: "56px 64px",
    textAlign: "center",
  },
}));

interface Props {
  children: React.ReactNode;
  img?: string;
  title: string;
  description: string;
  page: string;
}

const Template: React.FC<Props> = ({ children, img, title, description, page }) => {
  const classes = useStyles();

  return (
    <Layout>
      <Box mt="-60px" position="relative" className={classes.title} height={450}>
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          className={classes.titleImage}
          style={{
            backgroundImage: `linear-gradient(to top, rgb(0 0 0 / 50%), rgb(0 0 0 / 60%)),
                  url(${img})`,
          }}
        >
          <Typography variant="h2">{title}</Typography>
        </Box>
      </Box>
      <Container>
        <Grid justify="center" container>
          <Grid item xs={10}>
            <Paper className={classes.heroCard}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Box>
                  <Breadcrumbs className={classes.breadcrumb} aria-label="breadcrumb">
                    <p color="inherit">Om foreningen</p>
                    <p>{page}</p>
                  </Breadcrumbs>
                </Box>
                <Typography variant="subtitle1">{description}</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Box pt={8} pb={16}>
          <Grid container direction="row" justify="center" spacing={5}>
            <Grid item xs={8}>
              {children}
            </Grid>
            <Grid item xs={4}>
              <Sidebar active={page} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Layout>
  );
};

export default Template;
