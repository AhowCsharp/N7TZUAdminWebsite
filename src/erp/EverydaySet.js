import { useState,useRef,useEffect,useCallback} from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { LicenseInfo,DataGridPro } from '@mui/x-data-grid-pro';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link,useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const API_PATH = process.env.REACT_APP_API_PATH;

export default function EverydaySet() {
  const navigate = useNavigate();
  const [request, setRequest] = useState({
    id: 0,
    prize1Type: 0,
    prize1Value: 0,
    prize1Probability: 0,
    prize2Type: 0,
    prize2Value: 0,
    prize2Probability: 0,
    prize3Type: 0,
    prize3Value: 0,
    prize3Probability: 0,
    prize4Type: 0,
    prize4Value: 0,
    prize4Probability: 0,
    prize5Type: 0,
    prize5Value: 0,
    prize5Probability: 0,
    prize6Type: 0,
    prize6Value: 0,
    prize6Probability: 0,
    prize7Type: 0,
    prize7Value: 0,
    prize7Probability: 0,
    prize8Type: 0,
    prize8Value: 0,
    prize8Probability: 0
  });

  const handleInputChange = (event, propertyName) => {
    const value = event.target.value;
    setRequest((prevData) => ({
      ...prevData,
      [propertyName]: value,
    }));
  };
  const handleSubmit = async () => {    
    const totalProbability = Object.keys(request)
    .filter(key => key.includes('Probability'))
    .reduce((sum, key) => {
      const value = parseFloat(request[key]);
      if (Number.isNaN(value)) {
        alert(`${key} 必須為數字`);
        return sum; // Return the current sum without adding the NaN value
      }
      return sum + value;
    }, 0);
  

    if (totalProbability !== 100) {
      alert('機率要剛好加起來 == 100');
      return;
    }
    try {
        const response = await axios.put(`${API_PATH}/super/signinset`, request);
        if (response.status === 200) {
          alert('成功');
          fetchData();
        }
    } catch (error) {
      alert(error.response.data)
    }                    
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_PATH}/super/signinset`);
      if (response.status === 200) { 
        setRequest(prevRequest => ({
          ...prevRequest,
          prize1Type: response.data.source.prize1Type,
          prize1Value: response.data.source.prize1Value,
          prize1Probability: response.data.source.prize1Probability,
          prize2Type: response.data.source.prize2Type,
          prize2Value: response.data.source.prize2Value,
          prize2Probability: response.data.source.prize2Probability,
          prize3Type: response.data.source.prize3Type,
          prize3Value: response.data.source.prize3Value,
          prize3Probability: response.data.source.prize3Probability,
          prize4Type: response.data.source.prize4Type,
          prize4Value: response.data.source.prize4Value,
          prize4Probability: response.data.source.prize4Probability,
          prize5Type: response.data.source.prize5Type,
          prize5Value: response.data.source.prize5Value,
          prize5Probability: response.data.source.prize5Probability,
          prize6Type: response.data.source.prize6Type,
          prize6Value: response.data.source.prize6Value,
          prize6Probability: response.data.source.prize6Probability,
          prize7Type: response.data.source.prize7Type,
          prize7Value: response.data.source.prize7Value,
          prize7Probability: response.data.source.prize7Probability,
          prize8Type: response.data.source.prize8Type,
          prize8Value: response.data.source.prize8Value,
          prize8Probability: response.data.source.prize8Probability,
        }));
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
      if (error.response && error.response.status === 401) {
        // Unauthorized
        navigate('/login', { replace: true });
      } else {
        alert('發生錯誤');
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 

  return (
    <>
    <Box sx={{ height: 600, width: '90%',margin:'auto' }}>
      <Box sx={{ flexGrow: 0 }}>
          <Grid container spacing={2}>.                  
              <Grid item xs={12} sx={{ mt: 1 }} style={{justifyContent:'center',display:'flex' }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">獎項一類型</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={request.prize1Type}
                    label="prize1Type"
                    onChange={(e) => handleInputChange(e, 'prize1Type')}
                  >
                    <MenuItem value={0}>代幣</MenuItem>
                    <MenuItem value={1}>抽獎券</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}  style={{justifyContent:'center',display:'flex' }}>
                  <TextField 
                  id="outlined-number"
                  size="small"
                  label="獎項一價值"
                  InputLabelProps={{
                      shrink: true,
                  }}                     
                  value={request.prize1Type === 1? 0: request.prize1Value}
                  onChange={(e) => handleInputChange(e, 'prize1Value')}
                  />
              </Grid>
              <Grid item xs={4} sx={{ mt: 1 }} style={{justifyContent:'center',display:'flex' }}>
                  <TextField 
                  id="outlined-number"
                  size="small"
                  label="獎項一機率"
                  InputLabelProps={{
                      shrink: true,
                  }}                     
                  value={request.prize1Probability}
                  onChange={(e) => handleInputChange(e, 'prize1Probability')}
                  />
              </Grid>      
              <Grid item xs={12} sx={{ mt: 1 }} style={{justifyContent:'center',display:'flex' }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">獎項二類型</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={request.prize2Type}
                    label="prize2Type"
                    onChange={(e) => handleInputChange(e, 'prize2Type')}
                  >
                    <MenuItem value={0}>代幣</MenuItem>
                    <MenuItem value={1}>抽獎券</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}  style={{justifyContent:'center',display:'flex' }}>
                  <TextField 
                  id="outlined-number"
                  size="small"
                  label="獎項二價值"
                  InputLabelProps={{
                      shrink: true,
                  }}                     
                  value={request.prize2Type === 1? 0: request.prize2Value}
                  onChange={(e) => handleInputChange(e, 'prize2Value')}
                  />
              </Grid>
              <Grid item xs={4} sx={{ mt: 1 }} style={{justifyContent:'center',display:'flex' }}>
                  <TextField 
                  id="outlined-number"
                  size="small"
                  label="獎項二機率"
                  InputLabelProps={{
                      shrink: true,
                  }}                     
                  value={request.prize2Probability}
                  onChange={(e) => handleInputChange(e, 'prize2Probability')}
                  />
              </Grid>       
              <Grid item xs={12} sx={{ mt: 1 }} style={{justifyContent:'center',display:'flex' }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">獎項三類型</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={request.prize3Type}
                    label="prize3Type"
                    onChange={(e) => handleInputChange(e, 'prize3Type')}
                  >
                    <MenuItem value={0}>代幣</MenuItem>
                    <MenuItem value={1}>抽獎券</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}  style={{justifyContent:'center',display:'flex' }}>
                  <TextField 
                  id="outlined-number"
                  size="small"
                  label="獎項三價值"
                  InputLabelProps={{
                      shrink: true,
                  }}                     
                  value={request.prize3Type === 1? 0: request.prize3Value}
                  onChange={(e) => handleInputChange(e, 'prize3Value')}
                  />
              </Grid>
              <Grid item xs={4} sx={{ mt: 1 }} style={{justifyContent:'center',display:'flex' }}>
                  <TextField 
                  id="outlined-number"
                  size="small"
                  label="獎項三機率"
                  InputLabelProps={{
                      shrink: true,
                  }}                     
                  value={request.prize3Probability}
                  onChange={(e) => handleInputChange(e, 'prize3Probability')}
                  />
              </Grid>    
              <Grid item xs={12} sx={{ mt: 1 }} style={{justifyContent:'center',display:'flex' }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">獎項四類型</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={request.prize4Type}
                    label="prize4Type"
                    onChange={(e) => handleInputChange(e, 'prize4Type')}
                  >
                    <MenuItem value={0}>代幣</MenuItem>
                    <MenuItem value={1}>抽獎券</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}  style={{justifyContent:'center',display:'flex' }}>
                  <TextField 
                  id="outlined-number"
                  size="small"
                  label="獎項四價值"
                  InputLabelProps={{
                      shrink: true,
                  }}                     
                  value={request.prize4Type === 1? 0: request.prize4Value}
                  onChange={(e) => handleInputChange(e, 'prize4Value')}
                  />
              </Grid>
              <Grid item xs={4} sx={{ mt: 1 }} style={{justifyContent:'center',display:'flex' }}>
                  <TextField 
                  id="outlined-number"
                  size="small"
                  label="獎項四機率"
                  InputLabelProps={{
                      shrink: true,
                  }}                     
                  value={request.prize4Probability}
                  onChange={(e) => handleInputChange(e, 'prize4Probability')}
                  />
              </Grid>    
              <Grid item xs={12} sx={{ mt: 1 }} style={{justifyContent:'center',display:'flex' }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">獎項五類型</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={request.prize5Type}
                    label="prize5Type"
                    onChange={(e) => handleInputChange(e, 'prize5Type')}
                  >
                    <MenuItem value={0}>代幣</MenuItem>
                    <MenuItem value={1}>抽獎券</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}  style={{justifyContent:'center',display:'flex' }}>
                  <TextField 
                  id="outlined-number"
                  size="small"
                  label="獎項五價值"
                  InputLabelProps={{
                      shrink: true,
                  }}                     
                  value={request.prize5Type === 1? 0: request.prize5Value}
                  onChange={(e) => handleInputChange(e, 'prize5Value')}
                  />
              </Grid>
              <Grid item xs={4} sx={{ mt: 1 }} style={{justifyContent:'center',display:'flex' }}>
                  <TextField 
                  id="outlined-number"
                  size="small"
                  label="獎項五機率"
                  InputLabelProps={{
                      shrink: true,
                  }}                     
                  value={request.prize5Probability}
                  onChange={(e) => handleInputChange(e, 'prize5Probability')}
                  />
              </Grid>    
              <Grid item xs={12} sx={{ mt: 1 }} style={{justifyContent:'center',display:'flex' }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">獎項六類型</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={request.prize6Type}
                    label="prize6Type"
                    onChange={(e) => handleInputChange(e, 'prize6Type')}
                  >
                    <MenuItem value={0}>代幣</MenuItem>
                    <MenuItem value={1}>抽獎券</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}  style={{justifyContent:'center',display:'flex' }}>
                  <TextField 
                  id="outlined-number"
                  size="small"
                  label="獎項六價值"
                  InputLabelProps={{
                      shrink: true,
                  }}                     
                  value={request.prize6Type === 1? 0: request.prize6Value}
                  onChange={(e) => handleInputChange(e, 'prize6Value')}
                  />
              </Grid>
              <Grid item xs={4} sx={{ mt: 1 }} style={{justifyContent:'center',display:'flex' }}>
                  <TextField 
                  id="outlined-number"
                  size="small"
                  label="獎項六機率"
                  InputLabelProps={{
                      shrink: true,
                  }}                     
                  value={request.prize6Probability}
                  onChange={(e) => handleInputChange(e, 'prize6Probability')}
                  />
              </Grid>    
              <Grid item xs={12} sx={{ mt: 1 }} style={{justifyContent:'center',display:'flex' }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">獎項七類型</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={request.prize7Type}
                    label="prize7Type"
                    onChange={(e) => handleInputChange(e, 'prize7Type')}
                  >
                    <MenuItem value={0}>代幣</MenuItem>
                    <MenuItem value={1}>抽獎券</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}  style={{justifyContent:'center',display:'flex' }}>
                  <TextField 
                  id="outlined-number"
                  size="small"
                  label="獎項七價值"
                  InputLabelProps={{
                      shrink: true,
                  }}                     
                  value={request.prize7Type === 1? 0: request.prize7Value}
                  onChange={(e) => handleInputChange(e, 'prize7Value')}
                  />
              </Grid>
              <Grid item xs={4} sx={{ mt: 1 }} style={{justifyContent:'center',display:'flex' }}>
                  <TextField 
                  id="outlined-number"
                  size="small"
                  label="獎項七機率"
                  InputLabelProps={{
                      shrink: true,
                  }}                     
                  value={request.prize7Probability}
                  onChange={(e) => handleInputChange(e, 'prize7Probability')}
                  />
              </Grid>    
              <Grid item xs={12} sx={{ mt: 1 }} style={{justifyContent:'center',display:'flex' }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">獎項八類型</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={request.prize8Type}
                    label="prize8Type"
                    onChange={(e) => handleInputChange(e, 'prize8Type')}
                  >
                    <MenuItem value={0}>代幣</MenuItem>
                    <MenuItem value={1}>抽獎券</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}  style={{justifyContent:'center',display:'flex' }}>
                  <TextField 
                  id="outlined-number"
                  size="small"
                  label="獎項八價值"
                  InputLabelProps={{
                      shrink: true,
                  }}                     
                  value={request.prize8Type === 1? 0: request.prize8Value}
                  onChange={(e) => handleInputChange(e, 'prize8Value')}
                  />
              </Grid>
              <Grid item xs={4} sx={{ mt: 1 }} style={{justifyContent:'center',display:'flex' }}>
                  <TextField 
                  id="outlined-number"
                  size="small"
                  label="獎項八機率"
                  InputLabelProps={{
                      shrink: true,
                  }}                     
                  value={request.prize8Probability}
                  onChange={(e) => handleInputChange(e, 'prize8Probability')}
                  />
              </Grid>    
              <Grid item xs={12} sx={{ mt: 1,mb:3 }} style={{justifyContent:'center',display:'flex' }}>
                <Button onClick={handleSubmit}>送出</Button>  
              </Grid> 
          </Grid>
      </Box> 
    </Box> 
    </>
  );
}

