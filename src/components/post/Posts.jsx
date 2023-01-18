import {Grid, Paper, List, ListItem, ListItemButton, ListItemText, IconButton,} from "@mui/material";
import {useNavigate} from "react-router-dom";
// import axios from "axios";
import './post.css'
const Posts=({item,phoneBook,setPhoneBook,setFav,fav,setValueEdit})=>{
const navigate=useNavigate();

 const favBtnHandler=()=>{
     localStorage.setItem("data",JSON.stringify(phoneBook.filter(i=>i.id!==item.id)));
     setFav([...fav,{...item,fav:true}]);
     setPhoneBook(phoneBook.filter(i=>i.id!==item.id));    
     localStorage.setItem("fav",JSON.stringify([...fav,{...item,fav:true}]))
 }

 const editHandler=()=>{
     if(item.fav!==true){
         setPhoneBook(phoneBook.filter(i=>i.id!==item.id));
         localStorage.setItem("data",JSON.stringify(phoneBook.filter(i=>i.id!==item.id)));
         setValueEdit(item);
     }else{
         setFav(fav.filter(i=>i.id!==item.id));
         localStorage.setItem("fav",JSON.stringify(fav.filter(i=>i.id!==item.id)))
         setValueEdit(item);
     }
    navigate("/EditContact");

 }

 const deleteHandler=()=>{
     if(item.fav!==true){
         setPhoneBook(phoneBook.filter(i=>i.id!==item.id));
         localStorage.setItem("data",JSON.stringify(phoneBook.filter(i=>i.id!==item.id)));
     }else{
        setFav(fav.filter((i=>i.id!==item.id)));
        localStorage.setItem("fav",JSON.stringify(fav.filter((i=>i.id!==item.id))))
     }
 }
 const regularBtn=()=>{
    setFav(fav.filter(i=>i.id!==item.id));
    localStorage.setItem("fav",JSON.stringify(fav.filter(i=>i.id!==item.id)));
    setPhoneBook([...phoneBook,{...item,fav:false}].sort((a,b)=>{return a.id-b.id}));
    localStorage.setItem("data",JSON.stringify([...phoneBook,{...item,fav:false}].sort((a,b)=>{return a.id-b.id})));
 }
    return(
            <Grid xs={12} md={6}  item >
                <Paper sx={{display:"flex",justifyContent:"space-around"}}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary={`name:${item.name}`} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component="a" href="#simple-list">
                                <ListItemText primary={`lastname:${item.lastname}`}/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component="a" href="#simple-list">
                                <ListItemText primary={`age:${item.age}`} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component="a" href="#simple-list">
                                <ListItemText primary={`date:${item.date}`} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component="a" href={`tel:${item.number}`}>
                                <ListItemText primary={`numberPhone:${item.number}`} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component="a" href={`mailto:${item.email}`}>
                                <ListItemText primary={`gmail:${item.email}`} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <div>
                        <div>
                            <IconButton onClick={!item.fav?favBtnHandler:regularBtn}>
                                <span  className={item.fav?"fa-solid fa-heart redHeart":"fa-regular fa-heart redHeart"}></span>
                            </IconButton>
                            <IconButton onClick={editHandler}>
                                <span className="fa fa-user trash"></span>
                            </IconButton>
                            <IconButton onClick={deleteHandler}>
                                <span className="fa fa-trash">

                                </span>
                            </IconButton>
                        </div>
                    </div>

                </Paper>
            </Grid>
    )
}
export default Posts