import React, {Component} from 'react';
import './App.css';
import MainGrid from './components/MainGrid';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
        typography: {
            fontSize: 22,
        },
    }
);

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className="App">
                    <MainGrid/>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
