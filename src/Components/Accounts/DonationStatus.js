import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import StyledAppBar from '../Common/StyledAppBar'
import {
   Avatar,
   Button,
   Chip,
   Divider,
   Grid,
   Paper,
   Typography,
   useMediaQuery,
   fade,
} from '@material-ui/core'
import LeftDrawer from '../Common/LeftDrawer'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import MainContainer from '../Common/MainContainer'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import EventAvailableIcon from '@material-ui/icons/EventAvailable'
import ScheduleIcon from '@material-ui/icons/Schedule'
import MapImage from './pickup_map.png'
import DialogDrawer from '../Common/DialogDrawer'
import ShareIcon from '@material-ui/icons/Share'
import { grey, red } from '@material-ui/core/colors'

import {
   AvailableStatus,
   ToApproveStatus,
   OngoingStatus,
   CompletedStatus,
} from './DonorStatus'
// returns a page that displays the details of the donation when user clicks on a donation listing
export default function DonationStatus() {
   const classes = useStyles()
   const theme = useTheme()
   // decides what screen size should be considered as a responsive layout - below 960px
   const responsiveLayout = useMediaQuery(theme.breakpoints.down('sm'))

   return (
      <div className={classes.root}>
         <CssBaseline />
         <StyledAppBar />
         {!responsiveLayout && <ActionDrawer />}
         <MainContainer>
            {responsiveLayout && <ActionDrawerResponsive />}
            <Grid container justify="center">
               <DonationImages />
               <DonationDetails />
            </Grid>
         </MainContainer>
      </div>
   )
}
// returns a left drawer that allows user to view the donor's name, message the donor, and request the listing
function ActionDrawer() {
   return (
      <LeftDrawer>
         <BackButton />
         <DonorStatus />
      </LeftDrawer>
   )
}
// returns a dialog drawer that displays when the screen reaches responsive layout
function ActionDrawerResponsive() {
   const classes = useStyles()

   return (
      <div className={classes.container__drawer_responsive}>
         <BackButton />
         <DialogDrawer
            buttonName="actions"
            dialogTitle="Action Filters"
         ></DialogDrawer>
      </div>
   )
}

function DonorStatus() {
   const classes = useStyles()
   return (
      <>
         <Title title="Listing Status" />
         <CompletedStatus />
         <Typography className={classes.text_margintop}>
            Listed <span style={{ fontWeight: 'bold' }}>7h</span> ago by
         </Typography>
         <DonorAvatar />
         <Divider className={classes.divider_margin} />
         <Button
            disableElevation
            variant="contained"
            className={classes.button_grey}
            startIcon={<ShareIcon />}
         >
            Share
         </Button>
      </>
   )
}

function Title(props) {
   const classes = useStyles()
   return (
      <div>
         <Typography
            className={classes.title}
            gutterBottom
            variant="h5"
            component="h2"
         >
            {props.title}
         </Typography>
      </div>
   )
}

// returns a return to listings button
function BackButton() {
   return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
         <ArrowBackIcon fontSize="small" />
         <div style={{ width: '.5rem' }}></div>
         <Typography>Back</Typography>
      </div>
   )
}
// returns the donor's avatar and name
function DonorAvatar() {
   const classes = useStyles()
   return (
      <div className={classes.container__avatar}>
         <Avatar className={classes.avatar__color}>FB</Avatar>
         <Typography
            variant="body1"
            component="p"
            className={classes.text_bold}
         >
            Fhillip Bagsic
         </Typography>
      </div>
   )
}

function DonationImages(props) {
   const classes = useStyles()
   const image =
      'https://i.pinimg.com/originals/3a/01/1d/3a011d76e93823db300009c39a039af4.jpg'

   return (
      <Grid
         container
         item
         xs={12}
         lg={6}
         direction="column"
         className={classes.container}
      >
         <Typography variant="h6" className={classes.container__title}>
            Donation Images
         </Typography>
         <Paper className={classes.container__paper}>
            <img
               src={image}
               alt="pancit canton"
               className={classes.image__mainPreview}
            />
         </Paper>
      </Grid>
   )
}
// returns the details of the donation, has multiple child components
function DonationDetails(props) {
   const classes = useStyles()

   return (
      <Grid
         container
         item
         xs={12}
         lg={6}
         direction="column"
         className={classes.container}
      >
         <Typography variant="h6" className={classes.container__title}>
            Item Details
         </Typography>
         <Paper className={classes.container__paper}>
            <Typography variant="h6" className={classes.text_bold}>
               Lucky Me Pancit Canton Noodles
            </Typography>
            <DistanceFromDonee />
            <ChipCategory />
            <DonationQuantity />
            <DonationExpiry />
            <DonationNotes />
            <Map />
            <Pickup />
         </Paper>
      </Grid>
   )
}
// returns the distance from the user
function DistanceFromDonee() {
   const classes = useStyles()

   return (
      <div className={classes.container__distanceAway}>
         <LocationOnIcon color="secondary" />
         <Typography>3 kilometers away</Typography>
      </div>
   )
}
// returns the food category of the donation
function ChipCategory() {
   const classes = useStyles()

   return (
      <div className={classes.container__chipCategory}>
         <Chip label="Instant Noodles" color="primary" />
      </div>
   )
}
// returns the quantity of the donation
function DonationQuantity() {
   const classes = useStyles()

   return (
      <Typography>
         <span className={classes.text_bold}>Quantity:</span> 5 pieces
      </Typography>
   )
}
// returns the expiry date of the donation
function DonationExpiry() {
   const classes = useStyles()

   return (
      <div style={{ margin: '5px 0' }}>
         <Typography>
            The expiry date is on{' '}
            <span className={classes.text_bold}>June 07, 2021</span>. Exactly 2
            weeks and 3 days from now.
         </Typography>
      </div>
   )
}
function DonationNotes() {
   const classes = useStyles()

   return (
      <>
         <Typography className={classes.text_bold}>Donation Notes</Typography>
         <Typography>
            If you are interested, text me on my number 09123456789 or message
            me instead here.
         </Typography>
      </>
   )
}
// returns a map that shows approximate pickup location
function Map() {
   const classes = useStyles()

   return (
      //<div style={{width: '100%', height: '150px'}}>
      <img className={classes.image__map} src={MapImage} alt="map" />
      //</div>
   )
}
// returns pickup details - the pickup location, date, and time
function Pickup() {
   const classes = useStyles()

   return (
      <>
         <div className={classes.container__pickup}>
            <LocationOnIcon
               className={`${classes.icon_pickup} ${classes.icon__location_green}`}
            />
            <Typography>
               Pick up location is around{' '}
               <span className={classes.text__address_highlighted}>
                  {' '}
                  Jhocson St., Sampaloc, Manila
               </span>
               .
            </Typography>
         </div>
         <div className={classes.container__pickup}>
            <EventAvailableIcon
               className={`${classes.icon_pickup} ${classes.icon__date_orange}`}
            />
            <Typography>
               Pick up date is on{' '}
               <span className={classes.text_bold}> June 06, 2021</span>.
            </Typography>
         </div>
         <div className={classes.container__pickup}>
            <ScheduleIcon
               className={`${classes.icon_pickup} ${classes.icon__time_purple}`}
            />
            <Typography>
               Pick up time is in the afternoon,{' '}
               <span className={classes.text_bold}> between 12pm to 5pm</span>.
            </Typography>
         </div>
      </>
   )
}

const useStyles = makeStyles((theme) => ({
   root: {
      display: 'flex',
   },
   container: {
      maxWidth: '700px',
      height: '100%',
      padding: theme.spacing(1, 3),
   },
   title: {
      fontWeight: 'bold',
      marginTop: '.5rem',
      marginBottom: '1rem',
   },
   container__paper: {
      padding: theme.spacing(2.5),
   },
   container__title: {
      fontWeight: 'bold',
      marginBottom: '10px',
   },
   text_bold: {
      fontWeight: 'bold',
   },
   text_margintop: {
      marginTop: 'auto',
   },
   divider_margin: {
      margin: theme.spacing(1.5, 0),
   },
   button__report: {
      marginTop: 'auto',
   },
   container__drawer_responsive: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '10px',
   },
   container__avatar: {
      display: 'flex',
      alignItems: 'center',
   },
   avatar__color: {
      marginRight: '10px',
   },
   image__mainPreview: {
      width: '100%',
      height: '450px',
   },
   container__subImages: {
      display: 'flex',
      justifyContent: 'flex-start',
      width: '100%',
      height: '100px',
   },
   image__subImage: {
      width: '25%',
      padding: '3px',
      cursor: 'pointer',
   },
   image__sub: {
      width: '100%',
      height: '100%',
      borderRadius: theme.spacing(0.5),
   },
   container__distanceAway: {
      display: 'flex',
      margin: '5px 0',
   },
   container__chipCategory: {
      display: 'flex',
      margin: '10px 0',
   },
   image__map: {
      height: '200px',
      width: '100%',
   },
   container__pickup: {
      display: 'flex',
      alignItems: 'center',
      margin: '10px 0',
   },
   icon_pickup: {
      marginRight: theme.spacing(0.5),
   },
   icon__location_green: {
      color: '#66BB6A',
   },
   text__address_highlighted: {
      fontWeight: 'bold',
      color: '#2196F3',
   },
   icon__date_orange: {
      color: '#FFA726',
   },
   icon__time_purple: {
      color: '#AB47BC',
   },
   button_grey: {
      marginTop: '1rem',
      color: theme.palette.getContrastText(grey[500]),
      backgroundColor: grey[300],
      '&:hover': {
         backgroundColor: grey[400],
         // Reset on touch devices, it doesn't add specificity
         '@media (hover: none)': {
            backgroundColor: grey[300],
         },
      },
   },
   button_green: {
      marginBottom: '.5rem',
      color: 'white',
      backgroundColor: '#66BB6A',
      '&:hover': {
         backgroundColor: '#5BA85F',
         // Reset on touch devices, it doesn't add specificity
         '@media (hover: none)': {
            backgroundColor: '#66BB6A',
         },
      },
   },

   button__text_red: {
      color: red[500],
      '&:hover': {
         backgroundColor: fade(red[500], theme.palette.action.hoverOpacity),
         // Reset on touch devices, it doesn't add specificity
         '@media (hover: none)': {
            backgroundColor: 'transparent',
         },
      },
   },
   button_red: {
      marginTop: '.5rem',
      border: `1px solid ${fade(red[500], 0.5)}`,
      '&:hover': {
         border: `1px solid ${red[500]}`,
      },
   },
}))
