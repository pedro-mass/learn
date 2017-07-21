import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {
  render() {
    // this handleSubmit is from reduxForm. It gives us the values
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        {/* label field is something we added so that we can toggle the field label
          this is an actual prop for Field, but it passes it along for us */}
        <Field label="Title" name="title" component={this.renderField} />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }

  onSubmit = values => {
    console.log(values);
  };

  renderField(field) {
    return (
      <div className="form-group">
        <label>
          {field.label}
        </label>
        <input className="form-control" type="text" {...field.input} />
        {field.meta.touched ? field.meta.error : ''}
      </div>
    );
  }
}

const validate = values => {
  const errors = {};

  // validate the inputs from 'values'

  // title is picked by the Field name
  if (!values.title) {
    // same here
    errors.title = 'Enter a title!';
  }

  if (!values.categories) {
    errors.categories = 'Enter some categories';
  }

  if (!values.content) {
    errors.content = 'Enter some content please';
  }

  // if errors is empty, the form is fine to submit
  // if errors has *any* properties, redux form assumes form is invalid
  return errors;
};

export default reduxForm({
  // the name of the form (must be unique)
  form: 'PostsNewForm',
  validate
})(PostsNew);
