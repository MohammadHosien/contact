import { createTheme, ThemeProvider, Button} from "@mui/material";
import "./Form.css"
import StylishTextField from "./StylishFiledText";
import {useNavigate} from "react-router-dom";
import { useState } from "react";
const Form=({setNum,num,setPhoneBook,phoneBook,setError,error})=>{
    const [valueInput,setValueInput]=useState({
        name:"",
        lastname:"",
         age:"",
        date:"",
        email:"",
        number:"",
    });
    const navigate=useNavigate();

    const theme=createTheme({
        palette:{
          primary:{
              main:"#4a1f66"
          },
        }
    })
    const formHandler=(e)=>{
        e.preventDefault();
        let email=/^(\W|^)[\w.+\-]*(@gmail\.com|@yahoo\.com)+(\W|$)$/.test(valueInput.email);
        let ageNumber=/\b([0-9]|[1-9][0-9])\b/.test(valueInput.age);
        if(valueInput.name.length>=0&&valueInput.number.length>=8&&email&&(ageNumber||valueInput.age.length===0)){
            setValueInput({date:"",name:"",lastname:"",age:"",number:"",email:""});
            setNum(num+1);
            localStorage.setItem("num",num+1);
            setPhoneBook([...phoneBook,valueInput]);
            localStorage.setItem("data",JSON.stringify([...phoneBook,valueInput]))
            navigate("/");
            setError({
                name:"",
                number:"",
                age:"",
                email:""
            })
        }  
        if(valueInput.number.length<=8){
            setError(pre=>{return {...pre,number:"this is not correct number phone"}})
        }else{setError(pre=>{return {...pre,number:""}})}
        if(valueInput.name.length===0){
            setError(pre=>{return {...pre,name:"i think you forgot to enter your name"}})
        }else{setError(pre=>{return {...pre,name:""}})}
        if(!email){
            setError(pre=>{return {...pre,email:"this ids not correct email please try again"}})
        }else{setError(pre=>{return {...pre,email:""}})}
        if(!ageNumber&&valueInput.age.length!==0){
            setError(pre=>{return {...pre,age:"this is not correct"}})
        }else{setError(pre=>{return {...pre,age:""}})}
    }
    const inputHandler=(e)=>{
        setValueInput({...valueInput,[e.target.id]:e.target.value,fav:false,id:num});
    }
    return(
        <ThemeProvider theme={theme}>
        <form className="Form" onSubmit={formHandler}>
                <StylishTextField id="name" value={valueInput.name}  onChange={inputHandler} name="name" label="name" color="primary"  type="text"/>
                <span style={{color:"red"}}>{error.name}</span>
                <StylishTextField id="lastname" value={valueInput.lastname} onChange={inputHandler} name="lastname" label="lastname" color="primary"  type="text"/>
                <StylishTextField id="age" name="input" value={valueInput.age} onChange={inputHandler} label="age" color="primary"  type="number"/>
                <span style={{color:"red"}}>{error.age}</span>
                <StylishTextField id="date" name="input" value={valueInput.date} onChange={inputHandler} label="date" color="primary"  type="data"/>
                <StylishTextField id="email" name="input" value={valueInput.email} onChange={inputHandler} label="email" color="primary" type="text"/>
                 <span style={{color:"red"}}>{error.email}</span>
                <StylishTextField id="number" name="input" value={valueInput.number} onChange={inputHandler} label="phone" color="primary" type="number"/>
                 <span style={{color:"red"}}>{error.number}</span>
            <div style={{textAlign:"center"}}>
                <Button variant="contained" type="submit">submit</Button>
            </div>
        </form>
        </ThemeProvider>
    )
}
export default Form;