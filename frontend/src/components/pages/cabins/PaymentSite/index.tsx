import { NextPage } from "next";
import { Grid, Typography, Divider, Hidden } from "@material-ui/core";
import { Cabin, ContactInfo } from "@interfaces/cabins";
import { DatePick } from "src/pages/cabins/book";
import CabinBookingStatus from "../CabinBookingStatus";

interface Props {
  chosenCabins: Cabin[];
  datePick: DatePick;
  contactInfo: ContactInfo;
}

const PaymentSite: NextPage<Props> = (props) => {
  return (
    <Grid container alignItems="center" direction="column" spacing={5}>
      <Hidden mdDown>
        <Grid item>
          <Typography variant="h4">Se igjennom og betal</Typography>
          <Divider />
        </Grid>
      </Hidden>

      <Grid item container justify="space-evenly" alignItems="stretch">
        <Grid item>
          <CabinBookingStatus {...props} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PaymentSite;
