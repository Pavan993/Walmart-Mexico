import React, { useState, useEffect } from "react";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';

const StyledTable = withStyles((theme) => ({
    root: {
        width: '25rem'
    },
}))(Table);
const StyledMenu = withStyles((theme) => ({
    paper: {
        top: '100px !important'
    },
}))(Menu);

const DemoGraphicUser = () => {
    const [countOfAges, setCountOfAges] = useState([])
    const [currentItem, setCurrentItem] = useState('')
    const [items, setItems] = useState([])
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    // Initial All Items
    useEffect(() => {
        axios.get('/items').then((response) => {
            const { data = [] } = response;
            setItems(data)
        })
    }, [])
    const itemSelectHandler = (item) => {
        axios.get('/item/ageDemographic', {
            params: {
                itemToLookup: item
            }
        }).then((response) => {
            const { data = [] } = response;
            setCountOfAges(data);
            setCurrentItem(item)
            handleClose()
        })
    }
    return (
        <div>
            <Typography variant="h5" gutterBottom>
                Age Demographic Of User With {currentItem}
            </Typography>
            <div>
                <Button variant="contained" color="primary" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} >
                    Item
                </Button>
                <StyledMenu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <ul>
                        {items.map((item) => <li>
                            <MenuItem onClick={() => itemSelectHandler(item)}>{item}</MenuItem>
                        </li>)}
                    </ul>
                </StyledMenu>
            </div>
            <TableContainer >
                <StyledTable aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Age</TableCell>
                            <TableCell align="right">Count</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {countOfAges.map(({ count, age }) => (
                            <TableRow key={age}>
                                <TableCell component="th" scope="row">
                                    {age}
                                </TableCell>
                                <TableCell align="right">{count}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </StyledTable>
            </TableContainer>
        </div>
    )
};

export default DemoGraphicUser;