import {AppBar, Button, IconButton, InputBase, Paper, Toolbar, Typography,Modal,Portal,ThemeProvider,createTheme} from "@mui/material";
import StylishTextField from "./Form/StylishFiledText";
import MenuIcon from "@mui/icons-material/Menu";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import {Search} from "@mui/icons-material";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import AddIcon from '@mui/icons-material/Add';
import Post from "./post/Post";
import {  Link, useNavigate, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
const NavBar=({setPhoneBook,setNum,setFav,passwordForm,setActivatePassForm,activetePassForm,setLogOutModalActivate,logOutModalActivate,setPasswordform,setError,error})=>{
    const [search,setSearch]=useSearchParams()
    const navigate=useNavigate();

    const createContact=()=>{
        navigate("/createContact"); 
    }
    const loginHandler=()=>{
        navigate("./createPassword");
        setError({   
        name:"",
        number:"",
        age:"",
        email:""})
    }
    const deletehanler=()=>{
        localStorage.setItem("data",JSON.stringify([]));
        localStorage.setItem("num",JSON.stringify(0));
        localStorage.setItem("fav",JSON.stringify([]));
        setPhoneBook([]);
        setFav([]);
        setNum(0);
    }
    useEffect(()=>{
        setSearch({s:""})
    },[]);
    
    let timeout;
    const searchInput=(e)=>{
        clearTimeout(timeout)
       timeout= setTimeout(()=>{setSearch({s:e.target.value})},500);
    }
    const modalFormHandler=(e)=>{
        e.preventDefault();
        const userfinding = passwordForm.find(i=>i.email===e.target.email.value);
        if(userfinding!==undefined&&userfinding.password===e.target.password.value){
           setActivatePassForm(false);
        }else{
            setError({...error,email:"please try agian it was not correct"})
        }
   }
   const logOutHadler=()=>{
      setLogOutModalActivate(true) 
   }
   const logOutModalHandler=(e)=>{
      e.preventDefault();
      setError({   
        name:"",
        number:"",
        age:"",
        email:""})
      const userfinding=passwordForm.find(i=>i.email===e.target.logemail.value);
      if(userfinding!==undefined&&userfinding.password===e.target.logpassword.value){
        setLogOutModalActivate(false);
        setPasswordform(passwordForm.filter(i=>i.email!==e.target.logemail))
        localStorage.setItem("passwordForm",JSON.stringify(passwordForm.filter(i=>i.password!==e.target.logpassword.value)));
        localStorage.setItem("passwordActive",false)
      }else{
        setError({...error,email:"it was not correct"})
      }
   }
    const theme=createTheme({
        palette:{
          primary:{
              main:"#4a1f66"
          },
        }
    });
    return(
        <>
            <Portal>
                <Modal open={activetePassForm}  sx={{width:"50%",mx:"auto",textAlign:"center"}}>
                    <Paper sx={{pb:"40px"}}> 
                        <h3>enter your password</h3>
                        <form onSubmit={modalFormHandler}>
                            <StylishTextField label="username" name='email'   id="username" sx={{width:"60%",mt:"30px"}}/>
                            <StylishTextField type="password" name='password' label="password" id='password'  sx={{width:"60%",mt:"10px"}}/> 
                            <div>
                                <ThemeProvider theme={theme}>
                                    <Button variant='contained' type="submit" sx={{mt:"10px",mb:"20px"}}>send</Button>
                                </ThemeProvider> 
                            </div>
                        </form>
                        <p style={{color:"red"}}>{error.email}</p>
                        <Link to="/forgotPassword">i forgot it</Link>
                    </Paper>
                </Modal>
            </Portal>
            <Portal>
                <Modal open={logOutModalActivate}  sx={{width:"50%",mx:"auto",textAlign:"center"}}>
                    <Paper sx={{pb:"40px"}}> 
                        <h3>enter your password</h3>
                        <form onSubmit={logOutModalHandler}>
                            <StylishTextField label="username" name='logemail'   id="username" sx={{width:"60%",mt:"30px"}}/>
                            <StylishTextField type="password" name='logpassword' label="password" id='password'  sx={{width:"60%",mt:"10px"}}/> 
                            <div>
                                <ThemeProvider theme={theme}>
                                    <Button variant='contained' type="submit" sx={{mt:"10px",mb:"20px"}}>send</Button>
                                </ThemeProvider> 
                            </div>
                        </form>
                        <Link to="/forgotPassword">i forgot it</Link>
                        <p style={{color:"red"}}>{error.email}</p>
                    </Paper>
                </Modal>
            </Portal>
            <AppBar position="static" sx={{bgcolor:"#0e0d0d",color:"purple",overflow:"hidden",height:"65px"}}>
                <Toolbar sx={{display:{xs:"block",md:"flex"},justifyContent:"space-between"}}>
                    <IconButton edge="start" size="large" sx={{display:{xs:"block",md:"none"}}}  color="inherit" aria-label="menu">
                        <MenuIcon sx={{fontSize:"40px"}} />
                    </IconButton>
                    <Typography variant="h6">
                        <NoteAltIcon/> contact manager app
                    </Typography>
                    <Paper sx={{width:"40%",height:"55%", display:"flex",alignItems:"center"}}>
                        <Search  sx={{color:"purple"}}/> <InputBase sx={{ml:"5px",width:"100%"}}   onChange={searchInput} placeholder="search"  />{"  "}<IconButton  sx={{color:"purple"}}><ArrowForwardOutlinedIcon /></IconButton>
                    </Paper>
                    <Button variant="outlined" onClick={loginHandler} color="inherit">Login</Button>
                    <Button variant="outlined" onClick={logOutHadler}>log out</Button>
                    <Button variant="outlined" onClick={deletehanler}><span className={"fa fa-trash"}></span>deleteAll</Button>
                  
                </Toolbar>
            </AppBar>
            <div style={{textAlign:"center", marginTop:"10px"}}>
               <Button onClick={createContact}  variant="outlined"><AddIcon/>create New </Button>
            </div>
            <Post search={search}/>
        </>
    )
}
export default NavBar
