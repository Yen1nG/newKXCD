import React, {Component} from 'react';
import * as questions from './KXCDJSON.json';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import * as _ from 'lodash';
import './App.css';


class  App extends Component {
	constructor(props) {
		super(props);
		this.state = {matches: []};
		this.updateTerm = this.updateTerm.bind(this);
    this.search = this.search.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
	}
	
	updateTerm(e) {
    var term = e.target.value;

		this.setState({term: term});
  }
  
  handleKeyPress(e) {
    if(e.key === 'Enter'){
      this.search();
    }
  }
	
	search() {
    var term = this.state.term;

    // if (term.length < 3)
    // {
    //   term = "请至少输入三个字符来进行搜索";
    // }

		var matches = [];
		
		if (term && term.length >= 3) {
			matches = _.filter(questions.default, function(datum){
				return _.includes(datum.question, term) || _.includes(datum.shortQuestion, term)
			});
		}
		
		this.setState({matches: matches});
	}
	
	render() {
		var searchResults = null;
		
		if (this.state.matches.length > 0) {
			searchResults = _.map(this.state.matches, function(datum){
				return <Grid item xs={12} style={{textAlign: "left"}}><h3>{datum.question}</h3><p>{datum.answer}</p></Grid>
			});
		}
		
		return (
			<div className="App">
      <Container fixed>

        <Grid container spacing={2} className="bg">
          <Grid item xs={12}>
						<h1 style={{textAlign: "center"}}>QQ幻想开心辞典题库</h1>
					</Grid>

          <Grid item xs={3}></Grid>

          <Grid item xs={6}>
            <TextField className="input" inputProps={{autoComplete: 'off'}} id="outlined-basic" variant="outlined" label="请输入问题" onKeyPress={this.handleKeyPress} onChange={this.updateTerm}/>
            <h4 style={{textAlign: "left", margin: "0", color: "gray"}}>请至少输入三个字符来进行搜索</h4>
          </Grid>

          <Grid item xs={3}></Grid>

          <Grid item xs={12}>
            <Button style={{width: "10%"}} variant="contained" color="secondary" onClick={this.search}><b>搜索</b></Button>
          </Grid>

				  {searchResults}

        </Grid>
      </Container>
      </div>
  );
	}
}

export default App;