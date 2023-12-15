import { Box, Button } from '@mui/material'
import React from 'react'
import OtpInput from "react-otp-input";
import './styles/Otp.css'
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/routes/routes';
import axios from 'axios';

interface OtpProps{
  response: any;
  user:string;
}

const Otp = ({response,user}:OtpProps) => {
  console.log(response, user);
  
  const navigate = useNavigate();
  const [otp, setOtp] = React.useState("");
  const handleLogin = async() => {
    await axios.post(
      "https://dev.api.goongoonalo.com/v1/auth/verify_otp",
      {
        phoneNumber: user,
        requestId:response.requestId,
        otp:otp
      }
    ) 
    .then((response) => {
      localStorage.setItem('user', JSON.stringify(user))
      navigate(ROUTES.ROOT);
    })
    .catch((error) => {
      if( error.response ){
          console.log(error.response.data);
          alert(error.response.data.message);
      }
  });
  }
  return (
    <div>
      <Box className="otp__form form__text">
          <h1>OTP Verification</h1>
          <Box height={10}/>
          <p>We have sent and OTP to {user}. Please enter the code received to verify.</p>
          <Box height={25}/>
          <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderSeparator={<span style={{ width: "33.28px" }}> </span>}
              renderInput={(props) => (
                <input
                  {...props}
                  className="opt__input"
                  style={{
                    width: '78.54px',
                    height: '77.209px',
                    background: "transparent",
                    textAlign: "center",
                    outline: "transparent",
                    border:'1px solid #D0D3D4',
                    borderRadius: "5px",
                  }}
                />
              )}
            />
          <Box height={25}/>
          <Button className="form_button" onClick={handleLogin}>Verify</Button>
          <Box height={25}/>
          <h3>Resend OTP</h3>
          <h3 onClick={()=>navigate(ROUTES.LOGIN)}>Use another number</h3>
        </Box>
    </div>
  )
}

export default Otp