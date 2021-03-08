import { useQuery } from "@apollo/client";
import { GET_USER } from "@graphql/auth/queries";
import { GET_EVENTS, GET_DEFAULT_EVENTS, QUERY_USER_ATTENDING_EVENT } from "@graphql/events/queries";
import { Event } from "@interfaces/events";
import { User } from "@interfaces/users";
import {
  Button,
  Grid,
  Typography,
  CircularProgress,
  Paper,
  Tabs,
  Tab,
  Container,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import { PlusSquare } from "react-feather";
import React, { useState } from "react";
import { DATAPORTEN_SCOPES, generateAuthURL } from "../../../navbar/utils";
import FilterMenu from "./FilterMenu/index";
import EventListItem from "./EventListItem";

export interface FilterQuery {
  organization?: string;
  category?: string;
  startTime?: string;
  endTime?: string;
}

const signInURL = generateAuthURL(
  process.env.NEXT_PUBLIC_DATAPORTEN_ID,
  process.env.NEXT_PUBLIC_DATAPORTEN_STATE,
  process.env.NEXT_PUBLIC_DATAPORTEN_REDIRECT_URI,
  DATAPORTEN_SCOPES
);

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 0,
  },
  tabsContainer: {
    width: "fit-content",
    float: "left",
  },
  tabs: {},
  progessContainer: {
    paddingLeft: "45%",
    paddingTop: theme.spacing(6),
  },
  headerContainer: {
    padding: 0,
  },
  createButtonContainer: {
    width: "fit-content",
    float: "right",
  },
  grid: {
    padding: theme.spacing(3),
    paddingTop: theme.spacing(2),
  },
  eventContainer: {
    border: "solid",
    borderWidth: "0.05em 0.05em 0.05em 1.2em",
    borderRadius: "0.2em",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: "#fff",
    ["&:hover"]: {
      cursor: "pointer",
      backgroundColor: "#f5f5f5",
    },
  },
  signedUpBox: {
    marginTop: "auto",
    marginBottom: "auto",
    color: "#ffffff",
    background: theme.palette.primary.main,
    borderRadius: "5px",
    padding: "0.2em 0.5em",
  },
  signUpAvailableBox: {
    marginTop: "auto",
    marginBottom: "auto",
    color: "#ffffff",
    background: "#93bfa6",
    borderRadius: "5px",
    padding: "0.2em 0.5em",
  },
  fullBox: {
    marginTop: "auto",
    marginBottom: "auto",
    color: "#ffffff",
    background: "#db2e3f",
    borderRadius: "5px",
    padding: "0.2em 0.5em",
  },
  shortDescriptionText: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
}));

const AllEvents: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [filters, setFilters] = useState({});
  const [showDefaultEvents, setShowDefaultEvents] = useState(true);
  const [showCalenderView, setShowCalenderView] = useState(false);
  const { loading: userLoading, error: userError, data: userData } = useQuery<{ user: User }>(GET_USER);

  const { loading: eventsLoading, error: eventsError, data: eventsData, refetch } = useQuery(GET_EVENTS, {
    variables: filters,
  });
  const { loading: defaultEventsLoading, error: defaultEventsError, data: defaultEventsData } = useQuery(
    GET_DEFAULT_EVENTS
  );
  const error = showDefaultEvents ? defaultEventsError : eventsError;
  const loading = showDefaultEvents ? defaultEventsLoading : eventsLoading;
  if (error) return <Typography variant="body1">Kunne ikke hente arrangementer.</Typography>;
  const data = showDefaultEvents ? defaultEventsData?.defaultEvents : eventsData?.allEvents;

  const onChange = (newFilters: FilterQuery) => {
    if (Object.keys(newFilters).length > 0 && showDefaultEvents) setShowDefaultEvents(false);
    setFilters(newFilters);
    refetch(newFilters);
  };

  return (
    <Container className={classes.container}>
      <Container className={classes.headerContainer}>
        <Container className={classes.tabsContainer}>
          <Paper square>
            <Tabs
              value={showCalenderView ? 1 : 0}
              onChange={() => setShowCalenderView(!showCalenderView)}
              indicatorColor="primary"
              textColor="primary"
              className={classes.tabs}
            >
              <Tab label="Liste" />
              <Tab label="Kalender" />
            </Tabs>
          </Paper>
        </Container>

        {/* Holder knappen for å opprette arrangementer skjult til det funker
        {userData && !userLoading && userData.user && !userError && (
          // TODO: Redirect til `/events/create-event` når vi har funksjonalitet for dette.
          <Container className={classes.createButtonContainer}>
            <Link href={`/events/create-event`}>
              <Button color="primary" disableRipple>
                <PlusSquare />
                <Typography variant="body1">Opprett</Typography>
              </Button>
            </Link>
          </Container>
        )}  
        */}
      </Container>

      <Grid container className={classes.grid}>
        <Grid item xs={3}>
          <FilterMenu
            filters={filters}
            onFiltersChange={onChange}
            showDefaultEvents={showDefaultEvents}
            onShowDefaultChange={setShowDefaultEvents}
          />
        </Grid>
        <Grid item xs>
          {loading ? (
            <Container className={classes.progessContainer}>
              <CircularProgress />
            </Container>
          ) : showCalenderView ? (
            <Typography variant="body1">Kommer snart! :)</Typography>
          ) : (
            <>
              {data === undefined || data.length === 0 ? (
                <Typography variant="body1">Ingen arrangementer passer til valgte filtre.</Typography>
              ) : (
                data.map((event: Event) => (
                  <EventListItem
                    key={event.id}
                    event={event}
                    userIsValid={userData && !userLoading && userData.user && !userError}
                    user={userData?.user}
                    classes={classes}
                  />
                ))
              )}
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default AllEvents;
