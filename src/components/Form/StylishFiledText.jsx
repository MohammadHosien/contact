import {TextField,styled} from "@mui/material";
const StylishTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#a049e5',
    },
   '& .css-1ene9rz-MuiFormLabel-root-MuiInputLabel-root':{
     color:"white"
   },
    '& .css-1o9tfb6-MuiInputBase-root-MuiOutlinedInput-root':{
      color:"white"
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#a049e5',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#a049e5',
        },
        '&:hover fieldset': {
            borderColor: '#a049e5',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#a049e5',
        },
    },
});
export default StylishTextField