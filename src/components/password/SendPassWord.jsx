import StylishTextField from "../Form/StylishFiledText";
import { ThemeProvider,createTheme,Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import '../Form/Form.css';
const SendPassword=({passwordForm,setPasswordForm,setActivatePassForm,setError,error})=>{
    const [passsworldValue,setPasswordvalue]=useState({
        password:"",
        email:"",
      })
    const theme=createTheme({
        palette:{
            primary:{
                main:"#4a1f66"
            },
        }
    })
    const navigate=useNavigate()
    const passwordInputHandler=(e)=>{
        setPasswordvalue({...passsworldValue,[e.target.id]:e.target.value});
    }

    const passwordFormHandler=(e)=>{
         e.preventDefault();
          let passwordHas=passwordForm.some((i)=>i.email===passsworldValue.email)
         let email=/^(\W|^)[\w.+\-]*(@gmail\.com|@yahoo\.com)+(\W|$)$/.test(passsworldValue.email);
         if(passsworldValue.password.length!==0&&email&&!passwordHas){
             setPasswordForm([...passwordForm,passsworldValue]);
             setActivatePassForm(true);
            localStorage.setItem("passwordActive",true);
            localStorage.setItem("passwordForm",JSON.stringify([...passwordForm,passsworldValue]));
            navigate('/');
         }  
         if(!email){
            setError({...error,email:"this is not right email"});
         }
         if(passwordHas){
             setError({...error,email:"before you set this email"});
        }
    }
    return(
            <Paper className="Form">
                <h1 style={{color:"purple"}}>please create password</h1>
                <form className="Form" onSubmit={passwordFormHandler}>
                    <StylishTextField label="password" id="password" onChange={passwordInputHandler} type="password" color="primary"/>
                    <StylishTextField label="email" id="email" name="password" onChange={passwordInputHandler} color="primary"/>
                    <div style={{textAlign:"center"}}>
                        <ThemeProvider theme={theme}>
                            <Button type="submit" variant="contained">send</Button>
                        </ThemeProvider>
                    </div>
                    <p style={{color:"red"}}>{error.email}</p>
                </form>  
            </Paper>
    )
}
export default SendPassword