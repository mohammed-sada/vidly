import { Component } from "react";
import Joi from "joi-browser";
import Input from "./Input";
import Select from "./Select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  handleValidate = () => {
    const { error } = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });
    if (!error) return;

    const newErrors = {};
    for (let item of error.details) newErrors[item.path[0]] = item.message;
    return Object.keys(newErrors).length === 0 ? null : newErrors;
  };

  handleValidateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const singleSchema = { [name]: this.schema[name] };

    const { error } = Joi.validate(obj, singleSchema); //we want to abbort
    return !error ? null : error.details[0].message;
  };

  handleChange = ({ currentTarget: input }) => {
    const newErrors = { ...this.state.errors };
    const errorMessage = this.handleValidateProperty(input);
    if (errorMessage) newErrors[input.name] = errorMessage;
    else delete newErrors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ errors: newErrors, data });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.handleValidate();
    this.setState({ errors: errors || {} });
    if (errors) {
      return;
    }

    this.doSubmit();
  };

  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;

    return (
      <Input
        name={name}
        value={data[name]}
        label={label}
        type={type}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };
  renderSelect = (name, label, options) => {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        options={options}
        error={errors[name]}
      />
    );
  };

  renderButton = (label) => {
    return (
      <button
        disabled={this.handleValidate()}
        type="submit"
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  };
}
export default Form;
