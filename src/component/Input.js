import React, { Component } from 'react';
import {
    FormGroup, Label,
    Col, Input as InputRc,
    FormFeedback,
    Row
} from 'reactstrap';

export class Input extends Component {

    state = {};

    onInputChange = (event) => {
        const { onChange, validator, required } = this.props;
        onChange(event);
        if (required) {
            const valid = validator(event.target.value);
            this.setState({ valid: valid });
        } else {
            this.setState({ valid: true });
        }
    }

    isValid() {
        console.log(this.state.valid)
        return !this.props.required || !!this.state.valid;
    }

    render() {
        const {
            label, id, required, value, onChange, errorMessage,
            validator, type,
        } = this.props;
        const { valid } = this.state;
        return (
            <FormGroup>
                <Label for={id}>{label}</Label>
                <InputRc id={id} type={type} value={value} valid={valid} invalid={ valid === false ? true : false} 
                    required={required} onChange={this.onInputChange} />
                 <FormFeedback>{errorMessage}</FormFeedback>
            </FormGroup>
        );
    }
}
