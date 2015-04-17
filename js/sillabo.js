$(document).ready(function() {//1


// EVENT LISTENERS

//Read data

document.getElementById("about").addEventListener("click", gAbout);
document.getElementById("play").addEventListener("click", rData);
document.getElementById("pause").addEventListener("click", rPause);
document.getElementById("reloadpage").addEventListener("click", rPage);



  // File upload. Two different listeners and two funtions are required to activate the input type="file"  from a standard button
  document.getElementById('FileUpload').addEventListener('click', trigger, false); 
  document.getElementById('txtFileUpload').addEventListener('change', upload, false);   

  function trigger(){c = document.getElementById('txtFileUpload'); c.click()};


    // Method that checks that the browser supports the HTML5 File API
    function browserSupportFileUpload() {//2
        var isCompatible = false;
        if (window.File && window.FileReader && window.FileList && window.Blob) {//3
        isCompatible = true;
        }//3
        return isCompatible;
    }//2
var data = null;
    
    // Method that reads and processes the selected file
    function upload(evt) {//4
    if (!browserSupportFileUpload()) {//5
        alert('The File APIs are not fully supported in this browser!');
        }//5 
        else {//6
            var data = null;
            // identify the first file 
            var file = evt.target.files[0]
            // create a new reader object to read file
            var reader = new FileReader();
                    var fileName = file.name;
                        if (fileName.indexOf("txt") == -1) {
                        txtalert = '<div class="row"><div class="col-lg-12"><div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-info-circle"></i>  Estensione del file non valida!</div></div></div>';
                        //$('#loadinfo').after(txtalert);
                        // Invece di after, usando .empty().append()
                        $('#loadinfo').empty().append(txtalert);
                        return;
                        }
                        else { txtalert = '<div class="row"><div class="col-lg-12"><div class="alert alert-info alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-info-circle"></i> File caricato: ' + fileName + '  </div></div></div>';
                        //$('#loadinfo').after(txtalert);
                         $('#loadinfo').empty().append(txtalert);
                      }

            console.log(fileName.indexOf("txt"));
            // the reader object reads the file
            reader.readAsText(file);
            // loading the reader a funtion is created to process data
            reader.onload = function(event) {//7
              
               // Read input data
                var data = event.target.result;
                // data = $.csv.toArrays(csvData);
                if (data && data.length > 0) {//8
                    // console log
                  console.log('Imported -' + data.length + ' characters !');

                  //call the function prepare and then visualize it into the document 
               			prepData(data);

                }//8
                 else {//9
                    alert('No data to import!');
                }//9

               //console.log(data);
            };//7
            reader.onerror = function() {//10
                alert('Unable to read ' + file.fileName);
            };//10

    }//6

    }//4

//Data preparation
// !!! the text inserted cannot have withe space a the end of line
// !!!! For some reason I cannot repalce the last character
    function prepData(data){
        console.log(data);
       // last = data.length -1;
       // console.log(last);
      //  var pdata = data.replace(data.charAt(last), "</p>");

        pdata = data + "</span></p>";
         //console.log(pdata);
        pdata = pdata.replace(/(\n)+/g, "</p><p> ");
         //console.log(pdata);
        pdata = pdata.replace(/(\s)+/g, "</span> <span class='invisible'>");
         //console.log(pdata);
        pdata = pdata.replace(/\-/g, "</span><span class='invisible'>");
         //console.log(pdata);
        pdata = pdata.replace(pdata.charAt(0), "<p><span class='invisible'>" + pdata.charAt(0));
        // console.log(pdata);


        printData(pdata);
    } 

// Print data on the page
    function printData(data){
    // to read data as text 
    //var t = document.createTextNode(data);
    //document.getElementById("loadtxt").appendChild(t);
    document.getElementById("loadtxt").innerHTML = data;
}

    function rPause(){
      // Alert is one of the few methos to stop the JAVASCRIPT Execution, another is hrowing an exception that is not going to be "caught" anywhere except in your application's "root" scope
        alert("UN ATTIMO DI PAUSA!");
          //  txtalert = '<div class="row"><div class="col-lg-12"><div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-info-circle"></i>  EUN ATTIMO DI PAUSA!</div></div></div>';
          //            $('#loadinfo').after(txtalert);
    }


    function rData(){

// set interval
var x = document.getElementById('interval').selectedIndex;
var interval = document.getElementsByTagName("option")[x].value;
interval = interval * 1000;
console.log(interval);

// !!! USING DOM it is not possible to filter the elements like this, 
// var tags = document.getElementsByTagName('span');
    //for (var i = 0; i < tags.length; i++) { 
    //var att = tags[i].getAttribute("class"); 
    //if ( att == "invisible" ) { 
        // COUNT FUNCTION HERE
    //}

// JQUERY 
// slect all the span elements with class invisible 
var temp = $("span[class^='invisible']");
//temp[0].setAttribute("class", "show");
//console.log(temp.length);


var i = 0;                     //  set your counter to 1

function myLoop () {           //  create a loop function
   setTimeout(function () {    //  call a 3s setTimeout when the loop is called
      temp[i].setAttribute("class", "readtext");         //  your code here
      i++;                     //  increment the counter
      if (i < temp.length) {            //  if the counter < 10, call the loop function
         myLoop();             //  ..  again which will trigger another 
      }                        //  ..  setTimeout()
   }, interval)
}

myLoop();                      //  start the loop



    }

    function rPage() { location.reload(); }

   function gAbout(){

     var abouttext = "<h1 id='sillabo'>SILLABO</h1><p>SILLABO è un software per visualizzare in modo progressivo un testo: una parola o una sillaba alla volta.Sillabo è stato progettato per l'allenamento alla lettura di soggetti che manifestano forme di <a href='http://it.wikipedia.org/wiki/Disturbi_specifici_di_apprendimento'>DSA</a>.</p><p>SILLABO è in grado di <em>leggere</em> testi in semplice <a href='http://it.wikipedia.org/wiki/File_di_testo'>formato testo</a>, con codifica <a href='http://it.wikipedia.org/wiki/UTF-8'>UTF-8</a>. Questi testi sono generalmente salvati con estensione <em>.txt</em> e possono essere generati dai più comuni editor di testo.<br /></p><p>SILLABO può lavorare in due diverse modalità:</p><ul><li><strong> <em>lettura</em> per parole</strong>: in questo caso è sufficiente caricare un file di testo codificato in <a href='http://it.wikipedia.org/wiki/UTF-8'>UTF-8</a>.</li><li><strong> <em>lettura</em> per sillabe</strong>: in questo caso è necessario prima sillabare il testo, attraverso altro software, ad esempio <a href='http://www.sillabare.it/divisione-in-sillabe/divisione-in-sillabe.php'>sillabare</a>, accertandosi di eliminare le spaziature in eccesso e di codificare in <a href='http://it.wikipedia.org/wiki/UTF-8'>UTF-8</a>.</li></ul><p>Una volta caricato il testo <em>avviare la lettura</em> per visualizzare progressivamente le parole o le sillabe.</p><p>SILLABO consente di impostare il <em>tempo di lettura</em> delle parole e delle sillabe selezionando il tempo desiderato (espresso in secondi) prima di caricare il file di testo prescelto. Se nessuna selezione viene svolta, il <em>tempo di lettura</em> predefinito è di 1 secondo.</p><p>SILLABO è fornito con licenza <a href='http://it.wikipedia.org/wiki/GNU_General_Public_License'>GNU GPL</a></p><blockquote><p>This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published bythe Free Software Foundation, either version 3 of the License.</p><p>This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty ofMERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.</p><p>You can have a copy of the GNU General Public License at <a href='http://www.gnu.org/licenses/'>http://www.gnu.org/licenses/</a>.</p></blockquote>";
     $('#loadtxt').empty().append(abouttext);

    }



})//1













