import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key="auth">
        <Scene key="login" component={LoginForm} title="Please Login" initial />
      </Scene>

      <Scene key="main">
        <Scene
          title="Employees"
          key="employeeList"
          component={EmployeeList}
          onRight={() => Actions.employeeCreate()}
          rightTitle="Add"
          initial
        />

        <Scene title="Create Employee" key="employeeCreate" component={EmployeeCreate} />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
