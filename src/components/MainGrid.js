import React from 'react';
import axios from 'axios';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tooltip from '@material-ui/core/Tooltip';
import Announcement from '@material-ui/icons/Announcement';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TableConders from './TableConders';
import DialogConder from './DialogConder';

const lights = [
    {
        value: '40',
        label: 'Высокая',
    },
    {
        value: '35',
        label: 'Средняя',
    },
    {
        value: '30',
        label: 'Слабая',
    },
];
const styles = theme => ({
    root: {
        flexGrow: 1,
        maxWidth: '980px',
        margin: '20px auto',
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
    },

});

class FullWidthGrid extends React.Component {

    state = {
        S: 20,
        H: 3,
        light: '30',
        people: 2,
        comp: 0,
        tv: 0,
        Panother: 0,
        checkVent: false,
        meansureVO: 0,
        checkWindow: false,
        window: 0,
        upFloor: false,
        garantTwenty: false,
        P: 2.06,
        Pmin: 1.96,
        Pmax: 2.37,
        conders: [],
        showDialog: false,
        showDialogData: {}
    };
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    handleChangeSwitch = name => event => {
        this.setState({[name]: event.target.checked});
    };
    handleCalc = () => {
        let q1 = this.state.S * this.state.H * parseInt(this.state.light, 10) / 1000;
        if (this.state.upFloor) {
            q1 = q1 + q1 * 0.15;
        }
        if (this.state.garantTwenty) {
            q1 = q1 + q1 * 0.25;
        }
        if (this.state.checkVent) {
            q1 = q1 + q1 * 0.20 * this.state.meansureVO;
        }
        if (this.state.checkWindow) {
            q1 = q1 + 0.2 * this.state.window;
        }
        let q2 = this.state.people * 0.13;
        let q3 = 0.3 * this.state.comp + 0.2 * this.state.tv + 0.3 * this.state.Panother;
        let rez = q1 + q2 + q3;
        let maxRez = rez + rez * 0.15;
        if (maxRez < 2.2) maxRez = 2.26;
        let minRez = rez - rez * 0.05;
        this.setState({
            P: rez.toFixed(2),
            Pmin: minRez.toFixed(2),
            Pmax: maxRez.toFixed(2)
        });
        let that = this;
       // axios -------------
            let data = new FormData();
            data.append('max', maxRez);
            data.append('min', minRez);
            axios({
                method:'POST',
                url:'http://vladklimat.com/page/powertest',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'credentials': 'same-origin'

                },
                data: data,
                    withCredentials: true,
                    credentials: 'same-origin',
                }
        )
                .then(function (response) {
                    let data = JSON.parse(response.data);
                    that.setState({conders: data});
                })
                .catch(function (error) {
                    console.log(error);
                });

        // };

        //---- FETCH-----
        // let myHeaders = new Headers();
        // // myHeaders.append('Content-Type', 'application/json; charset=UTF-8');
        // myHeaders.append('credentials', 'same-origin');
        // myHeaders.append('Access-Control-Allow-Origin', '*');
        //
        // let data = new FormData();
        // data.append('max', maxRez);
        // data.append('min', minRez);
        //
        // let myInit = {
        //     method: 'POST',
        //     headers: myHeaders,
        //     body: data,
        //     mode: 'no-cors',
        //     cache: 'default'
        // };
        //
        // let myRequest = new Request('http://vladklimat.local/page/powertest');
        //
        // fetch(myRequest, myInit)
        //     .then((response) => {
        //         return response;
        //     })
        //     .then((data) => {
        //         console.log((data));
        //         //that.setState({conders: JSON.parse( data)})
        //     })
        //     .catch(err=>{
        //         console.log(err);
        //     });

        // window.$.ajax({
        //     url: '/page/powertest',
        //     type: 'post',
        //     dataType: 'json',
        //     data: {
        //         max: maxRez,
        //         min: minRez,
        //         // _csrf: yii.getCsrfToken()
        //     },
        //     success: function (data) {
        //         console.log(JSON.parse(data));
        //         that.setState({conders: JSON.parse(data)});
        //     },
        //     'error': function (e) {
        //         console.log(e);
        //     },
        //     'cache': false
        // });

    };

    handleDialogClose = () => {
        this.setState({
            showDialog: false
        })
    };

    handleDialogOpen = (id) => {
        let data = this.state.conders.filter(conder=>conder.id===id);
        this.setState(
            {
                showDialogData: data[0],
                showDialog: true
            }
        );
    };

    render() {
        const {classes} = this.props;
        return (

            <div className={classes.root}>
                <DialogConder show={this.state.showDialog}
                              handleClose={this.handleDialogClose}
                              data={this.state.showDialogData}
                              disableBackdropClick={false}
                              onBackdropClick={()=>{console.log("!!!!!!")}}

                />
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}><h2>Расчет мощности кондиционера</h2></Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper}>
                            <h3>Основные параметры</h3>
                            <TextField
                                id="s"
                                label="Площадь пола,м²"
                                value={this.state.S}
                                onChange={this.handleChange('S')}
                                type="number"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                            <TextField
                                id="h"
                                label="Высота потолка,м"
                                value={this.state.H}
                                onChange={this.handleChange('H')}
                                type="number"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                            <TextField
                                id="select-light"
                                select
                                label="Освещение солнцем"
                                className={classes.textField}
                                value={this.state.light}
                                onChange={this.handleChange('light')}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                helperText=""
                                margin="normal"
                            >
                                {lights.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                id="people"
                                label="Количество людей"
                                value={this.state.people}
                                onChange={this.handleChange('people')}
                                type="number"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                            <TextField
                                id="comp"
                                label="Количество компьютеров"
                                value={this.state.comp}
                                onChange={this.handleChange('comp')}
                                type="number"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                            <TextField
                                id="tv"
                                label="Количество телевизоров"
                                value={this.state.tv}
                                onChange={this.handleChange('tv')}
                                type="number"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                            <TextField
                                id="tv"
                                label="Мощность другой бытовой техники, кВт"
                                value={this.state.Panother}
                                onChange={this.handleChange('Panother')}
                                type="number"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper}>
                            <h4>Дополнительные параметры</h4>
                            <Paper className={classes.paper}>
                                <Tooltip id="tooltip-icon"
                                         title="При выборе этой опции мощность будет увеличенна, для компенсации вентиляции">
                                    <IconButton aria-label="">
                                        <Announcement/>
                                    </IconButton>
                                </Tooltip>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={this.state.checkVent}
                                            onChange={this.handleChangeSwitch('checkVent')}
                                            value="checkVent"
                                            color="primary"
                                        />
                                    }
                                    label="Учитывать вентиляцию?"
                                />
                                <TextField
                                    id="meansureVO"
                                    label="Кратность воздухообмена"
                                    value={this.state.meansureVO}
                                    onChange={this.handleChange('meansureVO')}
                                    type="number"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    margin="normal"
                                    disabled={!this.state.checkVent}
                                />


                            </Paper>
                            <Paper className={classes.paper}>
                                <Tooltip id="tooltip-icon" title="При выборе этой опции мощность будет увеличенна, для компенсации площади остекления,
                            в стандартном расчете площадь окна равна 2 м²">
                                    <IconButton aria-label="">
                                        <Announcement/>
                                    </IconButton>
                                </Tooltip>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={this.state.checkWindow}
                                            onChange={this.handleChangeSwitch('checkWindow')}
                                            value="checkWindow"
                                            color="primary"
                                        />
                                    }
                                    label="Учитывать окна?"
                                />
                                <TextField
                                    id="checkWindow"
                                    label="Площадь остекления  м²"
                                    value={this.state.window}
                                    onChange={this.handleChange('window')}
                                    type="number"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    margin="normal"
                                    disabled={!this.state.checkWindow}
                                />
                                <Paper className={classes.paper}>
                                    <Tooltip id="tooltip-icon"
                                             title="При выборе этой опции мощность будет увеличенна, для компенсации нагретой крыши">
                                        <IconButton aria-label="">
                                            <Announcement/>
                                        </IconButton>
                                    </Tooltip>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={this.state.upFloor}
                                                onChange={this.handleChangeSwitch('upFloor')}
                                                value="upFloor"
                                                color="primary"
                                            />
                                        }
                                        label="Верхний этаж ?"
                                    />

                                </Paper>
                                <Paper className={classes.paper}>
                                    <Tooltip id="tooltip-icon"
                                             title="При выборе этой опции мощность будет увеличенна, чтобы при любой аномально жаркой погоде гарантировать 20°С в помещении">
                                        <IconButton aria-label="">
                                            <Announcement/>
                                        </IconButton>
                                    </Tooltip>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={this.state.garantTwenty}
                                                onChange={this.handleChangeSwitch('garantTwenty')}
                                                value="garantTwenty"
                                                color="primary"
                                            />
                                        }
                                        label="Гарантированные 20°С ?"
                                    />

                                </Paper>

                            </Paper>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Button variant="contained" color="primary" className={classes.button}
                                    onClick={this.handleCalc}>
                                Расчитать
                            </Button>
                        </Paper>
                        <Paper className={classes.paper}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography variant="headline" component="h5" color={'primary'}>
                                        Мощность охлаждения Q:
                                        {`   ${this.state.P} кВт.`}
                                    </Typography>

                                    <Typography variant="headline" component="h5" color={'primary'}>
                                        Рекомендуемый диапазон мощности:
                                        {`   ${this.state.Pmin} - ${this.state.Pmax} кВт.`}
                                    </Typography>

                                </CardContent>
                            </Card>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}><h3>Результаты расчета</h3></Paper>
                        <TableConders data={this.state.conders} onDialog={this.handleDialogOpen}/>
                    </Grid>

                </Grid>
            </div>
        );
    }

}


export default withStyles(styles)(FullWidthGrid);