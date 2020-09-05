// get server version
export async function getVersion(url) {
  var version_url = url + "";
  var bearer = 'Bearer ' + global.bearer_token;
  var options = {
    method: 'GET',
    withCredentials: true,
    credentials: 'include',
    headers: {
      'Authorization': bearer,
      'Content-Type': 'application/json',
    }
  };
  var res = await fetch(`${version_url}`, options);
  if(res.ok){
    var json = await res.json();  
  } else {
    return null;
  }
  return result;
}