import { useState } from "react";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

function Step2({ onPrev, data }) {
  const [age, setAge] = useState(data.age);
  const [gender, setGender] = useState(data.gender);
  const [height, setHeight] = useState(data.height);
  const [weight, setWeight] = useState(data.weight);
  const [occupation, setOccupation] = useState(data.occupation);
  const navigator = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!age || !gender || !height || !weight || !occupation) {
      alert("Please fill in all fields.");
      return;
    }

    const finalData = { username:data.username,password:data.password,email:data.email, age, height, weight:weight, occupation };
    console.log(finalData);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}register/`, finalData);

      if (response.data.success) {
        Cookies.set('token', response.data.access, { expires: 7 });
        console.log('Token:', response.data.access);
        console.log('User ID:', response.data.userId);
        navigator('/');
      } else {
        console.log('Request was not successful');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <TextField label="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)} required fullWidth />
      
      <FormControl fullWidth>
        <InputLabel>Gender</InputLabel>
        <Select value={gender} onChange={(e) => setGender(e.target.value)} error={!gender}>
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
      </FormControl>

      <TextField label="Height (cm)" type="number" value={height} onChange={(e) => setHeight(e.target.value)} required fullWidth />
      <TextField label="Weight (kg)" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required fullWidth />

      <FormControl fullWidth>
        <InputLabel>Occupation</InputLabel>
        <Select value={occupation} onChange={(e) => setOccupation(e.target.value)} error={!occupation}>
          <MenuItem value="doctor">Doctor</MenuItem>
          <MenuItem value="software_engineer">Software Engineer</MenuItem>
          <MenuItem value="engineer">Engineer</MenuItem>
          <MenuItem value="teacher">Teacher</MenuItem>
          <MenuItem value="lawyer">Lawyer</MenuItem>
          <MenuItem value="sales_representative">Sales Representative</MenuItem>
          <MenuItem value="nurse">Nurse</MenuItem>
          <MenuItem value="accountant">Accountant</MenuItem>
          <MenuItem value="scientist">Scientist</MenuItem>
          <MenuItem value="salesperson">Salesperson</MenuItem>
        </Select>
      </FormControl>

      <div style={{ display: "flex", gap: "1rem" }} className="w-full flex items-center justify-center">
        <button className='bg-black font-madefor text-lg text-white py-2 p-10 w-1/2 rounded hover:bg-gray-700' onClick={onPrev}>
          Previous
        </button>
        <button className='bg-black font-madefor text-lg text-white py-2 p-10 w-1/2 rounded hover:bg-gray-700' type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}

export default Step2;
