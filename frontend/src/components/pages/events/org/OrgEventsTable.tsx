import { Event } from "@interfaces/events";
import { Organization } from "@interfaces/organizations";
import { HeaderValuePair } from "@interfaces/utils";
import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Grid,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import dayjs from "dayjs";
import Link from "next/link";

const eventFields: HeaderValuePair<Event>[] = [
  { header: "Navn", field: "title" },
  { header: "Antall Plasser", field: "availableSlots" },
];

const useStyles = makeStyles(() => ({
  hover: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

type Props = {
  organization: Organization;
};

const OrgEventsTable: React.FC<Props> = ({ organization }) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs>
        <Card variant="outlined">
          <CardHeader title="Arrangementer" />
          <Divider variant="middle" />
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Dato</TableCell>
                    {eventFields.map((field: HeaderValuePair<Event>) => (
                      <TableCell key={`header-${field.header}`}>{field.header}</TableCell>
                    ))}
                    <TableCell>Antall påmeldte</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(organization.events ?? []).map((event: Event) => (
                    <Link href={`${organization.id}/events/${event.id}`} passHref key={event.id}>
                      <TableRow className={classes.hover} hover>
                        <TableCell>{dayjs(event.startTime).format("HH:mm DD-MM-YYYY")}</TableCell>
                        {eventFields.map((field: HeaderValuePair<Event>) => (
                          <TableCell key={`event-${event.id}-cell-${field.field}`}>{event[field.field]}</TableCell>
                        ))}
                        <TableCell>{event.usersAttending?.length}</TableCell>
                        <TableCell>
                          <Chip
                            label={event.isFull ? "Fullt" : "Ledige Plasser"}
                            color={event.isFull ? "default" : "secondary"}
                          />
                        </TableCell>
                      </TableRow>
                    </Link>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default OrgEventsTable;
