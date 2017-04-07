import React, { Component } from 'react';
import { connect } from 'react-redux';
import { employeeUpdate } from '../actions';
import { Card, CardSection, Input, Button } from './common';

class EmployeeCreate extends Component {
  render() {
    const { name, phone } = this.props;

    return (
      <Card>
        <CardSection>
          <Input
            label="Name"
            placeholder="bob"
            value={name}
            onChangeText={value => this.props.employeeUpdate({
              prop: 'name', value
            })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Phone"
            placeholder="555-555-5555"
            value={phone}
            onChangeText={value => this.props.employeeUpdate({
              prop: 'phone', value
            })}
          />
        </CardSection>

        <CardSection />

        <CardSection>
          <Button>
            Create
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = ({ name, phone, shift }) => {
  return { name, phone, shift };
};

export default connect(mapStateToProps, { employeeUpdate })(EmployeeCreate);
