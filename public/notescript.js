
$(document).ready(function(){
    var queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    var queries = queryString.split("&");
    
    if(queries[0] == ''){
        alert("created successfully");
        window.location.href = '/index.html';
    }
    if(isNaN(Number(queries[0])) == false){
      var id = queries[0];
      var tit = queries[1];
       document.getElementById("hdn").value = id;
      getNotesById(id);
    }
  })

  function appendData(data){
    for(var i=0;i<data.length;i++){ 
      var node = document.createElement("LI");                  
      var textnode = document.createTextNode(data[i].Note);         
      node.appendChild(textnode);    
      node.className = "list-group-item d-flex justify-content-between align-items-center";                           
      document.getElementById("mylist").appendChild(node);  
    }
}

  async function getNotesById(id) {

    var url = '/todos/Notes/' + id;
    const resp = await fetch(url, { method: 'GET'})
    const todos = await resp.json()
    appendData(todos)
    return todos
  }

  async function AddNote() {
  
    var id = document.getElementById("hdn").value;
    var note = document.getElementById("inlineFormInputName2").value;
      const resp = await fetch('/todos/Notes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `id=${id}&notes=${note}`
      })
      
      getNotesById(id)
    }
  