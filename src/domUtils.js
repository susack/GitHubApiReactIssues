   
import {appendBugDetail, getGHIssueList} from './commonUtils.js'
// pure dom specific functions
// for this mod when the document is loaded completely, all dom images/assets realized 
// ** attach the keyup event for auto complete filter function 
// ** attach a on tab event to trigger all filtered items to be rendered in their detail  

    $( window ).on( "load", function() {
        console.log( "document loaded" ); 

        // autocomplete filter function based on bootstrap4 and input field    
        $("#listbox").on("keyup", function() {
            var values = $(this).val().toLowerCase();
            $("#listItem li").filter( function() { // auto complete filter
                $(this).toggle($(this).text().toLowerCase().indexOf(values) > -1)
            });
        });
        // user has tabbed out of the auto comp input box, for all filtered items generate
        // the associated bug detail and attach to dom
         $("#listbox").keydown(function(e) {
            if (e.which == 9) { // tab
                $('#attachPoint .bugEntry').remove();
 
                 $("#listItem li").each(function(item) {
                    appendBugDetail($(this));           
                 });
            }        
        });

    }); //$( window ).on( "load", function() 