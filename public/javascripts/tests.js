'use strict';

window.fetchNative = window.fetch;
delete window.fetch;

var onAxios = function() {
  console.log('Clicked Axios');
  console.log('before', document.cookie);
  axios.get('http://127.0.0.1:3000/setCookie')
    .then(function (response) {
      console.log('after', document.cookie);
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
};

var onAjax = function() {
  console.log('Clicked Ajax');
  $.ajax({
    method: 'get',
    url: 'http://127.0.0.1:3000/setCookie',
    beforeSend: () => {console.log('before', document.cookie)},
    xhrFields: {
      withCredentials: true,
    },
  }).done(data => {
    console.log(data);
    console.log('after', document.cookie);
  });
};

var onFetch = function() {
  console.log('Clicked Fetch');
  console.log('before', document.cookie);
  fetchNative('http://127.0.0.1:3000/setCookie', {
    method: 'get'
    // mode: 'no-cors',
    // crendentials: 'include',
    // crendentials: 'same-origin',
  }).then(resp => resp.text()).then(data => {
    console.log(data);
    console.log('after', document.cookie);
  });
};

var onWhatWgFetch = function() {
  console.log('Clicked Fetch');
  console.log('before', document.cookie);
  fetch('http://127.0.0.1:3000/setCookie', {
    method: 'get'
    // mode: 'no-cors',
    // crendentials: 'include',
    // crendentials: 'same-origin',
  }).then(resp => resp.text()).then(data => {
    console.log(data);
    console.log('after', document.cookie);
  });
};

var cleanCookie = function() {
  function createCookie(name,value,days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
  }

  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

  function eraseCookie(name) {
    createCookie(name,"",-1);
  }

  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++)
    eraseCookie(cookies[i].split("=")[0]);
  console.log('cookies cleaned');
};
