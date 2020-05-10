import React from "react";
import { DataApi } from "./DataApi";
import './Trivia.css';

class Trivia extends React.Component {
  state = {
    userAnswer: null,
    currentQuestion: 0,
    incorrect_answers: []
  };

  loadTrivia = () => {
    const { currentQuestion } = this.state;
    this.setState(() => {
      return {
        questions: DataApi[currentQuestion].question,
        incorrect_answers: DataApi[currentQuestion].incorrect_answers,
        correct_answer: DataApi[currentQuestion].correct_answer
      };
    });
  };

  componentDidMount() {
    this.loadTrivia();

    // fetch("https://opentdb.com/api.php?amount=8&category=9&type=multiple.json")
    //   .then(response => response.json())
    //   .then(data => this.setState({ data }));
    // fetch('https://opentdb.com/api.php?amount=8&category=9&type=multiple.json')
    //     .then((res)=>{
    //         return res.json();
    //     })
    //     .then((resJSON)=>{
    //         this.setState({data: resJSON})
    //     })
  }

  nextQuestionHandler = () => {
    this.setState({
      currentQuestion: this.state.currentQuestion + 1
    });
    console.log(this.state.currentQuestion);
  };

  //Actualizamos el componente
  componentDidUpdate(prevProps, prevState) {
    const {currentQuestion} = this.state;
    if(this.state.currentQuestion !== prevState.currentQuestion) {
      this.setState(() => {
        return {
            questions: DataApi[currentQuestion].question,
            incorrect_answers: DataApi[currentQuestion].incorrect_answers,
            correct_answer: DataApi[currentQuestion].correct_answer
        };
      })
    }
  }

    render() {
    const { questions, correct_answer, incorrect_answers, currentQuestion} = this.state;
    return (
      <div className="App">
        
        <h3>{questions}</h3>
        <span>{`Questions ${currentQuestion} out of ${DataApi.length -1}`}</span>
        {incorrect_answers.map(incorrect_answers => (
          <p className="container-juego">
            <button onClick={this.state.loadTrivia}>{incorrect_answers}</button>
          </p>
        ))}
        
        <React.Fragment>
            <div className="container-juego">
            <button onClick={this.state.loadTrivia}><p>{correct_answer}</p></button>
            </div>
            <br></br>
            <button onClick={this.nextQuestionHandler}>Next</button>
            {/* <button onClick={()=>console.log('hola')}>Next</button> */}
        </React.Fragment>
      </div>
    );
  }
}

export default Trivia;