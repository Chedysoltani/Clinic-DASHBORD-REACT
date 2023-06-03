import React, {useState} from "react";
import './add.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import { Cookies } from "react-cookie";
import APIService from "./APIService";
function AddPatient(props){
    const [FirstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [Civility, setCivility] = useState('')
    const [Email, setEmail] = useState('')
    const [Phone, setPhone] = useState('')
    const [Password, setPassword] = useState('')

    const cookies = new Cookies()
    const TOKEN = cookies.get('AuthToken')

    const Patient = {
        "civility": Civility,
        "firstName": FirstName,
        "lastName": LastName,
        "email": Email,
        "phoneNumber": Phone,
        "password": Password
    }

    const Handleadd = async()=>{
        const response = await APIService.PostPatient(TOKEN, Patient)
        try{
            if(response.status === 201){
                alert('Patient added successfuly')
                window.location.reload()
            }
            else{
                alert('Adding Patient failed please check your data')
            }
        }catch(error){
            alert('Adding Patient failed please check your data')
        }
    }

    return props.Trigger ? (
        <div className="add-popup">
            <div className="add-popup-inner">
                <div className="add-header-container">
                <h1 id="add-txt">add Patient</h1>
                    <div className="cross-container" onClick={()=>props.setTrigger(false)}>
                        <FontAwesomeIcon icon="fa-solid fa-xmark" />
                    </div>
                    <div add-input-container>
                        <FormControl style={{marginTop : 18, display : "flex", flexDirection : 'column'}}>
                            <FormLabel id="demo-row-radio-buttons-group-label" style={{alignSelf : 'center'}}>Civility</FormLabel>
                                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" style={{alignSelf : 'center',display : "flex" ,gap : 30}} >
                                <FormControlLabel value="MRS" control={<Radio />} label="MRS" onClick={()=>setCivility('MRS')} />
                                <FormControlLabel value="MR" control={<Radio />} label="MR" onClick={()=>setCivility('MR')} />
                            </RadioGroup>
                            <div style={{display : 'flex', gap : 70, alignSelf: 'center'}}>
                            <TextField id="standard-basic" label="First Name" variant="standard" style={{width : 200}} onChange={(e)=>setFirstName(e.target.value)} />
                            <TextField id="standard-basic" label="Last Name" variant="standard" style={{width : 200}} onChange={(e)=>setLastName(e.target.value)} />
                            </div>
                            <div style={{display : 'flex', gap : 70, alignSelf: 'center'}}>
                            <TextField id="standard-basic" label="Email" variant="standard" style={{width : 200}} onChange={(e)=>setEmail(e.target.value)} />
                            <TextField id="standard-basic" label="Phone Number" variant="standard" style={{width : 200}} onChange={(e)=>setPhone(e.target.value)}/>
                            </div>
                            <TextField id="standard-password-input" type="password" label="Password" variant="standard" style={{width : 200, alignSelf : 'center', marginTop : '10px'}} onChange={(e)=>setPassword(e.target.value)} />
                            <Button variant="contained" style={{marginTop : '30px', width : '100px', alignSelf : 'center'}} onClick={Handleadd}>Confirm</Button>
                        </FormControl>
                    </div>
                </div>
            </div>
        </div>
    )
    :
    ""
}
export default AddPatient
