import React,{useState,useEffect} from "react";
import axios from "axios";
import { TextField, Button,Switch, Typography, Box,Snackbar } from "@mui/material";
// import HealthNav from "../navbars/navbarHealth";
import './admasset.css';
import "../asset/sharedCss.css"
import "../asset/sharedAnimation.css"
import AdminHorizontalNav from "../navbars/HorizontalNav/Admin_hnav";
import { server, serverPort } from "../utils/Constants";
function AdminAsset() {
  const [checked, setChecked] = useState(false);
  const [assetName, setAssetName] = useState("");
  const [assetDescription, setAssetDescription] = useState("");
  const [assets, setAssets] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleSwitchChange = () => {
    setChecked(!checked);
  };

  const fetchAssets = async () => {
    try {
      const response = await axios.get(`${server}:${serverPort}/api/hostel_assets/`);
      setAssets(response.data);
    } catch (error) {
      console.error('Error fetching assets:', error);
    }
  };

  const addAsset = async () => {
    try {
      const csrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        .split('=')[1];

      if (csrfToken) {
        await axios.post(`${server}:${serverPort}/api/hostel_assets/`, {
          AssetName: assetName,
          Description: assetDescription,
          AvailabilityStatus: checked,
        }, {
          headers: {
            'X-CSRFToken': csrfToken,
          },
        });

        console.log('Hostel Asset added successfully!');
        fetchAssets();
        setAssetName("");
        setAssetDescription("");
        setChecked(false);
        setSnackbarMessage('Hostel Asset added successfully!');
        setSnackbarOpen(true);
      } else {
        console.error('CSRF token not found in cookies.');
      }
    } catch (error) {
      console.error('Error adding hostel asset:', error);
      setSnackbarMessage('Error adding hostel asset');
      setSnackbarOpen(true);
    }
  };

  const deleteAsset = async (assetName) => {
    try {
      const csrfToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('csrftoken='))
        ?.split('=')[1];
  
      const assetExists = await checkAssetExists(assetName);
  
      if (assetExists) {
        if (csrfToken) {
          console.log(`Deleting asset with Name: ${encodeURIComponent(assetName)}`);
          const response = await axios.delete(
            `${server}:${serverPort}/api/delete_assets/${encodeURIComponent(assetName)}/`,
            {
              headers: {
                'X-CSRFToken': csrfToken,
              },
            }
          );
  
          console.log('Response:', response);
  
          if (response.status >= 200 && response.status < 300) {
            console.log('Hostel Asset deleted successfully!');
            fetchAssets();
            setSnackbarMessage('Hostel Asset deleted successfully!');
            setSnackbarOpen(true);
          } else {
            console.error('Failed to delete hostel asset. Status:', response.status);
            setSnackbarMessage('Failed to delete hostel asset');
            setSnackbarOpen(true);
          }
        } else {
          console.error('CSRF token not found in cookies.');
          setSnackbarMessage('CSRF token not found in cookies.');
          setSnackbarOpen(true);
        }
      } else {
        console.error(`Asset with Name ${assetName} does not exist.`);
        setSnackbarMessage(`Asset with Name ${assetName} does not exist.`);
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error deleting hostel asset:', error);
      setSnackbarMessage('Error deleting hostel asset');
      setSnackbarOpen(true);
    }
  };
  
  const checkAssetExists = async (assetName) => {
    try {
      const response = await axios.get(
        `${server}:${serverPort}/api/delete_assets/${encodeURIComponent(assetName)}/`
      );
      
      return response.status >= 200 && response.status < 300;
    } catch (error) {
      console.error(`Error checking if asset with name ${assetName} exists:`, error);
      return false;
    }
  };

  

  return (
      <Box>
        <AdminHorizontalNav/>
        <Box className="AdA-Style">
          <Box>
            <Typography variant="h3" className="AdA-title grayFont" sx={{display: 'flex', justifyContent: 'flex-start'}}>
              <text className="BrasikaFont floatRightIn">
                Hostel Assets
              </text>
            </Typography>
            <hr style={{margin: '0% 0% 7% 0%'}} />
            <Box className="Ada-InputContainer floatUpIn">
              <TextField
                className="Ada-Input"
                id="outlined-basic"
                label="Name"
                variant="outlined"
                // style={{ width: '75%', marginBottom: '15px' }}
                onChange={(e) => setAssetName(e.target.value)}
                value={assetName}
              />
            </Box>
            <Box className="Ada-InputContainer floatUpIn">
              <TextField
                className="Ada-Input"
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={2}
                // style={{ width: '75%', marginBottom: '15px' }}
                onChange={(e) => setAssetDescription(e.target.value)}
                value={assetDescription}
              />
            </Box>
            <Box className="flexRow Ada-SwitchContainer floatUpIn">
              <Typography variant="h4" className="AdA-title grayFont" sx={{marginRight: '5%'}}>
                <text className="BrasikaFont">
                  Availability: 
                </text>
              </Typography>
              <Typography >
                <text className="BrasikaFont grayFont">
                  NO 
                </text>
              </Typography>
              <Switch
                  checked={checked}
                  onChange={handleSwitchChange}
                  inputProps={{ "aria-label": "controlled" }}
              /> 
              <Typography>
                <text className="BrasikaFont grayFont">
                  Yes
                </text>
              </Typography>
            </Box>
            <Box className="SubmitBtn floatUpIn" onClick={addAsset}>
              <Typography variant="h6">
                <text className="BrasikaFont">
                  Add
                </text>
                </Typography>
            </Box>
          </Box>

          <hr style={{margin: '4% 7% 4% 7%'}}/>

          <Box className="Ada-Listcontainer">
            <Box>
              <Typography variant="h3" sx={{display: 'flex', justifyContent: 'flex-start'}}>
                <text className="BrasikaFont grayFont floatRightIn" sx={{textAlign: 'left'}}>
                  Asset List
                </text>
              </Typography>
              <hr style={{margin: '3% 0% 7% 0%'}} />

              {assets
                ? <table className="floatUpIn" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                    <thead>
                      <tr>
                        <th className="BrasikaFont">Asset Name</th>
                        <th className="BrasikaFont">Description</th>
                        <th className="BrasikaFont">Availability Status</th>
                        <th className="BrasikaFont">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      { assets.map(asset => (
                        <tr key={asset.AssetID} class="Ada-listRow">
                            <td className="Ada-listItem">{asset.AssetName}</td>
                            <td className="Ada-listItem">{asset.Description}</td>
                            <td className="Ada-listItem">{asset.AvailabilityStatus.toString()}</td>
                            <td className="Ada-listItem">
                              <Button variant="outlined" onClick={() => deleteAsset(asset.AssetName)} style={{ marginLeft: '20px', width: '80%' }}>
                                Delete
                              </Button>
                            </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                :
                  <Typography variant="h4" sx={{textAlign: 'center'}}>
                  <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={() => setSnackbarOpen(false)}
                    message={snackbarMessage}
                  />
                  </Typography>
              }
            </Box>
          </Box>
        </Box>
      </Box>
  );
}

export default AdminAsset;
