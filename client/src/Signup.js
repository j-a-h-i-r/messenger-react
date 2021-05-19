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
import LeftSide from "./LeftSide";
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
    // const confirmPassword = event.target.confirmPassword.value;

    // if (password !== confirmPassword) {
    //   setFormErrorMessage({ confirmPassword: "Passwords must match" });
    //   return;
    // }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={5} md={5}>
        <LeftSide />
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
              <Typography component="div" variant="h4" align="left" color="textPrimary">
                <Box fontWeight={600} component="p">
                  Create an account.
                </Box>
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

                {/* <FormControl fullWidth required margin="normal" error={!!formErrorMessage.confirmPassword}>
                  <TextField
                    placeholder="Confirm password"
                    label="Confirm Password"
                    aria-label="confirm password"
                    type="password"
                    name="password"
                    margin="normal"
                    InputLabelProps={{shrink: true}}
                    InputProps={{style: {marginTop: '2rem'}}}
                  />
                  <FormHelperText>
                    {formErrorMessage.confirmPassword}
                  </FormHelperText>
                </FormControl> */}

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
