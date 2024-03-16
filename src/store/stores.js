import React,{useEffect,useState} from 'react';
import { CardActionArea,Checkbox,Typography,CardMedia,CardContent,Card,TextField,Button } from '@mui/material';
import axios from "axios";

export default function Stores() {
    const [details,setDetails]=useState({});
    const [loading, setLoading] = useState(true);
    const[selectedItems,setSelectedItems]=useState("");
    const[count,setCount]=useState(0);
    useEffect(() => {      
          axios
            .get(`http://127.0.0.1:8000/api/store/`)
            .then((response) => {
              setDetails(response.data);
              setLoading(false);
              // setFlag(true)
              console.log("hello world, we got list data: ");
              console.log(response.data);
            })
            .catch((error) => {
              console.error("Error fetching Room list:", error);
            });  
      },[]);
      if (loading) {
        return <div>Loading...</div>;
      }  
      const handleCheckbox = (e, detail) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            setSelectedItems([...selectedItems, detail]);
            setCount(prevCount => prevCount + 1); // Increment count
            //handleChange()
        } else {
            setSelectedItems(selectedItems.filter(item => item !== detail));
            setCount(prevCount => prevCount - 1); // Decrement count
            //handleChange()
        }
    };
    
   
    const handleChange =() =>{
      setCount(selectedItems.length);
    }
  return (
    <div className='store'>
    <div className='underStore'>
     {details.map((detail) =>(
    <Card sx={{ maxWidth: 345 }} >
      <Checkbox  onClick={handleCheckbox} />
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={`data:image/jpeg;base64, ${detail.ItemImage}`}
          alt="hello"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Name: {detail.ItemName}
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
            Description:{detail.ItemDescription}
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
           Price : {detail.ItemPrice}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>))}
    </div>
    <TextField 
      id="outlined-basic" 
      label="Selected items" 
      variant="outlined" 
      value={count} 
      onChange={handleChange} 
      InputProps={{
        readOnly: true, 
      }}
      />
      <Button variant="outlined" >Submit</Button>
    </div>
  );
}

