import React from "react";

interface IState {
  random: number;
  shownNumbers: number[];
  numbersLeft: number;
  numbersToBeShown: number[];
  running: boolean;
}

class RandomNumber extends React.Component<any, IState> {
  private interval: any;
  constructor(props: any) {
    super(props);

    this.state = {
      random: 0,
      shownNumbers: [],
      numbersLeft: 91,
      numbersToBeShown: Array.from(Array(91).keys()),
      running: false
    };

    this.getRandom = this.getRandom.bind(this);
    this.getNewNumber = this.getNewNumber.bind(this);
  }

  render() {
    const { random, numbersToBeShown, running, shownNumbers } = this.state;
    if (numbersToBeShown.length === 1 && running) {
      this.stop();
    }
    return (
      <>
        {random !== 0 && shownNumbers.length < 90 && <h2>El número es {random}</h2>}{" "}
        {!running && shownNumbers.length === 0 && <button onClick={this.start}>Start</button>}
        {running && <button onClick={this.stop}>Stop</button>}
        {!running && shownNumbers.length > 0 && <button onClick={this.start}>Resume</button>}
        {!running && shownNumbers.length > 0 && <button onClick={this.reset}>Reset</button>}
        <p>Números que ya han salido:</p>
        {shownNumbers.map(numbers => (
          <span> {numbers},</span>
        ))}
      </>
    );
  }

reset = () => {
  this.setState({shownNumbers: [], numbersLeft: 91, numbersToBeShown: Array.from(Array(91).keys())})
}

  getRandom = () =>
    Math.floor(Math.random() * (this.state.numbersLeft - 1) + 1);

  start = () => {
    this.interval = setInterval(() => this.getNewNumber(), 50);
    this.setState({ running: true });
  };

  stop = () => {
    clearInterval(this.interval);
    this.setState({ running: false });
    console.log("Stop");
  };

  getNewNumber = () => {
    let { shownNumbers, numbersToBeShown } = this.state;

    const currentNumberIndex: number = this.getRandom();

    let currentNumber = numbersToBeShown[currentNumberIndex];
    numbersToBeShown.splice(currentNumberIndex, 1);

    console.log("Current number: " + currentNumber);
    console.log("shownnumbers number: " + shownNumbers);
    console.log("Numbers left: " + numbersToBeShown);

    shownNumbers.push(currentNumber);
    shownNumbers.sort((a, b) => a - b)
    this.setState(() => ({ random: currentNumber }));
    this.setState(({ numbersLeft }) => ({ numbersLeft: numbersLeft - 1 }));
  };
}

export default RandomNumber;
