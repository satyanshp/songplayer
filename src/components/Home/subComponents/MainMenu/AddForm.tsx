import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import './Styles/AddForm.css';
import cross from '../../../../assests/Home/Close.png';
import upload from '../../../../assests/Home/upload.svg';
import deleteImg from "../../../../assests/Home/DeleteOutlined.png";
import { format } from 'date-fns';

export interface SongProp{
    songName: string,
    source: string,
    addedOn: string,
    albumArt: File | string | null | Blob | MediaSource,
    link: string, 
}

interface AddFormProps {
    handleClose:()=>void;
    handleSubmit:(Object:SongProp)=>void;
}

const AddForm = ({handleClose,handleSubmit}:AddFormProps) => {
    const inputFields = [
        {
            name:'Song Name',
            placeholder:'Song Name'
        },
        {
            name:'Song link',
            placeholder:'URL'
        },
        {
            name:'Song Source',
            placeholder:'Source Name'
        },
    ]
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const [imageUrl, setImageUrl] = React.useState('')

    const handleInputChangeFile = async(event: React.ChangeEvent<HTMLInputElement>) =>{
        const { files } = event.target;
        const selectedFiles = files as FileList;
        console.log(selectedFiles?.[0]);
        setSelectedFile(selectedFiles?.[0])
        setImageUrl(URL.createObjectURL(selectedFiles?.[0]))
    }
    const handleRemove = () => {
        setSelectedFile(null);
    }

    const [name, setName] = React.useState("");
    const [link, setLink] = React.useState("");
    const [source, setSource] = React.useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>,index:number) => {
        if(index === 0) {
            setName(event.target.value);
        }
        else if(index === 1){
            setLink(event.target.value);
        }
        else{
            setSource(event.target.value);
        }
    }

    const dataToAdd = {
        songName: name,
        source: source,
        addedOn: format(new Date(), "dd/MM/yyyy"),
        albumArt: imageUrl,
        link: link,
    };

  return (
    <Box component={'section'} className='home__addSongs'>
       <Box className="home__addSongs_header">
            <h1>Add Song</h1>
            <img src={cross} alt="close" onClick={handleClose} style={{cursor:'pointer'}} />
        </Box> 
       <Box className="home__addSongs_form" component={'form'}>
            {inputFields.map((item,index)=>(
                <div key={`field-${index}`} className="home__addSongs_form_field">
                    <label htmlFor={item.name}>{item.name}</label>
                    <input type="text" placeholder={item.placeholder} onChange={(e)=>{handleChange(e,index)}} />
                </div>
            ))}
            <div
                className="home__addSongs_form_upload"
              >
                <Button
                  component="label"
                >
                    <img src={upload} alt="upload" />
                    Click to Upload Profile Thumbnail
                  <input
                    type='file'
                    accept="image/gif, image/jpeg, image/png"
                    onChange={handleInputChangeFile} 
                    style={{display: 'none'}}
                  />
                </Button>
                {selectedFile&&<Box className="uploaded_file">
                    <Box className="uploaded_file_details">
                        <img src={URL.createObjectURL(selectedFile)} alt="img preview" />
                        <p>{selectedFile.name}</p>
                    </Box>
                    <img src={deleteImg} alt="remove" style={{padding: '3px 5px',cursor:'pointer'}} onClick={handleRemove} />
                </Box>}
              </div>
              <Typography>Image has to be of aspect ratio 1:1 with a size of 3000 pixels x 3000 pixels</Typography>
        </Box> 
       <Box className="home__addSongs_submition">
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" onClick={()=>handleSubmit(dataToAdd)}>Add</Button>
        </Box> 
    </Box>
  )
}

export default AddForm