import {Grid} from "@mui/material";
import {UserContext} from "../../App";
import {useContext, useEffect} from "react";
import Posts from "./Posts";
const Post=({search})=>{
    const {setPhoneBook,phoneBook,setFav,fav,post,setValueEdit,setFilterSearch,filterSearch}=useContext(UserContext);
    useEffect(()=>{
      setFilterSearch(
          post.filter(fill=>{
              if(search.get("s")!==null){
                  return  fill.name.startsWith(search.get("s"));
              }else{
                  return true;
              }
          }))

    },[search,post]);
    return(
        <>
            <Grid item spacing={3}  marginTop={3}  container>
               <Grid item xs={12} sx={{textAlign:"center",color:"purple"}} ><h1>post</h1></Grid>
               {filterSearch.map(item=> <Posts item={item} fav={fav}  phoneBook={phoneBook} setValueEdit={setValueEdit}   setPhoneBook={setPhoneBook} setFav={setFav}   key={item.id}/>)}
            </Grid>
        </>

    )
}
export default Post