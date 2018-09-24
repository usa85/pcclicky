import React, { Component } from 'react';
import wines from "./wines.json";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import ImageCard from "./components/ImageCard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


// Set possible max score
const maxScore = wines.length;

class App extends Component {
  // Setting this.state.cities to the cities json array
  state = {
    wines,
    currentWScore: 0,
    topWScore: 0,
    selectedImages: [],
    gameMsg: "Click a wine!"
  };

  selectImage = id => {
    // If image has already been selected (i.e. included in the selectedImages array), then Game Over!
    if (this.state.selectedImages.includes(id)) {
      this.setState({gameMsg:"Oops! Wrong Wine..."})
      this.resetGame()
    }
    // Else, increment the score
    else {
      const score = this.state.currentWScore + 1

      // Update topScore if currentScore is greater than current topScore
      if (score > this.state.topWScore) {
        this.setState({topWScore:score})
      }

      // If selected all images without repeating, then you win!
      if (score === maxScore) {
        this.setState({gameMsg: "Congratulations!"})
        this.resetGame()
      }
      // Add current image id to selectedImages array, update score, shuffle images and continue playing
      else {
        this.setState({gameMsg: "You tasted a wine!"})
        this.setState({selected:this.state.selectedImages.push(id)})
        this.setState({currentWScore:score})
        this.shuffleWineImages()
      }
    }
  }

shuffleWineImages = () => {
  const shuffledImages = this.shuffleWineArray(wines)
  this.setState({cities:shuffledImages})
}

// Shuffles array in place. ES6 version
shuffleWineArray = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Resets the game parameters, shuffle images
resetGame = () => {
  this.setState({currentWScore:0})
  this.setState({selectedImages:[]})
  this.shuffleWineImages()
}
  
  // Render the page
  render() {
    return (
      <div className="App">
        <Navbar 
          title={"Wine Game"}
          msg={this.state.gameMsg}
          score={this.state.currentWScore}
          topWScore={this.state.topWScore}
        />
        <Header
          title={"Wine Game"} 
          instructions={"Drink all you want, but only once!"}
        />

        <Wrapper>
          {wines.map(wine => (
            <ImageCard
              key={wine.id}
              id={wine.id}
              name={wine.name}
              image={wine.image}
              selectImage={this.selectImage}
            />
          ))}
        </Wrapper>
        <Footer title={"Wine Game"}></Footer>
      </div>
    );
  }
}

export default App;
