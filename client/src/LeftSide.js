import { makeStyles } from "@material-ui/core" 
import bgImg from './assets/images/bg-img.png';
import bubbleSvg from './assets/images/bubble.svg';

const useStyles = makeStyles((theme) => ({
  image: {
    backgroundImage: `url(${bgImg})`,
    objectFit: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100%',
    position: 'relative',
  },
  imageText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    color: 'white',
    fontSize: '1.8rem',
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

const LeftSide = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.image}>
      <div className={classes.imageOverlay}>
        <img src={bubbleSvg} className={classes.chatBubble} alt="Chat bubble icon"></img>
        <div className={classes.imageText}>
          Converse with anyone with any language
        </div>
      </div>
    </div>
  )
}

export default LeftSide;