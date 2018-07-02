import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

function TableConders(props) {
    const { classes, data, onDialog } = props;
    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Название</TableCell>
                        <TableCell numeric>Стоимость</TableCell>
                        <TableCell numeric>Мощность</TableCell>
                        <TableCell >Изображение</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(conder => {
                        return (
                            <TableRow key={conder.id} onClick={()=>onDialog(conder.id)}>
                                <TableCell component="th" scope="row">
                                    {conder.title}
                                </TableCell>
                                <TableCell numeric>{conder.price}</TableCell>
                                <TableCell numeric>{conder.p}</TableCell>
                                <TableCell numeric>
                                    <image src="${conder.thumbnail_base_url}/${conder.thumbnail_path}"
                                           className="table-img"></image></TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Paper>
    );

}
export default withStyles(styles)(TableConders);
