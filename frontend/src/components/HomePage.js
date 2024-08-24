import React, { Component } from "react";
import ChecklistPage from './ChecklistPage';
import CreateChecklistPage from './CreateChecklistPage';
import {BrowserRouter as Router,Routes,Route,Link,Redirect,} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";


export default class HomePage extends Component{
    constructor (props){
        super(props);
    }

    render() {
        return (
        <Router>
            <Routes>
                <Route path='/' element={<p>This is the home page</p>}/>
                <Route path='/create' element={<CreateChecklistPage/>}/>
                <Route path='/list/:checklistCode' element ={<ChecklistPage/>}/>
            </Routes>
            <Grid item xs={12} align="center">
                <Button color="secondary" variant="contained" to="create" component={Link}>Go to Create Checklist</Button>
            </Grid>
            
        </Router>
        
        
        );
    }
}