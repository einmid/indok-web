import {
  Dialog,
  DialogContent,
  Typography,
  TextField,
  DialogActions,
  Button,
  Tooltip,
  Grid,
  Box,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import React, { Dispatch, SetStateAction } from "react";
import { SendEmailProps } from ".";
import ClearIcon from "@material-ui/icons/Clear";
import SendIcon from "@material-ui/icons/Send";

interface EmailFormDialogProps {
  showEmailForm: boolean;
  setShowEmailForm: Dispatch<SetStateAction<boolean>>;
  emailProps: SendEmailProps;
  setEmailProps: Dispatch<SetStateAction<SendEmailProps>>;
  validations: { subject: boolean; content: boolean };
  sendEmail: () => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    form: {
      border: "0px solid black",
    },
  })
);

const EmailFormDialog = ({
  showEmailForm,
  setShowEmailForm,
  emailProps,
  setEmailProps,
  validations,
  sendEmail,
}: EmailFormDialogProps) => {
  const classes = useStyles();
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={showEmailForm}
      onClose={(_e) => setShowEmailForm(false)}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogContent>
        <Grid
          container
          item
          sm={12}
          md={6}
          direction="column"
          spacing={3}
          className={classes.form}
          alignContent="center"
          style={{ margin: "auto" }}
        >
          <Grid item>
            <Typography variant="h5">Send en e-post til alle påmeldte</Typography>
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              required
              onChange={(e) => setEmailProps({ ...emailProps, subject: e.currentTarget.value })}
              label="Emne"
            />
          </Grid>
          <Grid item>
            <TextField
              multiline
              fullWidth
              required
              onChange={(e) => setEmailProps({ ...emailProps, content: e.currentTarget.value })}
              label="E-post-innhold"
              rows={4}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button startIcon={<ClearIcon />} onClick={(_e) => setShowEmailForm(false)} color="primary">
          Lukk
        </Button>

        <Tooltip disableHoverListener={Object.values(validations).every(Boolean)} title="Du må fylle inn alle feltene.">
          <Box>
            <Button
              startIcon={<SendIcon />}
              disabled={!Object.values(validations).every(Boolean)}
              onClick={(_e) => sendEmail()}
              color="primary"
            >
              {/* <SendIcon style={{ margin: "5px" }} /> */}
              Send e-post
            </Button>
          </Box>
        </Tooltip>
      </DialogActions>
    </Dialog>
  );
};

export default EmailFormDialog;
