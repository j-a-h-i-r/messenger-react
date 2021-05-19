import { makeStyles, Card, CardMedia, Typography, Box } from "@material-ui/core" 
import bgImg from './assets/images/bg-img.png';
import bubbleSvg from './assets/images/bubble.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    height: '100vh',
    width: '100%',
    border: 0,
  },
  overlayText: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    color: "white",
    fontSize: "1.8rem",
  },
  imageOverlay: {
    position: 'absolute',
    backgroundImage: 'linear-gradient(180deg, rgb(58 141 255 / 85%) 0%, rgb(134 185 255 / 85%) 100%)',
    width: '100%',
    height: '100%',
  },
  chatBubble: {
    position: "absolute",
    top: "35%",
    left: "50%",
    transform: 'translate(-50%, -50%)',
  }
}))

const AuthLeftSide = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined" square>
        <Box className={classes.imageOverlay}></Box>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          image={bgImg}
          title="Contemplative Reptile"
        />
        <img src={bubbleSvg} className={classes.chatBubble} alt="Chat bubble icon"></img>
        <Typography
          gutterBottom
          variant="h1"
          component="h1"
          className={classes.overlayText}
        >
          Converse with anyone with any language
        </Typography>
    </Card>
  )
}

export default AuthLeftSide;