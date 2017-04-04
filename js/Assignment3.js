function sectionSelect(){
   var selectBox = document.getElementById("menu_select");
   var selectedValue = selectBox.options[selectBox.selectedIndex].value;
   if(selectedValue == "section1"){
      document.getElementById("section1").style.display= "inline-block";
      document.getElementById("section2").style.display = "none";
      document.getElementById("section3").style.display = "none";
      document.getElementById("section4").style.display = "none";
      customerListRetrive();
      return;
   }
   else if(selectedValue == "section2"){
      document.getElementById("section1").style.display = "none";
      document.getElementById("section2").style.display = "inline-block";
      document.getElementById("section3").style.display = "none";
      document.getElementById("section4").style.display = "none";
      return;
   }
   else if(selectedValue == "section3"){
      document.getElementById("section1").style.display = "none";
      document.getElementById("section2").style.display = "none";
      document.getElementById("section3").style.display = "inline-block";
      document.getElementById("section4").style.display = "none";
      return;
   }
   else if(selectedValue == "section4"){
      document.getElementById("section1").style.display = "none";
      document.getElementById("section2").style.display = "none";
      document.getElementById("section3").style.display = "none";
      document.getElementById("section4").style.display = "inline-block";
      return;
   }
   else{
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

         to_print = "<h1>Result</h1><br/>\n<table>\n<tr><th>Customer ID</th><th>Company Name</th><th>City</th><th></th></tr>\n"
         for (var i = 0; i < result.GetAllCustomersResult.length; i++) {
            to_print += "<tr><td>"+result.GetAllCustomersResult[i].CustomerID+"</td><td>"+result.GetAllCustomersResult[i].CompanyName+"</td><td>"+result.GetAllCustomersResult[i].City+"</td><td><button onclick=\"orderList('"+result.GetAllCustomersResult[i].CustomerID+"')\">Orders</button></td></tr>\n"
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