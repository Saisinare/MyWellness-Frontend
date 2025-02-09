import { useState } from "react";
import { TextField, Button } from "@mui/material";

function Step1({ onNext, data }) {
  const [username, setUsername] = useState(data.username);
  const [email, setEmail] = useState(data.email);
  const [password, setPassword] = useState(data.password);

  const handleNext = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    onNext({ username, email, password });
  };

  return (
    <form onSubmit={handleNext} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} required fullWidth />
      <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required fullWidth />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
        helperText="Password must be at least 6 characters"
      />
            <button className='bg-black font-madefor text-lg text-white py-2 p-10 rounded hover:bg-green-900'>Next</button>
    </form>
  );
}

export default Step1;
