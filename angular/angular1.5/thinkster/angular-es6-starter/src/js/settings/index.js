import angular from 'angular';

// Create the settings module where our functionality can attach to
let setttingsModule = angular.module('app.settings', []);

// Include our UI-Router config settings
import SettingsConfig from './settings.config';
setttingsModule.config(SettingsConfig);

// Controllers
import SettingsCtrl from './settings.controller';
setttingsModule.controller('SettingsCtrl', SettingsCtrl);

export default setttingsModule;
