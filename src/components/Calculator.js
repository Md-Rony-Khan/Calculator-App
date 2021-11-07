import BackspaceIcon from '@material-ui/icons/Backspace';
import React from 'react';
import Button from './Button';
import Input from './Input';

export default class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '0',
            currentNumber: '',
            prevNumber: '',
            operator: '',
        };
    }

    handleChange = (val) => {
        this.setState({
            input: val,
        });
    };

    addInput = (val) => {
        const { input } = this.state;
        if (input === '0') {
            this.setState({
                input: val,
            });
        } else {
            this.setState({
                input: input + val,
            });
        }
    };

    editInput = () => {
        const { input } = this.state;

        this.setState({
            input: input.charAt(0) !== '' ? input.slice(0, -1) : '0',
        });
    };

    clearInput = () => {
        this.setState({
            input: '0',
            currentNumber: '',
            prevNumber: '',
            operator: '',
        });
    };

    addDecimal = (val) => {
        // only add decimal if there is no current decimal point present in the input area
        const { input } = this.state;
        if (input.indexOf('.') === -1) {
            this.setState({ input: input + val });
        }
    };

    addZeroToInput = (val) => {
        // if this.state.input is not empty then add zero
        const { input } = this.state;
        if (input !== '0') {
            this.setState({ input: input + val });
        }
    };

    add = () => {
        const { input } = this.state;
        this.state.prevNumber = input;
        this.setState({
            input: '0',
        });
        this.state.operator = 'plus';
    };

    subtract = () => {
        const { input } = this.state;
        this.state.prevNumber = input;
        this.setState({
            input: '0',
        });
        this.state.operator = 'subtract';
    };

    multiply = () => {
        const { input } = this.state;
        this.state.prevNumber = input;
        this.setState({
            input: '0',
        });
        this.state.operator = 'multiply';
    };

    divide = () => {
        const { input } = this.state;
        this.state.prevNumber = input;
        this.setState({
            input: '0',
        });
        this.state.operator = 'divide';
    };

    percent = () => {
        const { input, prevNumber, operator } = this.state;
        if (operator === 'plus') {
            this.setState({
                input: parseFloat(prevNumber) * (parseFloat(input) / parseFloat(100)),
            });
        } else if (operator === 'subtract') {
            this.setState({
                input: (parseFloat(prevNumber) * parseFloat(input)) / parseFloat(100),
            });
        } else if (operator === 'multiply') {
            this.setState({
                input: parseFloat(input) / parseFloat(100),
            });
        } else if (operator === 'divide') {
            this.setState({
                input: parseFloat(input) / parseFloat(100),
            });
        } else {
            this.setState({
                input: parseFloat(input) / parseFloat(100),
            });
        }
    };

    evaluate = () => {
        const { input, prevNumber, operator } = this.state;
        this.state.currentNumber = input;
        const { currentNumber } = this.state;

        if (operator === 'plus') {
            this.setState({
                input: (parseFloat(prevNumber) + parseFloat(currentNumber)).toFixed(3),
            });
        } else if (operator === 'subtract') {
            this.setState({
                input: (parseFloat(prevNumber) - parseFloat(currentNumber)).toFixed(3),
            });
        } else if (operator === 'multiply') {
            this.setState({
                input: (parseFloat(prevNumber) * parseFloat(currentNumber)).toFixed(3),
            });
        } else if (operator === 'divide') {
            this.setState({
                input: (parseFloat(prevNumber) / parseFloat(currentNumber)).toFixed(3),
            });
        } else {
            this.setState({
                input: currentNumber,
            });
        }
    };

    render() {
        // eslint-disable-next-line no-unused-vars
        const { input, prevNumber, currentNumber, operator } = this.state;
        return (
            <div className="calc-wrapper">
                <div className="row">
                    <Input>{input}</Input>
                </div>
                <div className="row">
                    <Button handleClick={this.clearInput}>AC</Button>
                    <Button handleClick={this.editInput}>
                        <BackspaceIcon />
                    </Button>
                    <Button handleClick={this.percent}>%</Button>
                </div>
                <div className="row">
                    <Button handleClick={this.addInput}>7</Button>
                    <Button handleClick={this.addInput}>8</Button>
                    <Button handleClick={this.addInput}>9</Button>
                    <Button handleClick={this.divide}>/</Button>
                </div>
                <div className="row">
                    <Button handleClick={this.addInput}>4</Button>
                    <Button handleClick={this.addInput}>5</Button>
                    <Button handleClick={this.addInput}>6</Button>
                    <Button handleClick={this.multiply}>*</Button>
                </div>
                <div className="row">
                    <Button handleClick={this.addInput}>1</Button>
                    <Button handleClick={this.addInput}>2</Button>
                    <Button handleClick={this.addInput}>3</Button>
                    <Button handleClick={this.subtract}>-</Button>
                </div>
                <div className="row">
                    <Button handleClick={this.addDecimal}>.</Button>
                    <Button handleClick={this.addZeroToInput}>0</Button>
                    <Button handleClick={this.evaluate}>=</Button>
                    <Button handleClick={this.add}>+</Button>
                </div>
            </div>
        );
    }
}
