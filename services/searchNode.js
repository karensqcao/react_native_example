// return all nodes with the same name 
export async function searchNode(url, query) {
  var search_url = url + "";
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
  var res = await fetch(`${search_url}?q=${query}`, options);
  if(res.ok){
    var json = await res.json();
    var pages = json.total_pages;
    var count = json.total_items;
    // api returns 0 or 1 page 
    if (pages <= 1) {       
      var id_arr = [];
      // process property id and store in array 
      for (let i = 0; i < count; i++) {
        if(json._items[i].resource_type === 'Node'){
          var tmp = json._items[i].resource.href.substring(52);
          if(!id_arr.includes(tmp)){
            id_arr.push(tmp);
          }
        } else {
          var tmp = json._items[i].resource.base_node.href.substring(52);
          if(!id_arr.includes(tmp)){
            id_arr.push(tmp);
          }
        }
      }
      // result object 
      var jsonObj = [];
      var id_count = id_arr.length;
      for (let i = 0; i < id_count; i++) {
        item = {};
        item['id'] = id_arr[i];
        item['name'] = query;
        jsonObj.push(item);
      }
    // api returns multiple pages 
    } else {
      let res = await fetch(`${search_url}?q=${query}&per_page=${count}`, options);
      var json = await res.json();
      if(res.ok){
        var id_arr = [];
        // process property id and store in array 
        for (let i = 0; i < count; i++) {
          if(json._items[i].resource_type === 'Node'){
            var tmp = json._items[i].resource.href.substring(52);
            if(!id_arr.includes(tmp)){
              id_arr.push(tmp);
            }
          } else {
            var tmp = json._items[i].resource.base_node.href.substring(52);
            if(!id_arr.includes(tmp)){
              id_arr.push(tmp);
            }
          }
        }
        // result object 
        var jsonObj = [];
        var id_count = id_arr.length;
        for (let i = 0; i < id_count; i++) {
          item = {};
          item['id'] = id_arr[i];
          item['name'] = query;
          jsonObj.push(item);
        }
      } else {
        global.fetch_error = true;
        return null;
      }
    }
  } else {
    global.fetch_error = true;
    return null;
  }
  global.node_list = jsonObj;
  return jsonObj;
}