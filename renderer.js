const electron = require('electron');
const {dialog} = electron.remote.require('electron');
const { ipcRenderer } = require('electron')


var video = document.getElementById('video');

ipcRenderer.on('message', (event, data) => {
    console.log('resieved');
    video.src = data;
    video.load();
    video.play();
  })