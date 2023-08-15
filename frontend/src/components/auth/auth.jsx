import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import { Container, Paper } from '@mui/material';
import Login from './Login';
import SignUp from './SignUp';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [value, setValue] = React.useState('1');
  const dispatch= useDispatch();
  const Navigate=useNavigate();
  const profile=useSelector((state)=>state.auth.user);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(()=>{
    if(localStorage.getItem('profile') || profile!==null)
    {
        Navigate('/');
    }
  },[profile,Navigate])

  return (
    <Container style={{marginTop:'5vh',display:"flex",justifyContent:"center",alignItems:"center",width:"60vh"}}>
    <Paper style={{display:"flex",justifyContent:"center",alignItems:"center",width:"60vh"}}>
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Login" value="1" />
            <Tab label="SignUp" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"><Login/></TabPanel>
        <TabPanel value="2"><SignUp/></TabPanel>
      </TabContext>
    </Box>
    </Paper>
    </Container>
  );
}
