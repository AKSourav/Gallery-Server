import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { getAdminPostsAction, getAllPostsAction } from '../../actions';
import Form from '../Form/Form';
import Posts from '../Posts/Posts'
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { Box, Tab } from '@mui/material';

const HomePage = () => {
    const [value, setValue] = useState('1');
    const dispatch=useDispatch();
    const [filter,setFilter]=useState({title:"",description:""});
    const posts=useSelector((state)=>state.posts);

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    useEffect(()=>{
        // console.log("Value:",value)
        if(value==1)
            dispatch(getAllPostsAction(filter));
        else
        dispatch(getAdminPostsAction(filter));
        // dispatch(getAllPostsAction(filter));
    },[value])

  return (
    <div style={{display:'flex',marginTop:'5vh',marginRight:'5vh',marginLeft:'5vh',justifyContent:'space-between'}}>
        <div style={{width:'100%',height:'90vh',overflowY:'scroll',}}>

        <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="GENERAL" value="1" />
                <Tab label="ADMIN" value="2" />
            </TabList>
            </Box>
            <TabPanel value="1"><Posts/></TabPanel>
            <TabPanel value="2"><Posts/></TabPanel>
        </TabContext>
        </Box>

        </div>
        <div style={{display:'flex',justifyContent:'center',width:'55vh',}}>
            <Form/>
        </div>
    </div>
  )
}

export default HomePage