import { Event } from "@interfaces/events";
import { Typography, Chip, useTheme, Box } from "@material-ui/core";
import Link from "next/link";
import React from "react";
import dayjs from "dayjs";
import nb from "dayjs/locale/nb";
import { UserFragment } from "src/api/generated/graphql";

const formatDate = (dateAndTime: string) => {
  return dayjs(dateAndTime).locale(nb).format(`DD.MMM YYYY, kl. HH:mm`);
};

interface Props {
  event: Event;
  user?: UserFragment | null;
  classes: any;
}

const EventListItem: React.FC<Props> = ({ event, user, classes }) => {
  const theme = useTheme();

  return (
    <Link href={`/events/${event.id}`} key={event.id}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        className={classes.eventContainer}
        style={{ borderColor: event.organization?.color ?? theme.palette.primary.main }}
      >
        <Box>
          <Typography variant="h5">{event.title}</Typography>
          <Typography variant="body2">{formatDate(event.startTime)}</Typography>

          {event.shortDescription ?? "Trykk for å lese mer"}
        </Box>

        {user && event.isAttendable && event.allowedGradeYears.includes(user.gradeYear) ? (
          event.isFull && event.userAttendance?.isOnWaitingList ? (
            <Chip label="På venteliste" />
          ) : event.isFull && !event.userAttendance?.isSignedUp ? (
            <Chip color="primary" label="Venteliste tilgjengelig" />
          ) : event.userAttendance?.isSignedUp ? (
            <Chip color="primary" label="Påmeldt" />
          ) : (
            <Chip label="Påmelding tilgjengelig" />
          )
        ) : null}
      </Box>
    </Link>
  );
};

export default EventListItem;
