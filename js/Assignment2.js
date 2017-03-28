function sectionSelect(){
   var selectBox = document.getElementById("menu_select");
   var selectedValue = selectBox.options[selectBox.selectedIndex].value;
   if(selectedValue == "section1"){
      document.getElementById("section1").style.display= "inline-block";
      document.getElementById("section2").style.display = "none";
      document.getElementById("section3").style.display = "none";
      customerListRetrive();
      return;
   }
   else if(selectedValue == "section2"){
      document.getElementById("section1").style.display = "none";
      document.getElementById("section2").style.display = "inline-block";
      document.getElementById("section3").style.display = "none";
      return;
   }
   else if(selectedValue == "section3"){
      document.getElementById("section1").style.display = "none";
      document.getElementById("section2").style.display = "none";
      document.getElementById("section3").style.display = "inline-block";
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

         to_print = "<h1>Result</h1><br/>\n<table>\n<tr><th>Customer ID</th><th>Company Name</th><th>City</th></tr>\n"
         for (var i = 0; i < result.GetAllCustomersResult.length; i++) {
            to_print += "<tr><td><a href=\"javascript:orderRetrive('"+result.GetAllCustomersResult[i].CustomerID+"');\">"+result.GetAllCustomersResult[i].CustomerID+"</a></td><td>"+result.GetAllCustomersResult[i].CompanyName+"</td><td>"+result.GetAllCustomersResult[i].City+"</td></tr>\n"
         }
         to_print += "</table>";
         document.getElementById("error").innerHTML = to_print;
      }
   }
    objRequest.open("GET", url, true);
    objRequest.send();
}
function orderRetrive(cust_id) {
   var objRequest = new XMLHttpRequest();
   var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/"
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

         to_print = "<h1>Result</h1><br/>\n<table>\n<tr><th>Product Name</th><th>Amount Ordered</th></tr>\n"
         for (var i = 0; i < result.length; i++) {
            to_print += "<tr><td>"+result[i].ProductName+"</td><td>"+result[i].Total+"</td></tr>\n"
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
function backButton(index) {
   var sel = document.getElementById('menu_select');
   sel.selectedIndex = index;
   sectionSelect();
}