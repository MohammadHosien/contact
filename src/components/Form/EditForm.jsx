import {Button, createTheme, ThemeProvider} from "@mui/material";
import StylishTextField from "./StylishFiledText";
import {useNavigate} from "react-router-dom";

const EditForm=({EditValue,phoneBook,setValueEdit,setFav,setPhoneBook,fav})=>{
    const navigate=useNavigate()
    const theme=createTheme({
        palette:{
            primary:{
                main:"#4a1f66"
            },
        }
    })
    const formEditHandler=(e)=>{
       e.preventDefault();
        if(EditValue.fav!==true){
            setPhoneBook(phoneBook=>[...phoneBook,EditValue].sort((a,b)=>{return a.id-b.id}));
            localStorage.setItem("data",JSON.stringify([...phoneBook,EditValue].sort((a,b)=>{return a.id-b.id})))
        }else{
            setFav(fav=>[...fav,EditValue])
            localStorage.setItem("fav",JSON.stringify([...fav,EditValue]))
        }
       navigate("/");

    }
    const inputHandler=(e)=>{
        setValueEdit({...EditValue,[e.target.id]:e.target.value})
    }
    return(
        <>
            <ThemeProvider theme={theme}>
                <form className="Form" onSubmit={formEditHandler} >
                    <StylishTextField id="name" value={EditValue.name} onChange={inputHandler}  name="input" label="name" color="primary"  type="text"/>
                    <StylishTextField id="lastname" name="input" value={EditValue.lastname} onChange={inputHandler} label="lastname" color="primary"  type="text"/>
                    <StylishTextField id="age" name="input" value={EditValue.age} onChange={inputHandler} label="age" color="primary"  type="number"/>
                    <StylishTextField id="date" name="input" value={EditValue.date} onChange={inputHandler} label="date" color="primary"  type="data"/>
                    <StylishTextField id="email" name="input" value={EditValue.email} onChange={inputHandler} label="email" color="primary" type="email"/>
                    <StylishTextField id="number" name="input" value={EditValue.number} onChange={inputHandler}  label="phone" color="primary" type="number"/>
                    <div style={{textAlign:"center"}}>
                        <Button variant="contained" type="submit">submit</Button>
                    </div>
                </form>
            </ThemeProvider>
        </>
    )
}
export default EditForm