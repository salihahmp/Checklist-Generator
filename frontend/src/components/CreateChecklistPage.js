import React, { useState,Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import {Link, Navigate} from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useNavigate } from "react-router-dom";



export default function CreateChecklistPage(props) {
    const navigate = useNavigate();
  
    const[name,setName] = useState("");
    const[takeShower,setTakeAShower] = useState(true);
    const[eatBreakfast,setEatBreakfast] = useState(true);
    const[goToSchool,setGoToSchool] = useState(true);
    const[playGames,setPlayGames] = useState(true);
    const[goToBedEarly,setGoToBedEarly] = useState(true);


    const handleName = () => {
        setName(event.target.value);
    };
    const handleTakeShower = () => {
        setTakeAShower(event.target.value === "true" ? true : false);
    };

    const handleEatBreakfast = () => {
        setEatBreakfast(event.target.value === "true" ? true : false);
    };

    const handleGoToSchool = () => {
        setGoToSchool(event.target.value === "true" ? true : false);
    };

    const handlePlayGames = () => {
        setPlayGames(event.target.value === "true" ? true : false);
    };

    const handleGoToBedEarly = () => {
        setGoToBedEarly(event.target.value === "true" ? true : false);
    };

    const handleChecklistButtonPressed = () => {
        const requestOptions = {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name,
            take_a_shower: takeShower,
            eat_breakfast: eatBreakfast,
            go_to_school: goToSchool,
            play_games: playGames,
            go_to_bed_early: goToBedEarly,
          }),
        };
        console.log(requestOptions)
        fetch("/api/create-checklist", requestOptions)
          .then((response) => response.json())
          .then((data) => navigate('/list/'+ data.code));
      };

      return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4">
                    Create A Checklist
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <FormHelperText>
                        <div align="center">Please insert name below</div>
                    </FormHelperText>
                <TextField required={true} type="text" onChange={handleName} inputProps={{style:{textAlign:"center"}}}/>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <FormControlLabel control={<Checkbox  onChange={handleTakeShower} />} label="Take a Shower" />
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <FormControlLabel control={<Checkbox onChange={handleEatBreakfast} />} label="Eat Breakfast" />
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <FormControlLabel control={<Checkbox onChange={handleGoToSchool} />} label="Go To School" />
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <FormControlLabel control={<Checkbox onChange={handlePlayGames} />} label="Play Games" />
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <FormControlLabel control={<Checkbox onChange={handleGoToBedEarly} />} label="Go To Bed Early" />
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="primary" variant="contained" onClick={handleChecklistButtonPressed}>Create A Checklist</Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="secondary" variant="contained" to="/" component={Link}>Back</Button>
            </Grid>
        </Grid>
        );
    
}