function appendData(data) {
  for (var i = 0; i < data.length; i++) {
    var table = document.getElementById("mytable")
    var row = table.insertRow(i+1)
    row.setAttribute("id", "myTr");
  
    var t = row.insertCell(0)
    var desc = row.insertCell(1)
    var dd = row.insertCell(2)
    var s = row.insertCell(3)
    var p = row.insertCell(4)
    var note = row.insertCell(5)
    var u = row.insertCell(6)
    
    t.innerText = data[i].name
    desc.innerText = data[i].description
    dd.innerText = data[i].due_date
    if(data[i].status) data[i].status = "completed"
    else data[i].status = "incomplete"
    s.innerText = data[i].status
    p.innerText = data[i].priority
    
    var a = document.createElement("a")
    var up =document.createTextNode("Update");
    a.appendChild(up);
    var querystr = "?" + data[i].id + "&" + data[i].name + "&" + data[i].description +"&"+data[i].due_date;
    a.title = "Update task";  
    a.href = "./update.html" + querystr;
    u.appendChild(a)    

    var an = document.createElement("a")
    var n = document.createTextNode("Notes");
    an.appendChild(n);
    var querystr2 = "?" + data[i].id + "&" + data[i].name;
    an.title = "See Notes";  
    an.href = "./notes.html" + querystr2;
    note.appendChild(an)    
    }
}



$(document).ready(function(){
  
  getAllTodos();

});

async function addNewTodo(description, due_date) {
  
  if (document.getElementById("low").checked) {
        priority = document.getElementById("low").value;
      }else if (document.getElementById("medium").checked) {
        priority = document.getElementById("medium").value;
      }else{ if (document.getElementById("high").checked) {
        priority = document.getElementById("high").value;
      }
      } 
      var title = document.getElementById("title1").value;
    console.log(title)
    const resp = await fetch('/todos/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `name=${title}&status=false&due_date=${due_date}&description=${description}&priority=${priority}`
    })
    getAllTodos();
  }

  async function getAllTodos() {

    const resp = await fetch('/todos', { method: 'GET'})
    const todos = await resp.json()
    appendData(todos)
    return todos
  }
  
  

  function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("mytable");
    switching = true;
    
    dir = "asc"; 
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        if(n == 3){
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }else{
          if (dir == "asc") {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              break;
            }
          } else if (dir == "desc") {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              break;
            }
          }
        }
        
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount ++; 
      } else {
        if (switchcount == 0 && dir == "asc" && n != 3) {
          dir = "desc";
          switching = true;
        }
      }
    }
  }


  function sortPriority(n) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("mytable");
    switching = true;
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];

        
        if(x.innerHTML == "low" && y.innerHTML == "medium" || x.innerHTML == "medium" && y.innerHTML=="high"
            || x.innerHTML == "low" && y.innerHTML == "high") {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }