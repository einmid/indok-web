import { useQuery } from "@apollo/client";
import LoginRequired from "@components/authentication/LoginRequired";
import PermissionRequired from "@components/permissions/PermissionRequired";
import { GET_SERVER_TIME } from "@graphql/utils/time/queries";
import { Event } from "@interfaces/events";
import { User } from "@interfaces/users";
import { Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Warning } from "@material-ui/icons";
import React from "react";
import CountdownButton from "./CountdownButton";
import { Alert as MuiAlert } from "@material-ui/lab";
import Link from "next/link";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  wrapIcon: {
    alignItems: "center",
    display: "inline-flex",
    width: "100%",
    marginBottom: theme.spacing(1),

    "& > svg": {
      height: "unset",
      marginRight: theme.spacing(2),
    },
  },
  extraInformation: {
    position: "relative",
    float: "right",
    paddingRight: "1em",
    paddingBottom: "1em",
  },
  boughtTicket: {
    width: "fit-content",
    marginLeft: "10%",
  },
  payButton: {
    marginLeft: "20px",
  },
}));

/*
 * What to show where the sign up button should be (if possible to sign up)
 */

type Props = {
  event: Event;
  user?: User;
  loading: boolean;
  extraInformation?: string;
  onClick: () => void;
  onExtraInformationChange: (info: string) => void;
};

const SignUpVariants: React.FC<Props> = ({
  event,
  user,
  loading,
  onClick,
  extraInformation,
  onExtraInformationChange,
}) => {
  const classes = useStyles();

  const router = useRouter();

  const { data: timeData, error: timeError } = useQuery(GET_SERVER_TIME, { fetchPolicy: "network-only" });

  const noPhoneNumberNorAlreadySignedUp =
    !user?.phoneNumber && !event.userAttendance?.isSignedUp && !event.userAttendance?.isOnWaitingList;

  const requiresExtraInfoAndNotAlreadySignedUp =
    event.hasExtraInformation && !event.userAttendance?.isSignedUp && !event.userAttendance?.isOnWaitingList;

  const bindingSignupAndAlreadySignpedUp = event.attendable?.bindingSignup && event.userAttendance?.isSignedUp;

  const requiresExtraInfoAndExtraInfroNotFilledIn =
    event.hasExtraInformation &&
    !extraInformation &&
    !event.userAttendance?.isSignedUp &&
    !event.userAttendance?.isOnWaitingList;

  if (!event.attendable) return null;

  if (timeError || !timeData)
    return (
      <Typography variant="h5" gutterBottom>
        Kunne ikke hente tidspunkt.
      </Typography>
    );

  if (!user) return <LoginRequired redirect />;

  if (!event.allowedGradeYears.includes(user.gradeYear))
    return (
      <Typography variant="h5" gutterBottom>
        Ikke aktuell
      </Typography>
    );

  return (
    <>
      <PermissionRequired permission="events.add_signup">
        {noPhoneNumberNorAlreadySignedUp && (
          <Typography variant="body1" color="error" className={classes.wrapIcon}>
            <Warning fontSize="small" />
            Du må oppgi et telefonnummer på brukeren din for å kunne melde deg på
          </Typography>
        )}

        {requiresExtraInfoAndNotAlreadySignedUp && (
          <TextField
            className={classes.extraInformation}
            label="Ekstrainformasjon"
            multiline
            rows={2}
            required
            placeholder="Skriv her..."
            variant="outlined"
            onChange={(e) => onExtraInformationChange(e.target.value)}
          />
        )}

        {event.attendable && (
          <CountdownButton
            countDownDate={event.attendable?.signupOpenDate}
            deadline={event.attendable?.deadline}
            isSignedUp={event.userAttendance?.isSignedUp ?? false}
            isOnWaitingList={event.userAttendance?.isOnWaitingList ?? false}
            isFull={event.isFull}
            loading={loading}
            disabled={
              noPhoneNumberNorAlreadySignedUp ||
              bindingSignupAndAlreadySignpedUp ||
              requiresExtraInfoAndExtraInfroNotFilledIn
            }
            onClick={onClick}
            currentTime={timeData.serverTime}
          />
        )}
        {event.product &&
          event.userAttendance?.isSignedUp &&
          (event.userAttendance.hasBoughtTicket ? (
            <MuiAlert severity="success" className={classes.boughtTicket}>
              Du har betalt for billett
            </MuiAlert>
          ) : (
            <Link
              href={`/ecommerce/checkout?productId=${event.product.id}&quantity=1&redirect=${router.asPath}`}
              passHref
            >
              <Button size="large" variant="contained" color={"primary"} className={classes.payButton}>
                Gå til betaling
              </Button>
            </Link>
          ))}
      </PermissionRequired>
    </>
  );
};

export default SignUpVariants;