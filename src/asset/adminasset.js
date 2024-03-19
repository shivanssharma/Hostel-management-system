import React,{useState,useEffect} from "react";
import axios from "axios";
import { TextField, Button,Switch, Typography, Box } from "@mui/material";
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
  const [assets, setAssets] = useState(null);

  useEffect(() => {
      // Fetch the list of assets when the component mounts
      fetchAssets();
  }, []);

  const handleSwitchChange = () => {
      setChecked(!checked);
  };

  const fetchAssets = async () => {
      try {
        console.log("getting assets"+server+':'+serverPort+'/api/hostel_assets/')
          // Fetch the list of assets from the server
          const response = await axios.get(server+':'+serverPort+'/api/hostel_assets/');
          console.log("response",response.data)
          setAssets(response.data);
      } catch (error) {
          console.error('Error fetching assets:', error);
      }
  };

  const addAsset = async () => {
      try {
          // Get the CSRF token from the browser's cookies
          const csrfToken = document.cookie.split('; ')
              .find(row => row.startsWith('csrftoken='))
              .split('=')[1];

          // Check if the CSRF token is available
          if (csrfToken) {
              // Make the POST request with the CSRF token
              await axios.post(server+':'+serverPort+'/api/hostel_assets/', {
                  AssetName: assetName,
                  Description: assetDescription,
                  AvailabilityStatus: checked,
              }, {
                  headers: {
                      'X-CSRFToken': csrfToken,
                  },
              });

              console.log('Hostel Asset added successfully!');
              // Update the list of assets after adding
              fetchAssets();
              // Clear input fields
              setAssetName("");
              setAssetDescription("");
              setChecked(false);
          } else {
              console.error('CSRF token not found in cookies.');
          }
      } catch (error) {
          console.error('Error adding hostel asset:', error);
      }
  };

  const deleteAsset = async (assetID) => {
    try {
      // Get the CSRF token from the browser's cookies
      const csrfToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('csrftoken='))
        ?.split('=')[1];
  
      // Check if the asset with the specified ID exists
      // You can add a function to verify this on the frontend
      const assetExists = await checkAssetExists(assetID);
  
      if (assetExists) {
        // Check if the CSRF token is available
        if (csrfToken) {
          // Make the DELETE request with the CSRF token
          console.log(`Deleting asset with ID: ${assetID}`);
          const response = await axios.delete(
            `${server}:${serverPort}/api/hostel_assets/${assetID}/`,
            {
              headers: {
                'X-CSRFToken': csrfToken,
              },
            }
          );
  
          // Log the response from the server
          console.log('Response:', response);
  
          // Check if the response is successful (status code 200-299)
          if (response.status >= 200 && response.status < 300) {
            console.log('Hostel Asset deleted successfully!');
            // Update the list of assets after deleting
            fetchAssets();
          } else {
            // Log an error if the server returns an unexpected status
            console.error('Failed to delete hostel asset. Status:', response.status);
          }
        } else {
          console.error('CSRF token not found in cookies.');
        }
      } else {
        console.error(`Asset with ID ${assetID} does not exist.`);
      }
    } catch (error) {
      // Log and handle any errors
      console.error('Error deleting hostel asset:', error);
    }
  };
  
  // Function to check if the asset with the specified ID exists
  const checkAssetExists = async (assetID) => {
    try {
      const response = await axios.get(
        `${server}:${serverPort}/api/hostel_assets/${assetID}/`
      );
      
      // Check if the response is successful (status code 200-299)
      return response.status >= 200 && response.status < 300;
    } catch (error) {
      // Log and handle any errors
      console.error(`Error checking if asset with ID ${assetID} exists:`, error);
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
                              <Button variant="outlined" onClick={() => deleteAsset(asset.AssetID)} style={{ marginLeft: '20px', width: '80%' }}>
                                Delete
                              </Button>
                            </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                :
                  <Typography variant="h4" sx={{textAlign: 'center'}}>
                    <text className="BrasikaFont grayFont floatUpIn" >
                      Currently there are no asset to diplay.
                    </text>
                  </Typography>
              }
            </Box>
          </Box>
        </Box>
      </Box>
  );
}

export default AdminAsset;
