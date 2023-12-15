import { Box, Button, TextField } from '@mui/material';
import React from 'react'
import {PhoneInput} from 'react-international-phone';
import 'react-international-phone/style.css';
import './styles/Login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/routes/routes';

interface LoginProps{
  handleResponse: (res:any) => void;
  handleUser: (value:string) => void;
}

const Login = ({handleResponse,handleUser}:LoginProps) => {
    const [phone, setPhone] = React.useState();
    const selectAdornment = (
      <PhoneInput
        defaultCountry="in"
        value={phone}
        onChange={(phone:any) => setPhone(phone)}
      />
    );
    const [number, setNumber] = React.useState("");

    const navigate = useNavigate();

    const handleSubmit = async() => {
      handleUser(`${phone}${number}`);
      if(number.length===10){
        await axios.post(
          "https://dev.api.goongoonalo.com/v1/auth/login",
          {
            phoneNumber: `${phone}${number}`
          }
        ) 
        .then((response) => {
          handleResponse(response.data);
        });
        navigate(ROUTES.OTP);
      }
      else{
        alert("Please enter valid phone number")
      }
    }
  return (
    <div className='login'>
        <Box className="login__form form__text">
          <h1>Sign In</h1>
          <Box height={10}/>
          <p>Please enter your mobile number to login. We will send an OTP to verify your number.</p>
          <Box height={25}/>
          <TextField
              type="number"
              placeholder="Phone number"
              className='form__textfield'
              onChange={(e)=>setNumber(e.target.value)}
              required
              InputProps={{
                  startAdornment: selectAdornment,
              }}
          />
          <Box height={25}/>
          <Button className="form_button" onClick={handleSubmit}>Sign In</Button>
        </Box>
    </div>
  )
}

export default Login