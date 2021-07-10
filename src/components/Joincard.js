import React from 'react'
import JoinImg from '../assets/bg.jpg'
import { Button,makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring'; // web.cjs is required for IE 11 support
import Img2 from '../assets/EduPulse.png';
import { Icon } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GoogleAuth from './OAuth/googleAuth.js'
import MsAuth from './OAuth/msAuth.js'

const useStyles = makeStyles((theme)=>({
    card: {
        backgroundImage:`url(${JoinImg})`,
        color:'#4411A8',
        padding:'20px 20px',
        height:'200px',
        borderRadius:'15px',
        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
    },
    joinButton: {
        borderRadius:'50px',
        padding: theme.spacing(1,6),
        margin: theme.spacing(1,0),
        fontWeight: '700'
    },
    text1:{
        fontWeight:'400',
        color:'black',
        margin: theme.spacing(0,0,0,0),  
    },
    text2:{
        margin: theme.spacing(0,0,2,0),  
    },
    text3:{
        fontWeight:'400',
        color:'black',
        margin: theme.spacing(6,0,0,0),  
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: '#DFDAE8',
        borderRadius: '15px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width:'250px',
        height:'400px'
      },
      logo:{
        width:'70px',
        height:'70px',
        borderRadius: '6px',
        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '20px'
      },
      usericon:{
        width:'130px',
        height:'130px',
        display: 'block',
        margin: '20px auto',
      },
      authicons:{
        display: 'block',
        marginLeft: '17.5px',
        marginRight: 'auto',
        marginTop: '40px'
      }
}))

const Fade = React.forwardRef(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
      from: { opacity: 0 },
      to: { opacity: open ? 1 : 0 },
      onStart: () => {
        if (open && onEnter) {
          onEnter();
        }
      },
      onRest: () => {
        if (!open && onExited) {
          onExited();
        }
      },
    });
  
    return (
      <animated.div ref={ref} style={style} {...other}>
        {children}
      </animated.div>
    );
  });
  
  Fade.propTypes = {
    children: PropTypes.element,
    in: PropTypes.bool.isRequired,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
  };

  

function Joincard() {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    return (
        <div className={classes.card}>
            <h2 className={classes.text1}>Welcome to</h2>
            <h1 className={classes.text2}>EduPulse</h1>
            <h4 className={classes.text3}>Still haven't joined with us?</h4>
            <Button variant="outlined" color="secondary" className={classes.joinButton} onClick={handleOpen}> Join </Button>

            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                <div className={classes.paper}>
                    <img src={Img2} alt="logo" className={classes.logo}/>
                    <Icon color="primary">
                        <AccountCircleIcon className={classes.usericon}/>
                    </Icon>
                    
                    <div className={classes.authicons}>
                    <GoogleAuth/>
                    <MsAuth/>
                    </div>
                </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default Joincard