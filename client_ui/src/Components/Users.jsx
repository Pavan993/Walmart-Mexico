import React, { useState, useEffect } from "react";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';

const StyledTable = withStyles((theme) => ({
    root: {
        width: '25rem'
    },
}))(Table);

const Users = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        axios.get('/users').then((response) => {
            const { data = [] } = response;
            setUsers(data)
        })
    }, [])
    return (
        <div>
            <Typography variant="h5" gutterBottom>
                All Users
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Users And Their Ages
            </Typography>
            <TableContainer >
                <StyledTable aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>User Name</TableCell>
                            <TableCell align="right">Age</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(({ username, age }) => (
                            <TableRow key={username}>
                                <TableCell component="th" scope="row">
                                    {username}
                                </TableCell>
                                <TableCell align="right">{age}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </StyledTable>
            </TableContainer>
        </div>
    )
};

export default Users;