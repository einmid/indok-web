import Hero from "@components/Hero";
import Layout from "@components/Layout";
import { Box, Button, Container, makeStyles, Typography } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import { Parallax } from "react-parallax";

const useStyles = makeStyles((theme) => ({
  title: {
    color: "white",

    ["&::before"]: {
      background: "linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9))",
      content: "''",
      display: "block",
      height: "100%",
      position: "absolute",
      width: "100%",
    },
  },
  titleImage: {
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  card: {
    display: "flex",
    height: theme.spacing(20),
  },
  cardContent: {
    flex: 1,
    padding: theme.spacing(2),
  },
  cardMedia: {
    width: theme.spacing(25),
  },
  articleImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));

const IndexPage: NextPage = () => {
  const classes = useStyles();

  return (
    <Layout>
      <Hero />
      <Parallax
        bgImageStyle={{ zIndex: -1 }}
        className={classes.title}
        bgImage="img/gang.jpg"
        bgImageAlt="the cat"
        strength={200}
      >
        <Container>
          <Box height={600}>
            <Box display="flex" top="0" alignItems="center" position="absolute" height="100%" zIndex="4">
              <Box width={650}>
                <Typography variant="overline">Foreningen bak</Typography>
                <Typography variant="h3">Et fantastisk studentmiljø.</Typography>
                <br />
                <Link href="./events" passHref>
                  <Button color="inherit" size="large" startIcon={<NavigateNextIcon />}>
                    Utforsk kalenderen
                  </Button>
                </Link>
              </Box>
            </Box>
          </Box>
        </Container>
      </Parallax>
    </Layout>
  );
};

export default IndexPage;
