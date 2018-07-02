import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class DialogConder extends React.Component {

    render() {
        let HtmlToReactParser = require('html-to-react').Parser;
        let htmlToReactParser = new HtmlToReactParser();
        let reactElement = htmlToReactParser.parse(this.props.data.body);
        return (
            <div>
                <Dialog
                    open={this.props.show}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{this.props.data.title}</DialogTitle>
                    <DialogContent>

                        <DialogContentText id="alert-dialog-description">
                                {reactElement}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="primary" autoFocus>
                            Закрыть
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default DialogConder;