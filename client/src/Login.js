import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  Paper,
  CssBaseline,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { login } from "./store/utils/thunkCreators";
import LeftSide from './LeftSide';
import { ShadowButton } from './Button';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  paper: {
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

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={5} md={5}>
        <LeftSide />
      </Grid>

      <Grid item xs={12} sm={7} md={7} component={Paper} elevation={0} square>
        <div className={classes.paper}>
          <Grid container justify="flex-end" alignItems="center">
            <Grid item>
              <Typography component="span" color="secondary" className={classes.accountCreateSubtitle}>
                  Don't have an account?
              </Typography>

              <ShadowButton
                type="button"
                variant="text"
                color="primary"
                onClick={() => history.push("/register")}
              >
                Create Account
              </ShadowButton>

            </Grid>
          </Grid>

          <Grid container justify="center">
            <Grid item sm={8} md={8}>
              <Typography component="div" variant="h4">
                <Box fontWeight={600} component="p">
                  Welcome back!
                </Box>
              </Typography>

              <form className={classes.form} onSubmit={handleLogin} noValidate>

                <FormControl fullWidth required margin="normal">
                  <TextField
                    aria-label="username"
                    label="E-mail address"
                    placeholder="Your email"
                    name="username"
                    type="text"
                    margin="normal"
                    InputLabelProps={{shrink: true}}
                    InputProps={{style: {marginTop: '2rem'}}}
                  />
                </FormControl>

                <FormControl fullWidth required margin="normal">
                  <TextField
                    placeholder="Your password"
                    label="Password"
                    aria-label="Password"
                    type="password"
                    name="password"
                    margin="normal"
                    InputLabelProps={{shrink: true}}
                    InputProps={{style: {marginTop: '2rem'}}}
                  />
                </FormControl>

                <Grid justify="center" container>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Login
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
