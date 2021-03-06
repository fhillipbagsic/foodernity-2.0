import React, { useState, useEffect } from 'react'
import { makeStyles, fade } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import HourglassFullIcon from '@material-ui/icons/HourglassFull'
import CheckIcon from '@material-ui/icons/Check'
import {
   Button,
   Chip,
   Dialog,
   DialogContent,
   DialogTitle,
   Divider,
   Grid,
   useMediaQuery,
   useTheme,
   Avatar,
} from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import ChatIcon from '@material-ui/icons/Chat'
import { grey } from '@material-ui/core/colors'
import PriorityHighIcon from '@material-ui/icons/PriorityHigh'
import { Icon } from '@iconify/react'
import bxsDonateHeart from '@iconify-icons/bx/bxs-donate-heart'
import { useMessageStore } from '../../store/MessageStore'

export default function Posted() {
   return (
      <Grid container spacing={2}>
         <Grid item xs={12}>
            <DonationTabs />
         </Grid>
         {/* <Grid item xs={false} lg={3}>
            <Help />
         </Grid> */}
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
                  My Donations
               </Typography>
               {/* <SearchField /> */}
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
                  variant="fullWidth"
               >
                  <Tab label="To be accepted" />
                  <Tab label="To be claimed" />
                  <Tab label="Claimed" />
                  <Tab label="Donated" />
               </Tabs>
            </AppBar>
         </Box>

         <TabPanel value={value} index={0}>
            <Grid container spacing={2} style={{ marginTop: '.5rem' }}>
               <Grid item xs={12}>
                  <Box
                     bgcolor="white"
                     boxShadow={1}
                     p={2}
                     borderRadius={5}
                     display="flex"
                  >
                     <HourglassFullIcon
                        style={{ color: '#2196F3', marginRight: '10px' }}
                     />
                     <Typography variant="body2">
                        We request for your patience while your donations are...
                        * paano pag di inaccept ni org? new tab ba?
                     </Typography>
                  </Box>
               </Grid>
               {data
                  .filter((donation) => donation.status === 'Available')
                  .map((donation) => (
                     <Item
                        donationID={donation.donationID}
                        donorName={donation.donorName}
                        imgLoc={donation.imgLoc}
                        donationName={donation.donationName}
                        status={donation.status}
                        method={donation.method}
                        date={donation.date}
                        location={donation.pickupLocation}
                        quantity={donation.quantity}
                     />
                  ))}
            </Grid>
         </TabPanel>
         <TabPanel value={value} index={1}>
            <Grid container spacing={2} style={{ marginTop: '.5rem' }}>
               <Grid item xs={12}>
                  <Box
                     bgcolor="white"
                     boxShadow={1}
                     p={2}
                     borderRadius={5}
                     display="flex"
                     alignItems="center"
                  >
                     <PriorityHighIcon
                        style={{ color: 'red', marginRight: '10px' }}
                     />
                     <Typography variant="body2">
                        You will be messaged by the organization regarding
                        further arrangements (such as the pickup time) for the
                        claiming of your donations.
                     </Typography>
                  </Box>
               </Grid>
               {data
                  .filter((donation) => donation.status === 'Accepted')
                  .map((donation) => (
                     <Item
                        donationID={donation.donationID}
                        donorName={donation.donorName}
                        imgLoc={donation.imgLoc}
                        donationName={donation.donationName}
                        status={donation.status}
                        method={donation.method}
                        date={donation.date}
                        location={donation.pickupLocation}
                        quantity={donation.quantity}
                     />
                  ))}
            </Grid>
         </TabPanel>
         <TabPanel value={value} index={2}>
            <Grid container spacing={2} style={{ marginTop: '.5rem' }}>
               <Grid item xs={12}>
                  <Box
                     bgcolor="white"
                     boxShadow={1}
                     p={2}
                     borderRadius={5}
                     display="flex"
                     alignItems="center"
                  >
                     <CheckIcon
                        style={{ color: '#66BB6A', marginRight: '10px' }}
                     />
                     <Typography variant="body2">
                        Your donations have been claimed by the organization.
                        You will be notified once your donation has been donated
                        to people in need.
                     </Typography>
                  </Box>
               </Grid>
               {data
                  .filter((donation) => donation.status === 'Claimed')
                  .map((donation) => (
                     <Item
                        donationID={donation.donationID}
                        donorName={donation.donorName}
                        imgLoc={donation.imgLoc}
                        donationName={donation.donationName}
                        status={donation.status}
                        method={donation.method}
                        date={donation.date}
                        location={donation.pickupLocation}
                        quantity={donation.quantity}
                        dateClaimed={donation.dateClaimed}
                     />
                  ))}
            </Grid>
         </TabPanel>
         <TabPanel value={value} index={3}>
            <Grid container spacing={2} style={{ marginTop: '.5rem' }}>
               <Grid item xs={12}>
                  <Box
                     bgcolor="white"
                     boxShadow={1}
                     p={2}
                     borderRadius={5}
                     display="flex"
                     alignItems="center"
                  >
                     <Icon
                        icon={bxsDonateHeart}
                        style={{
                           color: '#2196F3',
                           marginRight: '10px',
                           width: '2.5rem',
                           height: '2.5rem',
                        }}
                     />

                     <Typography variant="body2">
                        Your donations have already been been received by our
                        beneficiaries! We would to extend our sincere gratitude
                        and appreciation for all of the donations you have
                        provided for the people in need, it means everything to
                        us. Together, we can fight food hunger.
                     </Typography>
                  </Box>
               </Grid>
               {data
                  .filter((donation) => donation.status === 'Donated')
                  .map((donation) => (
                     <Item
                        donationID={donation.donationID}
                        donorName={donation.donorName}
                        imgLoc={donation.imgLoc}
                        donationName={donation.donationName}
                        status={donation.status}
                        method={donation.method}
                        date={donation.date}
                        location={donation.pickupLocation}
                        quantity={donation.quantity}
                        dateClaimed={donation.dateClaimed}
                        recipient={donation.recipient}
                        dateDonated={donation.dateDonated}
                     />
                  ))}
            </Grid>
         </TabPanel>
      </div>
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

function Item(props) {
   const classes = useStyles()
   const {
      donationID,
      donorName,
      imgLoc,
      donationName,
      status,
      method,
      date,
      location,
      quantity,
      dateClaimed,
      recipient,
      dateDonated,
   } = props

   const [open, setOpen] = useState(false)

   const handleClickOpen = () => {
      setOpen(true)
   }
   const handleClose = () => {
      setOpen(false)
   }

   return (
      <Grid item xs={6}>
         <Box
            display="flex"
            borderRadius={5}
            boxShadow={1}
            bgcolor="white"
            p={1.5}
         >
            <img
               src={imgLoc}
               alt="donation"
               style={{
                  // alignSelf: 'center',
                  width: '130px',
                  height: '130px',
                  borderRadius: '5px',
               }}
            />
            <Box
               width="65%"
               marginLeft={2}
               display="flex"
               flexDirection="column"
               justifyContent="space-between"
               alignItems="flex-end"
               flex="1"
            >
               <Box
                  width="100%"
                  style={{ cursor: 'pointer' }}
                  onClick={handleClickOpen}
               >
                  <Typography className={classes.text_bold}>
                     {donationName}
                  </Typography>

                  <Label
                     status={status}
                     date={date}
                     method={method}
                     location={location}
                     quantity={quantity}
                     dateClaimed={dateClaimed}
                     donorName={donorName}
                     recipient={recipient}
                     dateDonated={dateDonated}
                  />
               </Box>
               <Box mt={1}>
                  <ActionButtons status={status} />
               </Box>
            </Box>
         </Box>
         <DonationDetails
            donationID={donationID}
            open={open}
            handleClose={handleClose}
         />
      </Grid>
   )
}

function ActionButtons(props) {
   const classes = useStyles()
   const { status } = props
   const setOpenMessage = useMessageStore((state) => state.setOpenMessage)

   if (status === 'Available') {
      return null
   } else if (status === 'Accepted') {
      return (
         <>
            <Button
               variant="contained"
               className={classes.button_lightblue}
               onClick={() => {
                  setOpenMessage(true)
               }}
            >
               <ChatIcon />
            </Button>
         </>
      )
   } else if (status === 'Claimed' || status === 'Donated') {
      return null
   }
}

function Label(props) {
   const classes = useStyles()
   const {
      status,
      method,
      date,
      quantity,
      location,
      dateClaimed,
      recipient,
      dateDonated,
   } = props

   if (status === 'Available') {
      return (
         <>
            <Box
               display="flex"
               alignItems="flex-start"
               style={{ marginLeft: '-5px' }}
            >
               <LocationOnIcon
                  style={{ color: 'red', width: '1.1rem', marginRight: '3px' }}
               />
               <Typography
                  variant="body2"
                  style={{ fontWeight: '500', color: '#2196F3' }}
                  noWrap
               >
                  {location}
               </Typography>
            </Box>
            <Typography variant="body2" style={{ fontWeight: '200' }}>
               {method} on <span style={{ fontWeight: '500' }}>{date}</span>
            </Typography>

            <Typography variant="body2" style={{ fontWeight: '200' }}>
               Quantity:{' '}
               <span style={{ fontWeight: '500' }}>{quantity} piece/s</span>
            </Typography>
         </>
      )
   } else if (status === 'Accepted') {
      return (
         <>
            <Box
               display="flex"
               // alignItems="center"
               style={{ marginLeft: '-5px' }}
            >
               <LocationOnIcon
                  style={{ color: 'red', width: '1.1rem', marginRight: '3px' }}
               />
               <Typography
                  variant="body2"
                  style={{ fontWeight: '500', color: '#2196F3' }}
                  noWrap
               >
                  {location}
               </Typography>
            </Box>
            <Typography variant="body2" style={{ fontWeight: '200' }}>
               {method} on <span style={{ fontWeight: '500' }}>{date}</span>
            </Typography>

            <Typography variant="body2" style={{ fontWeight: '200' }}>
               Quantity:{' '}
               <span style={{ fontWeight: '500' }}>{quantity} piece/s</span>
            </Typography>
         </>
      )
   } else if (status === 'Claimed') {
      return (
         <>
            <Typography variant="body2" style={{ fontWeight: '200' }}>
               Donation claimed on {dateClaimed}
            </Typography>
            <Typography variant="body2" style={{ fontWeight: '200' }}>
               Status:{' '}
               <span style={{ fontWeight: '500' }}>
                  currently in the inventory
               </span>
            </Typography>
            {/* <Typography variant="body2" style={{ fontWeight: '200' }}>
               You will be notified once your donation has been donated
            </Typography> */}
         </>
      )
   } else if (status === 'Donated') {
      return (
         <>
            <Typography variant="body2" style={{ fontWeight: '200' }}>
               Your donation has been donated to{' '}
               <span style={{ fontWeight: '500' }}>{recipient}</span>!
            </Typography>
            <Typography variant="body2" style={{ fontWeight: '200' }}>
               Donated on{' '}
               <span style={{ fontWeight: '500' }}>{dateDonated}</span>
            </Typography>
         </>
      )
   }
}

function DonationDetails(props) {
   const classes = useStyles()
   const { handleClose, open, donationID } = props
   const [donationDetails, setdonationDetails] = useState(null)

   useEffect(() => {
      setdonationDetails(
         data.filter((donation) => donation.donationID === donationID)
      )
   }, [donationID])

   return (
      <>
         {donationDetails !== null && (
            <Dialog
               open={open}
               onClose={handleClose}
               fullWidth={true}
               maxWidth="md"
            >
               <DialogTitle>Donation Details {donationID}</DialogTitle>
               <DialogContent dividers>
                  <Grid container spacing={1} justify="center">
                     <Grid
                        container
                        item
                        xs={12}
                        md={6}
                        justify="center"
                        alignItems="center"
                        // style={{ padding: '1rem' }}
                     >
                        <div
                           style={{
                              backgroundImage: `url(${donationDetails[0].imgLoc})`,
                              backgroundSize: 'cover',
                              // borderRadius: '10px',
                              width: '80%',
                              height: '100%',
                              display: 'flex',
                              justifyContent: 'center',
                           }}
                        >
                           <img
                              src={donationDetails[0].imgLoc}
                              alt="donation"
                              style={{
                                 backdropFilter: 'blur(10px)',
                                 maxWidth: '490px',
                                 width: '100%',
                                 height: '100%',
                                 maxHeight: '600px',
                                 objectFit: 'contain',
                              }}
                           />
                        </div>
                     </Grid>
                     <Grid container item xs={12} md={6} spacing={1}>
                        <Grid item xs={12}>
                           <Box display="flex" alignItems="center">
                              <Avatar style={{ marginRight: '10px' }}>
                                 FB
                              </Avatar>
                              <div>
                                 <Typography
                                    variant="body1"
                                    component="p"
                                    className={classes.text_bold}
                                 >
                                    {donationDetails[0].donorName}
                                 </Typography>
                                 <Typography variant="body2">
                                    Donor Name{' '}
                                    {/* <span
                                       style={{
                                          fontWeight: '300',
                                          fontSize: '13px',
                                       }}
                                    >
                                       {' '}
                                       Posted 3h ago
                                    </span> */}
                                 </Typography>
                              </div>
                           </Box>
                        </Grid>
                        <Grid item xs={12}>
                           <Divider />
                        </Grid>
                        <Grid item xs={12}>
                           <Typography
                              variant="h6"
                              className={classes.text_bold}
                           >
                              {donationDetails[0].donationName}
                           </Typography>
                        </Grid>
                        <Grid item xs={12}>
                           <Chip
                              label={donationDetails[0].category}
                              color="primary"
                           />
                        </Grid>

                        <Grid item xs={6}>
                           <Typography
                              className={classes.text_bold}
                              style={{ textAlign: 'center' }}
                           >
                              Total quantity
                           </Typography>
                           <Typography>
                              <Typography
                                 variant="body2"
                                 style={{ textAlign: 'center' }}
                              >
                                 {donationDetails[0].quantity} pieces
                              </Typography>
                           </Typography>
                        </Grid>
                        <Grid item xs={6}>
                           <Typography
                              className={classes.text_bold}
                              style={{ textAlign: 'center' }}
                           >
                              Expiry Date
                           </Typography>
                           <Typography
                              variant="body2"
                              style={{ textAlign: 'center' }}
                           >
                              {donationDetails[0].expiryDate}
                           </Typography>
                        </Grid>
                        <Grid item xs={12}>
                           <Typography className={classes.text_bold}>
                              Donation Notes
                           </Typography>
                           <Typography variant="body2">
                              {donationDetails[0].donationNotes
                                 ? donationDetails[0].donationNotes
                                 : 'none'}
                           </Typography>
                        </Grid>
                        <Grid container item xs={12}>
                           <Grid item xs={6}>
                              <Typography
                                 className={classes.text_bold}
                                 style={{ textAlign: 'center' }}
                              >
                                 {donationDetails[0].method === 'Deliver'
                                    ? 'Deliver location'
                                    : 'Pickup location'}
                              </Typography>
                              <Typography
                                 variant="body2"
                                 style={{ textAlign: 'center' }}
                              >
                                 {donationDetails[0].pickupLocation}
                              </Typography>
                           </Grid>
                           <Grid item xs={6}>
                              <Typography
                                 className={classes.text_bold}
                                 style={{ textAlign: 'center' }}
                              >
                                 Pickup date
                              </Typography>
                              <Typography
                                 variant="body2"
                                 style={{ textAlign: 'center' }}
                              >
                                 {donationDetails[0].date}
                              </Typography>
                           </Grid>
                        </Grid>
                     </Grid>
                  </Grid>
               </DialogContent>
            </Dialog>
         )}
      </>
   )
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
      objectFit: 'cover',
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
      flexWrap: 'wrap',
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
   divider_margin: {
      margin: theme.spacing(1.5, 0),
   },
}))

const data = [
   {
      donationID: '1',
      donorName: 'Fhillip Bagsic',
      imgLoc: 'https://c1.staticflickr.com/5/4158/33593402264_bedafb79d1_c.jpg',
      donationName: 'Pancit Canton Noodles',
      quantity: 7,
      category: 'Instant Noodles',
      expiryDate: '10/05/2021',
      method: 'Pickup',
      pickupLocation:
         'National University-Manila, M.F. Jhocson Street, Sampaloc, Manila, Metro Manila',
      date: '07/01/2021',
      status: 'Accepted',
      dateClaimed: 'July 01, 2021',
      recipient: '',
   },
   {
      donationID: '2',
      donorName: 'Fhillip Bagsic',
      imgLoc: 'https://cf.shopee.com.my/file/9e0aec8c671eaaa75d039ddad2efce47',
      donationName: 'Argentina Corned Beef',
      quantity: 7,
      category: 'Canned Goods',
      expiryDate: '10/03/2021',
      method: 'Pickup',
      pickupLocation:
         'National University-Manila, M.F. Jhocson Street, Sampaloc, Manila, Metro Manila',
      date: '07/01/2021',
      status: 'Available',
      dateClaimed: '',
      recipient: '',
   },
   {
      donationID: '3',
      donorName: 'Fhillip Bagsic',
      imgLoc: 'https://cf.shopee.com.my/file/71ee574d1013a3715f71a25244c8715c',
      donationName: 'Lucky Me Chicken',
      quantity: 9,
      category: 'Instant Noodles',
      expiryDate: '09/10/2021',
      method: 'Deliver',
      pickupLocation:
         'National University-Manila, M.F. Jhocson Street, Sampaloc, Manila, Metro Manila',
      date: '07/01/2021',
      status: 'Claimed',
      dateClaimed: 'July 01, 2021',
      recipient: '',
   },
   {
      donationID: '4',
      donorName: 'Fhillip Bagsic',
      imgLoc: 'https://cf.shopee.ph/file/b6fe5dbf2a4ff8d77959296a3574d630_tn',
      donationName: 'Sky Flakes',
      quantity: 15,
      category: 'Biscuits & Snacks',
      expiryDate: '09/15/2021',
      method: 'Pickup',
      pickupLocation:
         'National University-Manila, M.F. Jhocson Street, Sampaloc, Manila, Metro Manila',
      date: '07/01/2021',
      status: 'Donated',
      dateClaimed: '',
      recipient: 'Bantay Bata',
      dateDonated: 'July 01, 2021',
   },
   {
      donationID: '5',
      donorName: 'Fhillip Bagsic',
      imgLoc:
         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_EA65--PYdCADAe2JXli_3MhgOWwnIrJTNOioOLb22QT5D7ILKkTgLdtjvYIl--Omkuk&usqp=CAU',
      donationName: 'Upo',
      quantity: 8,
      category: 'Vegetables',
      expiryDate: '07/20/2021',
      method: 'Deliver',
      pickupLocation:
         'National University-Manila, M.F. Jhocson Street, Sampaloc, Manila, Metro Manila',
      date: '06/25/2021',
      status: 'Donated',
      dateClaimed: '',
      recipient: 'Barangay 143',
      dateDonated: 'June 28, 2021',
   },
]
