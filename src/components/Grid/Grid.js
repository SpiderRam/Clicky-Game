import React, {Component} from "react";
import "./Grid.css";
import femmeBlocks from "../../femmes.json";
import Card from "../Card";
import Header from "../Header/Header";


class Grid extends Component {
    state = {
        femmes: femmeBlocks,
        score: 0
    }

    resetGame = () => {
        this.setState({
            score: 0,
            femmes: femmeBlocks
        })      
    }

    handleCorrect = newFemmes => {
        this.setState({
            femmes: this.shuffleArray(newFemmes), 
            score: this.state.score +1,
         });

         if (this.state.score === 12) {
             this.resetGame();
         }
    };

    handleWrong = () => {
        this.resetGame();
    };

    handleClick = name => {
        let guessedCorrect = false;
        const newFemmes = this.state.femmes.map(femme => {
           const newPic = {...femme};
           if (newPic.name === name) {
               if(!newPic.clicked){
                   console.log("Already guessed------------");
                   newPic.clicked = true;
                   guessedCorrect = true;
               }
               
           }
           return newPic;
       })       
       console.log("GUESSED CORRECT: ", guessedCorrect)
       guessedCorrect ? this.handleCorrect(newFemmes) : this.handleWrong(newFemmes)
    };

    shuffleArray = femmes => {
        for (let i = femmes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [femmes[i], femmes[j]] = [femmes[j], femmes[i]];
        }
        return (femmes);
    };

    render() {
        return(
            <div>
            <Header score={this.state.score}/>
            <div className="gridWrapper">
                <div className="grid">
                {this.state.femmes.map(femme => {
                        return (<Card 
                        name={femme.name}
                        key={femme.name} 
                        handleClick={this.handleClick}
                        src={femme.image} 
                        alt={femme.name}  
                       />)
                    })}
                </div>
            </div>
            </div> 
        );
    }
};

export default Grid;
    