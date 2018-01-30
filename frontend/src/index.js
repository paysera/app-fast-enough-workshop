import appContent from './app.html';
import OfflinePluginRuntime from 'offline-plugin/runtime';

import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'bootstrap/scss/bootstrap.scss';
import 'toastr/build/toastr.css';

import './main/user-status';

import './main/leaderboard';
import './main/challenge';

OfflinePluginRuntime.install();
document.getElementById('app').innerHTML = appContent;

