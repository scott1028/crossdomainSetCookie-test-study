'use strict';

window.fetchNative = window.fetch;
delete window.fetch;

var setCurrentDomainCookie = function() {
  document.cookie = `A_${new Date().getTime()}=${new Date().getTime()}`;
}

var onAxios = function(url) {
  console.log('Clicked Axios');
  console.log('before', document.cookie);
  axios.get(url || 'http://127.0.0.1:3000/setCookie', {
    withCredentials: true,
  })
    .then(function (response) {
      console.log('after', document.cookie);
      // handle success
      console.log('ResponseData', response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
};

var onAjax = function(url) {
  console.log('Clicked Ajax');
  $.ajax({
    method: 'get',
    url: url || 'http://127.0.0.1:3000/setCookie',
    beforeSend: () => {console.log('before', document.cookie)},
    xhrFields: {
      withCredentials: true,
    },
  }).done(data => {
    console.log('ResponseData', data);
    console.log('after', document.cookie);
  });
};

var onFetch = function(url, opts) {
  console.log('Clicked Fetch');
  console.log('before', document.cookie);
  var opts = opts || {};
  fetchNative(url || 'http://127.0.0.1:3000/setCookie', {
    method: 'get',
    // mode: 'no-cors',
    credentials: 'include',  // also include cookie from current browser document.cookie, even if browser is different domain.
    // credentials: 'same-origin', // also include cookie from current browser document.cookie, even if browser is different domain.
    //
    // headers: {
    //   AA: '8',
    // },
    ...opts,
  }).then(resp => resp.text()).then(data => {
    console.log('ResponseData', data);
    console.log('after', document.cookie);
  });
};

var onWhatWgFetch = function(url) {
  console.log('Clicked Fetch');
  console.log('before', document.cookie);
  fetch(url || 'http://127.0.0.1:3000/setCookie', {
    method: 'get',
    // mode: 'no-cors',
    credentials: 'include',  // also include cookie from current browser document.cookie, even if browser is different domain.
    // credentials: 'same-origin',  // also include cookie from current browser document.cookie, even if browser is different domain.
  }).then(resp => resp.text()).then(data => {
    console.log('ResponseData', data);
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

var cleanConsole = function() {
  $('#console-log-text').text('');
};
