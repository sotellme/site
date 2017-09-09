'use strict';

import io from 'socket.io-client';


const SocketChannel = {

  startSocket (baseUrl){
    let socket = io(`${baseUrl}`, {
      path: '/stream'
    });
    socket.on('roomStarted', function(data){
      document.location.assign(`${baseUrl}/rooms/${data.roomId}`)
    }); 
    socket.on('question', function(data){
      App.updateQuestion(data.questionId);
    })
    socket.on('roomEnded', function(data){
      document.location.assign(`${baseUrl}`)
      App.resetState()
    })
    return socket;
  },

  sendNumber (socketInstance, query) {
    socketInstance.emit('number', query);
    return Promise.resolve();
  },

  newQuestion (socketInstance) {
    socketInstance.emit('newQuestion')
    return Promise.resolve();
  }
  
}

module.exports = SocketChannel;

import App from '../components/App'