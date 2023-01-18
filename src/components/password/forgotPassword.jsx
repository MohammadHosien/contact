import StylishTextField from "../Form/StylishFiledText"
import { Button, Paper,createTheme,ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";

import '../Form/Form.css'
const ForgotPassword=({setPasswordform,passwordForm})=>{
    const navigate=useNavigate()
    const forgotFormHandler=(e)=>{
        e.preventDefault(); 
        setPasswordform(pre=>pre.filter(item=>item.email!==e.target.gmail.value));
        setPasswordform(pre=>[...pre,{email:e.target.gmail.value,password:e.target.password.value}]);
        navigate('/')
        localStorage.setItem("passwordForm",JSON.stringify(passwordForm));
    } 
     
    const theme=createTheme({
        palette:{
            primary:{
                main:"#4a1f66"
            },
        }
    })
    return(
        <Paper className="Form">
            <h1>please just enter your gmail</h1>
            <form className="Form" onSubmit={forgotFormHandler}>
                <StylishTextField label="gmail" name="gmail"/>
                <StylishTextField label="new password" name="password"/>
                <div>
                    <ThemeProvider theme={theme}>
                        <Button type='submit' variant="contained" sx={{mt:"50px"}}>
                            send
                        </Button>
                    </ThemeProvider>
                </div>
            </form>
        </Paper>
    )
}
export default ForgotPassword