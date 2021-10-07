import {
  Typography,
  makeStyles,
  Box,
  Grid,
  Button,
  Paper,
  Divider,
  Theme,
  Container,
  Tooltip,
} from "@material-ui/core";
import { NextPage } from "next";
import Link from "next/link";
import FireplaceIcon from "@material-ui/icons/Fireplace";
import PowerIcon from "@material-ui/icons/Power";
import SpeakerIcon from "@material-ui/icons/Speaker";
import HotelIcon from "@material-ui/icons/Hotel";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import HotTubIcon from "@material-ui/icons/HotTub";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { DirectionsBus, DirectionsCar, DirectionsTransit, LocalTaxi } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import ImageSlider from "@components/pages/cabins/ImageSlider/ImageSlider";
import { cabinImages, outsideImages } from "@components/pages/cabins/ImageSlider/imageData";
import FAQ from "@components/pages/cabins/Documents/FAQ";
import Layout from "@components/Layout";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@graphql/users/queries";
import { User } from "@interfaces/users";
import PermissionRequired from "@components/permissions/PermissionRequired";

const BOOKING_DISABLED = false;

const useStyles = makeStyles((theme: Theme) => ({
  hero: {
    color: "white",
    height: "100vh",
    width: "100%",
    backgroundColor: "black",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.8)), url('img/hytte.jpg')`,
  },
  icon: {
    fontSize: "70px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "30px",
    },
  },
  readMoreButton: {
    position: "absolute",
    bottom: 0,
  },
  button: {
    "&.Mui-disabled": {
      backgroundColor: theme.palette.grey[600],
      opacity: 0.8,
    },
  },
}));

/*
Front page for cabins. Includes info about the cabins and link to the booking page (cabins/book).
*/
const CabinsPage: NextPage = () => {
  const classes = useStyles();
  const { data, error } = useQuery<{ user: User }>(GET_USER);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (data && data.user && !error) {
      setIsLoggedIn(true);
    }
  }, [data]);

  const facilitiesData = [
    {
      icon: <FireplaceIcon className={classes.icon} />,
      text: "Varmekabler",
    },
    {
      icon: <PowerIcon className={classes.icon} />,
      text: "Innlagt strøm",
    },
    {
      icon: <SpeakerIcon className={classes.icon} />,
      text: "Høyttaleranlegg",
    },
    {
      icon: <HotelIcon className={classes.icon} />,
      text: "18 soveplasser",
    },
    {
      icon: <RestaurantIcon className={classes.icon} />,
      text: "Kjøkken",
    },
    {
      icon: <HotTubIcon className={classes.icon} />,
      text: "Badstue",
    },
  ];

  const transportData = [
    {
      icon: <DirectionsBus fontSize="large" style={{ fontSize: "80px" }} />,
      text: (
        <Typography component="span">
          Kom deg til Oppdal med <Link href="https://www.atb.no/buss-regioner/">AtB Region</Link> eller{" "}
          <Link href="https://www.lavprisekspressen.no/">Lavprisekspressen</Link>.
        </Typography>
      ),
    },
    {
      icon: <DirectionsCar fontSize="large" style={{ fontSize: "80px" }} />,
      text: (
        <Typography component="span">
          <Link href="https://www.sixt.no/">Sixt</Link>: pris ca. 1200,- for en helg, ekskl. bensin. Kjøretiden er ca.
          to timer.
        </Typography>
      ),
    },
    {
      icon: <DirectionsTransit fontSize="large" style={{ fontSize: "80px" }} />,
      text: (
        <Typography component="span">
          Ta toget med <Link href="https://www.vy.no/">VY</Link> til Oppdal for en billig penge.
        </Typography>
      ),
    },
    {
      icon: <LocalTaxi fontSize="large" style={{ fontSize: "80px" }} />,
      text: (
        <Typography component="span">
          Taxi fra togstasjonen til hyttene tar 5-10 min.{" "}
          <Link href="https://www.visitnorway.no/listings/oppdal-taxi/203941/">Taxi Oppdal</Link>, tlf: 72 42 12 05.
        </Typography>
      ),
    },
  ];

  const Hero = () => (
    <Grid container className={classes.hero} alignItems="center" justifyContent="center">
      <Grid xs={12} sm={6} item container justifyContent="center">
        <Box m={2}>
          <Typography variant="h1">Hyttebooking</Typography>
          <Typography variant="overline">På denne siden blir det snart mulig å reservere indøkhyttene</Typography>
        </Box>
      </Grid>
      <Grid xs={12} sm={6} item container justifyContent="center">
        {BOOKING_DISABLED ? null : (
          <Link href="/cabins/book" passHref>
            <PermissionRequired permission="cabins.add_booking">
              <Tooltip open={!isLoggedIn} title="Du må være logget inn for booke en hytte.">
                <Button
                  variant="contained"
                  endIcon={<NavigateNextIcon />}
                  disabled={!isLoggedIn}
                  classes={{ root: classes.button }}
                >
                  Book nå
                </Button>
              </Tooltip>
            </PermissionRequired>
          </Link>
        )}
      </Grid>
      <Grid xs={12} sm={6} item container justifyContent="center">
        <Button
          className={classes.readMoreButton}
          variant="contained"
          color="primary"
          startIcon={<ExpandMoreIcon fontSize="large" />}
          onClick={() => document.querySelector("#anchorBox")?.scrollIntoView({ behavior: "smooth" })}
        >
          Les mer om Indøkhyttene
        </Button>
      </Grid>
    </Grid>
  );

  return (
    <Layout>
      <Hero />
      <Container>
        <Box my={5} id="anchorBox">
          <Paper>
            <Box p={5}>
              <Grid container alignItems="center" spacing={10} direction="column">
                <Grid item>
                  <Grid container alignItems="center" spacing={10}>
                    <Grid xs={12} sm={6} item>
                      <Box textAlign="center">
                        <Typography variant="h3">Fasiliteter</Typography>
                      </Box>
                      <Divider />
                      <Box m={3}>
                        <Grid container spacing={4} justifyContent="center">
                          {facilitiesData.map((facility) => (
                            <Grid item md={4} sm={6} xs={6} key={facility.text}>
                              <Box textAlign="center">
                                {facility.icon}
                                <Typography variant={"body2"}>{facility.text}</Typography>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid xs={12} sm={6} item>
                      <Typography variant="h3">Indøkhyttene - Oksen og Bjørnen</Typography>
                      <Divider component="br" />
                      <Typography variant="body2">
                        De to identiske nabohyttene ligger idyllisk til, kun et steinkast unna Stølen alpinsenter i
                        Oppdal. Hyttene har flere bruksområder; alt fra strategiske samlinger og egne arrangementer til
                        sosiale, spontane venneturer. Det er en gyllen mulighet til å få en liten pause fra det travle
                        bylivet. Indøks egne hyttestyre arrangerer flere forskjellige turer i løpet av året. Dette er en
                        flott mulighet til både å bli kjent med hyttene, området rundt hyttene, og å bli kjent med andre
                        indøkere på tvers av klassetrinnene. Hyttestyret har det daglige ansvaret for drift og utbedring
                        av Indøkhyttene, organisering av utleie og felles hytteturer. Du kan lese mer om hyttestyret
                        <Link href="/about/organizations/hyttestyret"> her.</Link>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container alignItems="center" spacing={10} direction="row">
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h3">Hyttenes standard</Typography>
                      <Divider component="br" />
                      <Typography variant="body2">
                        Med sine to etasjer, er Bjørnen og Oksen estimert til å romme 18 personer per hytte. Den
                        generelle standarden er tilnærmet lik et vanlig bolighus. Hyttene har innlagt strøm og vann samt
                        at de også har WiFi. I første etasje finner du to bad, hvorav ett med badstue, og tre soverom
                        med tre til fire sengeplasser per rom. I andre etasje ligger stue, kjøkken og et fjerde soverom
                        med sengeplass til tre. Dette gir totalt fjorten sengeplasser på hver hytte og ekstramadrasser
                        til de resterende seks det er estimert med. Dyner og puter til alle tjue ligger tilgjengelig,
                        men laken og sengetøy må medbringes. Kjøkkenet er utstyrt med det mest nødvendige av hvitevarer,
                        i tillegg til kaffetrakter, vannkoker og vaffeljern m.m. Basiskrydder og olje til steking skal
                        også være tilgjengelig. På hyttene ligger det et bredt utvalg brettspill, samt kortstokker. I
                        stua står det anlegg med AUX-kabel.
                      </Typography>
                    </Grid>

                    <Grid item container xs={12} sm={6} justifyContent="center" alignContent="center">
                      <Box width="90%">
                        <ImageSlider imageData={cabinImages} displayLabelText={false} />
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={5} direction="column">
                    <Grid item>
                      <Typography align="center" variant="h3">
                        Hvordan komme seg til Indøkhyttene
                      </Typography>
                    </Grid>
                    <Grid item container spacing={10} direction="row">
                      {transportData.map((transport, index) => (
                        <Grid item sm={12} md={3} key={index}>
                          <Box textAlign="center">
                            {transport.icon}
                            <Typography variant="body2">{transport.text}</Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item container spacing={10} alignItems="center" direction="row">
                  <Grid item container justifyContent="center" alignContent="center" sm={12} md={6}>
                    <Box width="90%">
                      <ImageSlider imageData={outsideImages} displayLabelText={false}></ImageSlider>
                    </Box>
                  </Grid>
                  <Grid item sm={12} md={6}>
                    <Typography variant="h3">Aktiviteter</Typography>
                    <Divider component="br" />
                    <Typography variant="body2">
                      <b>Sommer</b>: I løpet av sommerhalvåret kan man delta på moskusturer, sykkelturer, fjellturer,
                      rafting, golf, fallskjermhopping, jakt og fiske, rideturer, paintball og mye annet.
                    </Typography>
                    <Divider component="br" />
                    <Typography variant="body2">
                      <b>Vinter</b>: I løpet av vinterhalvåret er det hovedsakelig alpint og langrenn som står i
                      sentrum. Det alpine skiområdet er blant de største i Norge med 14 blå, 10 grønne, 10 røde og 5
                      svarte løyper, og normal skisesong er fra 15. november – 1. mai. Forholdene for langrenn er også
                      gode med hele fem løyper som begynner ved Stølen, alt fra 1,5 km – 15 km løyper. Se Oppdal Booking
                      for mer info.
                    </Typography>
                  </Grid>
                  <Grid item container spacing={10} alignItems="center" direction="row">
                    <Grid item container justifyContent="center" alignContent="center" xs={12}>
                      <Grid item>
                        <FAQ />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Layout>
  );
};

export default CabinsPage;
