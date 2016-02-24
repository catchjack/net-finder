
let GET_FILE_ALL_URL = "http://localhost:3000/all";

export getFileList(callback) => {
  fetch(GET_FILE_ALL_URL).then(function(res) {
    if(res.ok) {
      res.json().then(function(data) {
        console.log(data.entries);
        callback(null, data.entries);
      });
    }
  }, function(e) {
    console.log("Fetch failed!", e);
  })
}
