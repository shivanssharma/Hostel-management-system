import React,{useState,useEffect} from "react";
import axios from "axios";
import { TextField, Button,Switch } from "@mui/material";
// import HealthNav from "../navbars/navbarHealth";
import './admasset.css';
import AdminHorizontalNav from "../navbars/HorizontalNav/Admin_hnav";
function AdminAsset() {
  const [checked, setChecked] = useState(false);
  const [assetName, setAssetName] = useState("");
  const [assetDescription, setAssetDescription] = useState("");
  const [assets, setAssets] = useState([]);

  useEffect(() => {
      // Fetch the list of assets when the component mounts
      fetchAssets();
  }, []);

  const handleSwitchChange = () => {
      setChecked(!checked);
  };

  const fetchAssets = async () => {
      try {
          // Fetch the list of assets from the server
          const response = await axios.get('http://localhost:8000/api/hostel_assets/');
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
              await axios.post('http://localhost:8000/api/hostel_assets/', {
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
            `http://localhost:8000/api/hostel_assets/${assetID}/`,
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
        `http://localhost:8000/api/hostel_assets/${assetID}/`
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
      <header>
        <AdminHorizontalNav/>
          <div className="Style">
              <div>
                  <h2>Hostel Assets</h2>
                  <hr /> <br />
                  <TextField
                      id="outlined-basic"
                      label="Name"
                      variant="outlined"
                      style={{ width: '75%', marginBottom: '15px' }}
                      onChange={(e) => setAssetName(e.target.value)}
                      value={assetName}
                  />
              </div>
              <br />
              <br />
              <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  rows={2}
                  style={{ width: '75%', marginBottom: '15px' }}
                  onChange={(e) => setAssetDescription(e.target.value)}
                  value={assetDescription}
              />
              <h2>Availability:</h2>
              NO <Switch
                  checked={checked}
                  onChange={handleSwitchChange}
                  inputProps={{ "aria-label": "controlled" }}
              /> Yes
              <br />
              <br />
              <div className="button-container">
                  <Button id='one' variant="outlined" onClick={addAsset} style={{ marginRight: '50px', width: '25%' }}>
                      Add
                  </Button>
              </div>
              <div style={{ overflow: 'auto', maxHeight: '400px' }}>
              <h2>Asset List:</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                  <thead>
                      <tr>
                          <th>Asset Name</th>
                          <th>Description</th>
                          <th>Availability Status</th>
                          <th>Action</th>
                      </tr>
                  </thead>
                  <tbody>
                      {assets.map(asset => (
                          <tr key={asset.AssetID}>
                              <td>{asset.AssetName}</td>
                              <td>{asset.Description}</td>
                              <td>{asset.AvailabilityStatus.toString()}</td>
                              <td>
                                  <Button variant="outlined" onClick={() => deleteAsset(asset.AssetID)} style={{ marginLeft: '20px', width: '80%' }}>
                                      Delete
                                  </Button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>

          </div>
      </header>
  );
}

export default AdminAsset;
