import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  useTheme,
} from "@material-ui/core";
import Image from "next/image";
import Link from "next/link";
import useStyles from "./styles";

type Props = {
  title: string;
  actionText?: string;
  actionLink?: string;
  image?: StaticImageData;
  alt: string;
};

const ProfileCard: React.FC<Props> = ({ title, children, actionText, actionLink, image, alt }) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Card className={classes.fullHeightCard}>
      <Grid container direction="row" alignItems="center">
        <Grid item xs>
          <CardHeader title={title} />
          <CardContent>{children}</CardContent>
          {actionText && actionLink && (
            <CardActionArea>
              <Link passHref href={actionLink}>
                <CardActions>
                  <Typography variant="overline" color="textPrimary">
                    {actionText}
                  </Typography>
                </CardActions>
              </Link>
            </CardActionArea>
          )}
        </Grid>
        {image && (
          <Grid item xs={3} style={{ marginRight: theme.spacing(4) }}>
            <Image src={image} layout="responsive" objectFit="contain" alt={alt} />
          </Grid>
        )}
      </Grid>
    </Card>
  );
};

export default ProfileCard;
