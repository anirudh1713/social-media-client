import React from 'react';

import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TableBody } from '@material-ui/core';

const About = (props) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {props.data.map(item => {
            return (
              <TableRow key={item.name}>
                <TableCell component="th" scope="row">{item.name}</TableCell>
                <TableCell align="right">{item.value}</TableCell>
              </TableRow>
            )})
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default About;
