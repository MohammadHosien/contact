
import './App.css';
import {useState, createContext, useEffect} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import SendPassword from './components/password/SendPassWord';
import NavBar from './components/NavBar';
import Form from './components/Form/Form';
import EditForm from './components/Form/EditForm';
import ForgotPassword from './components/password/forgotPassword';

export const UserContext=createContext("");

function App() {

    const [fav,setFav]=useState(localStorage.getItem("fav")!==null?JSON.parse(localStorage.getItem("fav")):[]);
    const [phoneBook,setPhoneBook]=useState(localStorage.getItem("data")!==null?JSON.parse(localStorage.getItem("data")):[]);
    const [post,setPost]=useState([]);
    const [num,setNum]=useState(JSON.parse(localStorage.getItem("num"))!==null?JSON.parse(localStorage.getItem("num")):0);
    const [valueEdit,setValueEdit]=useState({});
    const[error,setError]=useState({
        name:"",
        number:"",
        age:"",
        email:""
    });
    const [passwordForm,setPasswordForm]=useState(JSON.parse(localStorage.getItem("passwordForm"))||[]);    
    const [activetePassForm,setActivatePassForm]=useState(JSON.parse(localStorage.getItem("passwordActive"))||false);
    const [filterSearch,setFilterSearch]=useState([]);
    const [logOutModalActivate,setLogOutModalActivate]=useState(false);
    useEffect(()=>{
            setPost([...fav,...phoneBook]);
    },[phoneBook,fav]);
  
    const route=createBrowserRouter([
        {
            path:"/",
            element:<NavBar setError={setError} error={error} logOutModalActivate={logOutModalActivate}  setPasswordform={setPasswordForm} setLogOutModalActivate={setLogOutModalActivate} setActivatePassForm={setActivatePassForm}  setNum={setNum} setFav={setFav} passwordForm={passwordForm} activetePassForm={activetePassForm}  setPhoneBook={setPhoneBook}/>,
        },
        {
            path:"/createContact",
              element:<Form  setError={setError} error={error}   setPhoneBook={setPhoneBook}  setNum={setNum} num={num} post={post}  phoneBook={phoneBook} />,
        },
        {
            path:"/editContact",
            element:<EditForm EditValue={valueEdit} fav={fav} phoneBook={phoneBook} setPhoneBook={setPhoneBook}   setFav={setFav} setNum={setNum}  setValueEdit={setValueEdit} num={num}/>
        },
        {
            path:"/createPassword",
            element:<SendPassword setActivatePassForm={setActivatePassForm} setError={setError} error={error}   setPasswordForm={setPasswordForm}  passwordForm={passwordForm}/>
        },
        {
            path:"/forgotPassword",
            element:<ForgotPassword setPasswordform={setPasswordForm} passwordForm={passwordForm}/>
        }       
    ])
  
  return (
    <UserContext.Provider value={{phoneBook,setPhoneBook,setFav,fav,setValueEdit,post,setFilterSearch,filterSearch}}>
        <RouterProvider router={route}/>
    </UserContext.Provider>
  );
}

export default App;
