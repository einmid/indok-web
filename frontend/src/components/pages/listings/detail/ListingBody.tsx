import { Card, CardContent, Grid, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(4),
    padding: theme.spacing(4),
  },
  description: {
    wordBreak: "break-word",
  },
}));

/**
 * component for the main body of a listing's detail
 * props: the listing to render
 */
const ListingBody: React.FC<{
  body: string;
}> = ({ body }) => {
  const classes = useStyles();

  return (
    <Grid container item xs={10} direction="column" alignItems="stretch" style={{ paddingLeft: 16, paddingRight: 16 }}>
      <Card className={classes.root}>
        <CardContent>
          <Grid container direction="column" justify="flex-start">
            <Grid item>
              <Typography variant="h4" component="h2" gutterBottom>
                Beskrivelse
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" component="span" paragraph className={classes.description}>
                {body}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ListingBody;
