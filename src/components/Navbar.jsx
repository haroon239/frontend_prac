import React, { useEffect, useState } from 'react';
import {NavLink} from 'react-router-dom'
import axios from 'axios';

const Navbar = () => {
  const [image, setimage] = useState('');
  const [picture, setpicture] = useState([]);

  const uploadimage = async () => {
    const formdata = new FormData();
    formdata.append('image', image);
    for (let pair of formdata.entries()) {
      console.log(pair[0], pair[1]);
  }

    try {
      const res = await axios.post('http://localhost:6500/home', formdata);
      console.log(res);
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  const showimg = async () => {
    try {
      const res = await axios.get('http://localhost:6500/picture');
      console.log(res.data);
      setpicture(res.data);
    } catch (error) {
      console.error('Error fetching pictures:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  useEffect(() => {
    showimg();
  }, []);

  return (
    <div>
      <input type="file" accept=".png, .jpg, .jpeg" name="photo" onChange={(e) => setimage(e.target.files[0])} />
      <input type="submit" onClick={uploadimage} />

      {picture && picture.map((e) => (
      <NavLink to={'/productdetail'} >
        <img key={e._id} style={{width:"100px", height:"100px"}} src={`http://localhost:6500/${e.image}`} alt="no image" />
      
      </NavLink> 
      ))}
    </div>
  );
};

export default Navbar;
