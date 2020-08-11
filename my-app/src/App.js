import React from "react";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class App extends React.Component {
  constructor() {
    console.log("Constructor");
    super();
    this.state = {
      persons: [],
      profile: ""
    };
  }

  componentDidMount() {
    console.log("CDM running");
    axios
      .get("https://api.github.com/users/rivyyriv")
      .then((res) => {
        console.log(res)
        this.setState({ persons: res.data });
        //console.log(this.state);
      })
      .catch((err) => console.log(err));
  }

  componentDidUpdate(prevState, prevProps) {
    if (prevState.persons !== this.state.persons) {
      console.log("persons have changed!");
    }
    if (prevState.persons !== this.state.persons) {
      console.log("State updated, dog breed:", this.state.persons);
    }
  }

  fetchpersons = () => {
    axios
      .get(`https://api.github.com/users/${this.state.profile}`)
      .then((res) => {
        this.setState({        
           persons: [...this.state.persons, res],
           profile: ""
        });


      })
      .catch((err) => console.log(err));
  };

  handleChanges = (e) => {
    console.log("handleChanges called");
    this.setState({
      persons: [...this.state.persons],
      profile: e.target.value
    });
  };

  render() {
    console.log("Render");
    return (
      <div className="App">
        <h1>Hello persons</h1>
        <input
          type="text"
          value={this.state.profile}
          onChange={this.handleChanges}
        />
        
        <button onClick={this.fetchpersons}>Fetch Person</button>

        { this.state.persons.map( person => (
            
              <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                      <h1>{person.name}</h1>
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                    across all continents except Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions>
            </Card>

        ))}

  );

       
      </div>
    );
  }
}

export default App;


