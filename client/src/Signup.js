import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { register } from "./store/utils/thunkCreators";
import AuthLeftSide from "./AuthLeftSide";
import { ShadowButton } from "./Button";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  accountCreateSubtitle: {
    marginRight: '1rem',
  },
  button: {
    padding: '1rem 2rem',
  },
  headline: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    fontWeight: 600,
  }
}));

const Signup = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={5} md={5}>
        <AuthLeftSide />
      </Grid>

      <Grid item xs={12} sm={7} md={7} component={Paper} elevation={0} square>
        <div className={classes.paper}>
          <Grid container justify="flex-end" alignItems="center">
            <Grid item>
              <Typography component="span" color="secondary" className={classes.accountCreateSubtitle}>
                Already have an account?
              </Typography>

              <ShadowButton
                type="button"
                variant="text"
                color="primary"
                onClick={() => history.push("/login")}
              >
                Login
              </ShadowButton>

            </Grid>
          </Grid>

          <Grid container justify="center">
            <Grid item sm={8} md={8}>
              <Typography component="h4" variant="h4" align="left" color="textPrimary" className={classes.headline}>
                Create an account.
              </Typography>

              <form className={classes.form} onSubmit={handleRegister}>

                <FormControl fullWidth required margin="normal">
                  <TextField
                    aria-label="username"
                    label="Username"
                    placeholder="Your username"
                    name="username"
                    type="text"
                    margin="normal"
                    InputLabelProps={{shrink: true}}
                    InputProps={{style: {marginTop: '2rem'}}}
                  />
                </FormControl>

                <FormControl fullWidth required margin="normal">
                  <TextField
                    aria-label="email"
                    label="E-mail address"
                    placeholder="Your email"
                    name="email"
                    type="text"
                    margin="normal"
                    InputLabelProps={{shrink: true}}
                    InputProps={{style: {marginTop: '2rem'}}}
                  />
                </FormControl>

                <FormControl fullWidth required margin="normal" error={!!formErrorMessage.confirmPassword}>
                  <TextField
                    placeholder="Your password"
                    label="Password"
                    aria-label="Password"
                    type="password"
                    name="password"
                    margin="normal"
                    InputLabelProps={{shrink: true}}
                    InputProps={{style: {marginTop: '2rem'}}}
                    inputProps={{ minLength: 6 }}
                  />
                  <FormHelperText>
                    {formErrorMessage.confirmPassword}
                  </FormHelperText>
                </FormControl>

                <Grid justify="center" container>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Create
                  </Button>
                </Grid>

              </form>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
