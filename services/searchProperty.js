// return nodes' properties 
export async function searchProperty(url, id) {
    var node_url = url + "";
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
    var res = await fetch(`${node_url}${id}`, options);
    if(res.ok){
      var json = await res.json();
      var pages = json.total_pages;
      var count = json.total_items;
      // api returns 0 or 1 pages 
      if(pages <= 1) {
        // result object 
        var jsonObj = [];
        for (let i = 0; i < count; i++) {
          var item = {};
          var key = json._items[i].name.toString();
          var val = json._items[i].value;
          item['id'] = key + ": " + val;
          jsonObj.push(item);
        }
      // api returns multiple pages 
      } else {
        var res = await fetch(`${node_url}${id}&per_page=${count}`, options);
        if(res.ok) {
          var json = await res.json();
          var jsonObj = [];
          for (let i = 0; i < count; i++) {
            var item = {};
            var key = json._items[i].name.toString();
            var val = json._items[i].value;
            item['id'] = key + ": " + val;
            jsonObj.push(item);
          }
        } else {
          return null;
        }
      }
    } else {
      return null;
    }
    global.property_list = jsonObj;
    return jsonObj;
  }