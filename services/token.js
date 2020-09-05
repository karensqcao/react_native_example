// get usertoken
export async function getToken(url, username, password) {

    var token_url = url + "";
    global.username = username;
    global.password = password;
    // post options 
    var details = {
      'username': username,
      'password': password,
      'grant_type': 'password'
    };
    var formBody = [];
  
    // create form body for x-www-form-urlencoded request
    for (var item in details) {
      var encodedKey = encodeURIComponent(item);
      var encodedValue = encodeURIComponent(details[item]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    // post request
    return fetch(token_url, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      })
    .then((res) => {
      if (res.ok) {   // handle network response 
        return res.json();
      }
      global.wrong_username = true;
    })
    .then(json => {
      global.bearer_token = json.access_token;
    })
  }