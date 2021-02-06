function loadXMLDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     
      //console.log(JSON.parse(this.responseText));
      var resp = JSON.parse(this.responseText);
      var firebaseConfig = {
        apiKey: resp.apiKey,
        authDomain : resp.authDomain,
        projectId : resp.projectId,
        storageBucket : resp.storageBucket,
        messagingSenderId : resp.messagingSenderId,
        appId : resp.appId,
        measurementId : resp.measurementId,
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
          
    var file_url;
    var database = firebase.database();
    var contact_details = database.ref().child("Client-Contact-Info");
    const storage = firebase.storage();

    contact_details.on("child_added", function(snapshot, prevChildKey) {
        var newPost = snapshot.val();
        var name = newPost.Name;
        var eid = newPost.Email;
        var message = newPost.Message;
        var phone = newPost.Phone;
        var fname = newPost.Filename; 
        var time = newPost.Time;
        //console.log(fname);
        if (fname == ''){
          var table = document.getElementById("myTable");
          var row = table.insertRow();
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          var cell5 = row.insertCell(4);
          var cell6 = row.insertCell(5);
          cell1.innerHTML = name;
          cell2.innerHTML = eid;
          cell3.innerHTML = phone;
          cell4.innerHTML = message;
          cell5.innerHTML = "No file uploaded";
          cell6.innerHTML = time;
        }
        else{
        storage.ref(fname).getDownloadURL()
        .then((url) => {
          file_url = url;
      
        
        var table = document.getElementById("myTable");
        var row = table.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        cell1.innerHTML = name;
        cell2.innerHTML = eid;
        cell3.innerHTML = phone;
        cell4.innerHTML = message;
        cell5.innerHTML = '<a href="'+file_url+'">'+file_url+'</a>';
        cell6.innerHTML = time;
      });
    }
        /*var ul = document.getElementById("dynamic-list");
        var li = document.createElement("li");
        li.setAttribute('id', el);
        li.appendChild(document.createTextNode(el));
        ul.appendChild(li);*/
      });

    function clear(){    
        //alert("On clearing the database, the contact details will be deleted forever");
        ref.child("/Client-Contact-Info").remove();
    }



    }
  };
  xhttp.open("GET", `/.netlify/functions/get-key`, true);
  xhttp.send();
}

loadXMLDoc();






