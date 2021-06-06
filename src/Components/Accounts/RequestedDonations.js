import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles, fade } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { Button, Grid, useMediaQuery, useTheme, Paper } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import ListAltIcon from '@material-ui/icons/ListAlt'
import { grey } from '@material-ui/core/colors'
import CancelIcon from '@material-ui/icons/Cancel'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
import AddIcon from '@material-ui/icons/Add'
import { MessageOutlined } from '@material-ui/icons'
import { AccountRequestedDonationsData } from '../../Components/Common/MockData'

function RequestedDonations() {
   return (
      <Grid container spacing={2}>
         <Grid item xs={12} lg={9}>
            <DonationTabs />
         </Grid>
         <Grid item xs={false} lg={3}>
            <Paper style={{ padding: '10px' }}>
               <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                  Having Trouble?
               </Typography>

               <Typography>• Donor Guidelines</Typography>
               <Typography>• Donee Guidelines</Typography>
               <Typography style={{ fontWeight: 'bold' }}>
                  See all topics
               </Typography>
               <Box m={2} />
               <Button
                  fullWidth
                  disableElevation
                  variant="contained"
                  color="primary"
                  //className={classes.button_lightblue}
                  startIcon={<AddIcon />}
               >
                  Post a Donation
               </Button>
               <Box m={1} />
               <Button variant="outlined" color="secondary" fullWidth>
                  Need help ?
               </Button>
            </Paper>
         </Grid>
      </Grid>
   )
}

function DonationTabs() {
   const classes = useStyles()
   const [value, setValue] = useState(0)

   const handleChange = (event, newValue) => {
      setValue(newValue)
   }

   return (
      <div className={classes.root}>
         <Box boxShadow={1} borderRadius={5}>
            <div className={classes.container__search}>
               <Typography variant="h6" className={classes.text_bold}>
                  Requested Donations
               </Typography>
               <SearchField />
            </div>
            <AppBar
               position="static"
               color="default"
               elevation={0}
               className={classes.appbar}
            >
               <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
               >
                  {/* <Tab label="All" /> */}
                  <Tab label="To Be Approved" />
                  <Tab label="Ongoing" />
                  <Tab label="Claimed" />
               </Tabs>
            </AppBar>
         </Box>
         {/* <TabPanel value={value} index={0}>
            <ToBeApprovedDonation />
            <OngoingDonation />
            <CompletedDonation />
         </TabPanel> */}
         <TabPanel value={value} index={0}>
            {AccountRequestedDonationsData.filter(
               (donation) => donation.status === 'Requested'
            ).map((donation) => (
               <ToBeApprovedDonation
                  key={donation.listingID}
                  listingID={donation.listingID}
                  donationName={donation.donationName}
                  postDateTime={donation.postDateTime}
                  imgLoc={donation.imgLoc}
               />
            ))}
         </TabPanel>
         <TabPanel value={value} index={1}>
            {AccountRequestedDonationsData.filter(
               (donation) => donation.status === 'Ongoing'
            ).map((donation) => (
               <OngoingDonation
                  key={donation.listingID}
                  listingID={donation.listingID}
                  donationName={donation.donationName}
                  postDateTime={donation.postDateTime}
                  imgLoc={donation.imgLoc}
               />
            ))}
         </TabPanel>
         <TabPanel value={value} index={2}>
            {AccountRequestedDonationsData.filter(
               (donation) => donation.status === 'Claimed'
            ).map((donation) => (
               <ClaimedDonation
                  key={donation.listingID}
                  listingID={donation.listingID}
                  donationName={donation.donationName}
                  postDateTime={donation.postDateTime}
                  imgLoc={donation.imgLoc}
               />
            ))}
         </TabPanel>
      </div>
   )
}

function SearchField() {
   const classes = useStyles()
   return (
      <div className={classes.search}>
         <div className={classes.searchIcon}>
            <SearchIcon />
         </div>
         <InputBase
            placeholder="Search your listings"
            classes={{
               root: classes.inputRoot,
               input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
         />
      </div>
   )
}

function ToBeApprovedDonation(props) {
   const { listingID, donationName, postDateTime, imgLoc } = props
   const theme = useTheme()
   const responsiveLayout = useMediaQuery(theme.breakpoints.down('xs'))
   const classes = useStyles()

   return (
      <Box boxShadow={1} borderRadius={5}>
         <div className={classes.container__listingitem}>
            <img
               className={classes.image__listingitem}
               src={imgLoc}
               alt="donation"
            />
            <div className={classes.container__listingdetail}>
               <div>
                  <Typography variant="body1" className={classes.text_bold}>
                     {donationName}
                  </Typography>
                  <Typography variant="body2">
                     <span style={{ color: 'orange' }}>
                        Waiting for approval
                     </span>{' '}
                     •{' '}
                     <span style={{ fontWeight: '200' }}>
                        Requested {postDateTime}
                     </span>
                  </Typography>
               </div>
               <div className={classes.container__button}>
                  <Button
                     disableElevation
                     variant="contained"
                     className={classes.button_lightblue}
                     startIcon={<ListAltIcon />}
                     onClick={() => {
                        console.log(listingID)
                     }}
                  >
                     View listing
                  </Button>
                  <Button
                     disableElevation
                     variant="contained"
                     className={classes.button_grey}
                     style={{ marginRight: '.5rem' }}
                     startIcon={<MessageOutlined />}
                  >
                     Message
                  </Button>
                  <Button
                     disableElevation
                     variant="contained"
                     className={classes.button_grey}
                     startIcon={<CancelIcon />}
                     size="small"
                  >
                     {responsiveLayout ? 'Cancel' : 'Cancel Request'}
                  </Button>
               </div>
            </div>
         </div>
      </Box>
   )
}

function OngoingDonation(props) {
   const { listingID, donationName, postDateTime, imgLoc } = props
   const theme = useTheme()
   const responsiveLayout = useMediaQuery(theme.breakpoints.down('xs'))
   const classes = useStyles()

   return (
      <Box boxShadow={1} borderRadius={5}>
         <div className={classes.container__listingitem}>
            <img
               className={classes.image__listingitem}
               src={imgLoc}
               alt="donation"
            />
            <div className={classes.container__listingdetail}>
               <div>
                  <Typography variant="body1" className={classes.text_bold}>
                     {donationName}
                  </Typography>
                  <Typography variant="body2">
                     <span style={{ color: '#66BB6A' }}>
                        Ongoing transaction
                     </span>{' '}
                     •{' '}
                     <span style={{ fontWeight: '200' }}>
                        Approved {postDateTime}
                     </span>
                  </Typography>
               </div>
               <div className={classes.container__button}>
                  <Button
                     disableElevation
                     variant="contained"
                     className={classes.button_lightblue}
                     startIcon={<ListAltIcon />}
                     onClick={() => {
                        console.log(listingID)
                     }}
                  >
                     View listing
                  </Button>
                  <Button
                     disableElevation
                     variant="contained"
                     className={classes.button_grey}
                     startIcon={<ChatBubbleIcon />}
                  >
                     {responsiveLayout ? 'Message' : 'Send a message'}
                  </Button>
               </div>
            </div>
         </div>
      </Box>
   )
}

function ClaimedDonation(props) {
   const { listingID, donationName, postDateTime, imgLoc } = props
   const classes = useStyles()

   return (
      <Box boxShadow={1} borderRadius={5}>
         <div className={classes.container__listingitem}>
            <img
               className={classes.image__listingitem}
               src={imgLoc}
               alt="donation"
            />
            <div className={classes.container__listingdetail}>
               <div>
                  <Typography variant="body1" className={classes.text_bold}>
                     {donationName}
                  </Typography>
                  <Typography variant="body2">
                     <span style={{ color: '#8D6E63' }}>Completed</span> •{' '}
                     <span style={{ fontWeight: '200' }}>
                        Claimed {postDateTime}
                     </span>
                  </Typography>
               </div>
               <div className={classes.container__button}>
                  <Button
                     disableElevation
                     variant="contained"
                     className={classes.button_lightblue}
                     startIcon={<ListAltIcon />}
                     onClick={() => {
                        console.log(listingID)
                     }}
                  >
                     View Listing
                  </Button>
               </div>
            </div>
         </div>
      </Box>
   )
}

function TabPanel(props) {
   const { children, value, index, ...other } = props

   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`scrollable-auto-tabpanel-${index}`}
         aria-labelledby={`scrollable-auto-tab-${index}`}
         {...other}
      >
         {value === index && <Box>{children}</Box>}
      </div>
   )
}

TabPanel.propTypes = {
   children: PropTypes.node,
   index: PropTypes.any.isRequired,
   value: PropTypes.any.isRequired,
}

const useStyles = makeStyles((theme) => ({
   root: {
      width: '100%',
      borderRadius: '5px',
   },
   appbar: {
      backgroundColor: 'white',
      borderRadius: '5px',
   },
   container__search: {
      borderRadius: '5px',
      width: 'auto',
      backgroundColor: 'white',
      padding: '15px 15px 10px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      [theme.breakpoints.down('xs')]: {
         flexDirection: 'column',
      },
   },
   text_bold: {
      fontWeight: 'bold',
   },
   search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.black, 0.15),
      '&:hover': {
         backgroundColor: fade(theme.palette.common.black, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
         marginLeft: theme.spacing(1),
         width: 'auto',
      },
      [theme.breakpoints.down('xs')]: {
         marginTop: '.5rem',
      },
   },
   searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   },
   inputRoot: {
      color: 'inherit',
   },
   inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
         width: '25ch',
         '&:focus': {
            width: '30ch',
         },
      },
   },
   container__listingitem: {
      width: '100%',
      backgroundColor: 'white',
      display: 'flex',
      margin: '10px  0',
      padding: '15px',
      borderRadius: '5px',
   },
   image__listingitem: {
      width: '100px',
      height: '100px',
      borderRadius: '5px',
      marginRight: '15px',
   },
   container__listingdetail: {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
   },
   container__button: {
      alignSelf: 'flex-end',
      display: 'flex',
      justifyContent: 'flex-end',
   },
   button_grey: {
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
   button_lightblue: {
      marginRight: theme.spacing(1),
      color: '#2196F3',
      backgroundColor: '#E3F2FD',
      '&:hover': {
         backgroundColor: '#BEE4FF',
         // Reset on touch devices, it doesn't add specificity
         '@media (hover: none)': {
            backgroundColor: '#2196F3',
         },
      },
   },
}))

export default RequestedDonations
