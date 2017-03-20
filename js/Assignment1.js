function sectionSelect(){
   var selectBox = document.getElementById("menu_select");
   var selectedValue = selectBox.options[selectBox.selectedIndex].value;
   if(selectedValue == "section1"){
      document.getElementById("section1").style.display= "inline-block";
      document.getElementById("section2").style.display = "none";
      return;
   }
   else if(selectedValue == "section2"){
      document.getElementById("section1").style.display = "none";
      document.getElementById("section2").style.display = "inline-block";
      return;
   }
   else{
      return;
   }
}