import { useQuery } from "@apollo/client";
import { QUERY_CABINS } from "@graphql/cabins/queries";
import { Cabin } from "@interfaces/cabins";
import { Divider, Grid, Typography } from "@material-ui/core";

/*
Shows an overview of cabin prices. Fetches the prices from the Cabin model.
*/
const CabinPrices: React.VFC = () => {
  const cabinQuery = useQuery<{ cabins: Cabin[] }>(QUERY_CABINS);
  const cabins = cabinQuery?.data?.cabins;

  return (
    <Grid container spacing={10}>
      <Grid item xs={12} sm={6}>
        <Typography variant="h3">Priser</Typography>
        <Divider component="br" />
        <Typography variant="body2">
          Sengeplasser kan bookes for grupper under 10 personer, med minst en indøker. Hele hytta kan bookes for både interne og eksterne, se pris.
        </Typography>
      </Grid>
      <Grid item container xs={12} sm={6} spacing={2}>
        <Grid item container alignContent="center" justifyContent="center" md={6}>
          <Typography variant="body2" align="center">
            <b>Enkeltperson</b>
            <br />
            Indøker: 110 kr per sengeplass.
            <br />
            Ikke-indøkere: 270 kr per sengeplass.
          </Typography>
        </Grid>
        <Grid item container alignContent="center" justifyContent="center" md={6}>
          <Typography variant="body2" align="center">
            <b>Hel hytte</b>
            {cabins?.map((cabin) => (
              <>
                <Typography variant="body2">
                  <i>{cabin.name}</i>
                </Typography>
                <Typography variant="body2">Internpris: {cabin.internalPrice} kr</Typography>
                <Typography variant="body2">Eksternpris: {cabin.externalPrice} kr</Typography>
              </>
            ))}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CabinPrices;
