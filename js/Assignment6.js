document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log(navigator.camera);
}
function sectionSelect(){
   var selectBox = document.getElementById("menu_select");
   var selectedValue = selectBox.options[selectBox.selectedIndex].value;
   switch(selectedValue){
   case "section1":
      document.getElementById("section1").style.display= "inline-block";
      document.getElementById("section2").style.display = "none";
      document.getElementById("section3").style.display = "none";
      document.getElementById("section4").style.display = "none";
      document.getElementById("section5").style.display = "none";
      document.getElementById("section6").style.display = "none";
      document.getElementById("section7").style.display = "none";
      document.getElementById("section8").style.display = "none";
      customerListRetrive();
      break;
   case "section2":
      document.getElementById("section1").style.display = "none";
      document.getElementById("section2").style.display = "inline-block";
      document.getElementById("section3").style.display = "none";
      document.getElementById("section4").style.display = "none";
      document.getElementById("section5").style.display = "none";
      document.getElementById("section6").style.display = "none";
      document.getElementById("section7").style.display = "none";
      document.getElementById("section8").style.display = "none";
      break;
   case "section3":
      document.getElementById("section1").style.display = "none";
      document.getElementById("section2").style.display = "none";
      document.getElementById("section3").style.display = "inline-block";
      document.getElementById("section4").style.display = "none";
      document.getElementById("section5").style.display = "none";
      document.getElementById("section6").style.display = "none";
      document.getElementById("section7").style.display = "none";
      document.getElementById("section8").style.display = "none";
      break;
   case "section4":
      document.getElementById("section1").style.display = "none";
      document.getElementById("section2").style.display = "none";
      document.getElementById("section3").style.display = "none";
      document.getElementById("section4").style.display = "inline-block";
      document.getElementById("section5").style.display = "none";
      document.getElementById("section6").style.display = "none";
      document.getElementById("section7").style.display = "none";
      document.getElementById("section8").style.display = "none";
      break;
   case "section5":
      document.getElementById("section1").style.display = "none";
      document.getElementById("section2").style.display = "none";
      document.getElementById("section3").style.display = "none";
      document.getElementById("section4").style.display = "none";
      document.getElementById("section5").style.display = "inline-block";
      document.getElementById("section6").style.display = "none";
      document.getElementById("section7").style.display = "none";
      document.getElementById("section8").style.display = "none";
      break;
   case "section6":
      document.getElementById("section1").style.display = "none";
      document.getElementById("section2").style.display = "none";
      document.getElementById("section3").style.display = "none";
      document.getElementById("section4").style.display = "none";
      document.getElementById("section5").style.display = "none";
      document.getElementById("section6").style.display = "inline-block";
      document.getElementById("section7").style.display = "none";
      document.getElementById("section8").style.display = "none";
      break;
   case "section7":
      document.getElementById("section1").style.display = "none";
      document.getElementById("section2").style.display = "none";
      document.getElementById("section3").style.display = "none";
      document.getElementById("section4").style.display = "none";
      document.getElementById("section5").style.display = "none";
      document.getElementById("section6").style.display = "none";
      document.getElementById("section7").style.display = "inline-block";
      document.getElementById("section8").style.display = "none";
      break;
   case "section8":
      document.getElementById("section1").style.display = "none";
      document.getElementById("section2").style.display = "none";
      document.getElementById("section3").style.display = "none";
      document.getElementById("section4").style.display = "none";
      document.getElementById("section5").style.display = "none";
      document.getElementById("section6").style.display = "none";
      document.getElementById("section7").style.display = "none";
      document.getElementById("section8").style.display = "inline-block";
      break;
   default:
      return;
   }
}
function customerListRetrive() {
   var objRequest = new XMLHttpRequest();
   var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getAllCustomers"
   var to_print;

   objRequest.onreadystatechange = function(){
      if(objRequest.readyState == 4 && objRequest.status == 200){

         var result = JSON.parse(objRequest.responseText);

         to_print = "<h1>Result</h1><br/>\n<table>\n<tr><th>Customer ID</th><th>Company Name</th><th>City</th><th></th><th></th></tr>\n"
         for (var i = 0; i < result.GetAllCustomersResult.length; i++) {
            to_print += "<tr><td>"+result.GetAllCustomersResult[i].CustomerID+"</td><td>"+result.GetAllCustomersResult[i].CompanyName+"</td><td>"+result.GetAllCustomersResult[i].City+"</td><td><button onclick=\"orderList('"+result.GetAllCustomersResult[i].CustomerID+"')\">Orders</button></td><td><button onclick=\"customerRemove('"+result.GetAllCustomersResult[i].CustomerID+"')\">Remove</button></td></tr>\n"
         }
         to_print += "</table>";
         document.getElementById("error").innerHTML = to_print;
      }
   }
    objRequest.open("GET", url, true);
    objRequest.send();
}
function orderList(cust_id) {
   var objRequest = new XMLHttpRequest();
   var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getOrdersForCustomer/"
   if(cust_id == null){
      url +=  document.getElementById("customer_id").value;
   }
   else{
      url += cust_id;
      backButton(2);
   }
   
   var to_print;

   objRequest.onreadystatechange = function(){
      if(objRequest.readyState == 4 && objRequest.status == 200){

         var result = JSON.parse(objRequest.responseText);

         to_print = "<h1>Result</h1><br/>\n<table>\n<tr><th>Order ID</th><th>Ship Address</th><th>City</th><th>Name</th><th>Postal Code</th><th></th></tr>\n"
         for (var i = 0; i < result.GetOrdersForCustomerResult.length; i++) {
            to_print += "<tr><td>"+result.GetOrdersForCustomerResult[i].OrderID+"</td><td>"+result.GetOrdersForCustomerResult[i].ShipAddress+"</td><td>"+result.GetOrdersForCustomerResult[i].ShipCity+"</td><td>"+result.GetOrdersForCustomerResult[i].ShipName+"</td><td>"+result.GetOrdersForCustomerResult[i].ShipPostcode+"</td><td><button onclick=\"orderRetrive('"+result.GetOrdersForCustomerResult[i].OrderID+"')\">Edit</button></td></tr>\n"
         }
         to_print += "</table>";
         document.getElementById("error1").innerHTML = to_print;
      }
      else{
         document.getElementById("error1").innerHTML = "there has been an issue, please check the spelling of the input";
      }
   }
    objRequest.open("GET", url, true);
    objRequest.send();
}
function orderRetrive(order_id){
   var objRequest = new XMLHttpRequest();
   var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderInfo/"
   url += order_id;
   objRequest.onreadystatechange = function(){
      if(objRequest.readyState == 4 && objRequest.status == 200){

         var result = JSON.parse(objRequest.responseText);
         document.getElementById("order_id1").value=order_id;
         document.getElementById("order_address").value=result[0].ShipAddress;
         document.getElementById("order_city").value=result[0].ShipCity;
         document.getElementById("order_name").value=result[0].ShipName;
         document.getElementById("order_postal").value=result[0].ShipPostcode;
         document.getElementById("error2").innerHTML = "";
      }
      else{
         document.getElementById("error2").innerHTML = "there has been an issue, please check the spelling of the input";
      }
   }
   objRequest.open("GET", url, true);
   objRequest.send();
   backButton(3);
}
function orderEdit(){
   var objRequest = new XMLHttpRequest();
   var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/UpdateOrderAddress"
   var order;
   var order_to_edit = document.getElementById("order_id1").value;
   order= '{"OrderID":"'+ order_to_edit + '","ShipAddress":"' + document.getElementById("order_address").value +'","ShipCity":"'+ document.getElementById("order_city").value + '","ShipName":"' + document.getElementById("order_name").value + '","ShipPostcode":"' + document.getElementById("order_postal").value +'"}';
   objRequest.onreadystatechange = function(){
      if(objRequest.readyState == 4 && objRequest.status == 200){

         var result = JSON.parse(objRequest.responseText);
         if(result == 1){
            document.getElementById("error2").innerHTML = "Order "+order_to_edit+" Edited, you will be retured to the customer list shortly";
            setTimeout(function(){
               
               backButton(1);
            }, 2000);
         }
         else{
            document.getElementById("error2").innerHTML = "Order Edit was Unsuccessful";
         }
      }
   }

    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(order);

}
function backButton(index) {
   var sel = document.getElementById('menu_select');
   sel.selectedIndex = index;
   sectionSelect();
}
function customerAdd(){
   var objRequest = new XMLHttpRequest();
   var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/CreateCustomer"
   var customer;
   var customer_to_add = document.getElementById("customer_id1").value;
   customer = '{"CustomerID":"'+ customer_to_add + '","CompanyName":"' + document.getElementById("customer_name").value +'","City":"'+ document.getElementById("customer_city").value +'"}';
   objRequest.onreadystatechange = function(){
      if(objRequest.readyState == 4 && objRequest.status == 200){

         var result = JSON.parse(objRequest.responseText);
         if(result.WasSuccessful == 1){
            document.getElementById("error3").innerHTML = "New customer added";
            setTimeout(function(){
               
               backButton(1);
            }, 2000);
         }
         else{
            document.getElementById("error3").innerHTML = "Customer add was unsuccessful";
         }
      }
   }

    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(customer);

}
function customerRemove(customer_id){
   var r = confirm("Remove this customer?");
   if (r == true) {
   var objRequest = new XMLHttpRequest();
   var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/DeleteCustomer/"
   url += customer_id;
   objRequest.onreadystatechange = function(){
      if(objRequest.readyState == 4 && objRequest.status == 200){
      var result = JSON.parse(objRequest.responseText);
      if(result.DeleteCustomerResult.WasSuccessful)
         alert("Customer Removed Succesfully");
         backButton(1); 
      }
   }
   objRequest.open("GET", url, true);
   objRequest.send();
   }
}
function geolocate(){
   var geo = navigator.geolocation;

   if(geo){
      geo.getCurrentPosition(showPosition); 
   }
   else{
      alert("Geolocation is not supported");
   }
}
function showPosition(position){
   var latitude = position.coords.latitude;
   var longitude = position.coords.longitude;
   document.getElementById("latitude").innerHTML = latitude;
   document.getElementById("longitude").innerHTML = longitude;
   var uluru = {lat: latitude, lng: longitude};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
}
function takePhoto(){
   navigator.camera.getPicture(onSuccess, onFail, { quality: 20, destinationtype:destinationtype.FILE_URI, saveToPhotoAlbum: true });
}
function onSuccess(imageURI){
   var picdisplay = document.getElementById("photo_display");
   pickdisplay.style.display = 'block';
   pickdisplay.src = imageURI;
}
function onFail(message){
   alert("Failed because: " + message);
}
function contactLookup(){
   navigator.contacts.pickContact(function(contact){
      var contact_info="";
      var contact_email="";
      contact_info += contact.name.givenName + " " + contact.name.familyName;
      document.getElementById("contact_name").innerHTML = contact_info;
      if(contact.emails !== null){
         for(count=0; count < contact.emails.length; count++){
            contact_email += contact.emails[count].type + ": " + contact.emails[count].value + "<br>";
         }
         document.getElementById("contact_email").innerHTML = contact_email;
      }
   },function(err){
      alert("Error: " + err);
   });
}
