import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

function not(a, b) {                                        //return new array with elements of a and not b
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {                               //return array where elements are common in both arrays.
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {                                             //combination of all the a and elements.
  return [...a, ...not(b, a)];
}

export default function SelectAllTransferList(props) { 
  // console.log("here")                  //main function 
  const {setRightList } = props;
  const [checked, setChecked] = React.useState([]);                     //array containg all the elements
  const [left, setLeft] = React.useState(props.studentList);                    //left box
  const [right, setRight] = React.useState(props.roomList);                   //right box
  // console.log(right)
  const leftChecked = intersection(checked, left);                          //intersect the all elements and left side box
  const rightChecked = intersection(checked, right);                        //intersect the all elements and right side box

  const handleToggle = (value) => () => {                                         //while clicking a button if its already clicked then it removes from array otherwise when clicked it removwes from array
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {                                      
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
    const updatedRoomList = [...right, ...leftChecked]  // Pass the updated right list to the parent component
    setRightList(updatedRoomList);
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title, items) => (
    <Card>
      <CardHeader
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={
              numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            // inputProps={{
            //   'aria-label': 'all items selected',
            // }}
          />
        }
        title={title }
        subheader={`${numberOfChecked(items)}/${items.length} selected`}                      //this is for under header in which shows the no.ofx
      />
      <Divider />
      <List
        sx={{
          width: 200,
          height: 230,
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        // dense
        // component="div"
        // role="list"
      >
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;          //generate new seprate lableid for each items in array
          //console.log(labelId);
          return (
            <ListItemButton
              key={value}
              role="listitem"
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox                                                     //checkbox is the square shape box
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId}  />    
              <ListItemText id={labelId} primary={`${value }`} />           
            </ListItemButton>
          );
        })}
      </List>
    </Card>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>{customList('Student List', left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('Room List', right)}</Grid>
    </Grid>
  );
}

