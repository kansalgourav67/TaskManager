
  function checkboxClicked(){
    var ck = document.getElementById("cb");
    var l = document.getElementById("status")
    if (ck.checked == true){
      l.innerHTML = "completed";
    } else {
      l.innerHTML = "incomplete";
    }
  }
  
$(document).ready(function(){
  var queryString = decodeURIComponent(window.location.search);
  queryString = queryString.substring(1);
  var queries = queryString.split("&");
  if(isNaN(Number(queries[0])) == false){
  
    var id = queries[0];
    var description = queries[2]
    var tit = queries[1];
    var dd = queries[3];
    init(id,description,tit,dd);
  }else{
      alert("Updated Successfully!!!")
      window.location.href = '/index.html';
  }
    
})

function init(id, description, tit, dd){
  document.getElementById("title1").value = tit;
  document.getElementById("due_date").value = dd;
  document.getElementById("tid").value = id;
  document.getElementById("description").value = description;
}

async function updateTodo(due_date) {
  
    if (document.getElementById("low").checked) {
          priority = document.getElementById("low").value;
        }else if (document.getElementById("medium").checked) {
          priority = document.getElementById("medium").value;
        }else{ if (document.getElementById("high").checked) {
          priority = document.getElementById("high").value;
        }
        } 
        var title = document.getElementById("title1").value;
        var description = document.getElementById("description").value;
        var id = document.getElementById("tid").value;
        var isChecked = document.getElementById("cb").checked;

        const resp = await fetch('/todos/Update/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `id=${id}&name=${title}&status=${isChecked}&due_date=${due_date}&description=${description}&priority=${priority}`
      })
      
    }