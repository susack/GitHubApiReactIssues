
import {getGHIssueList,setGHIssueList,appendBugDetail} from './commonUtils.js';
// for this mod when the document is ready to loaded (no interpreted/rendered completely) do:
// ** load data from GH API and populate GH issue array of objects
// ** attach all titles/labels/body elements as <li></li>
// ** add on enter key event listener to these li's

 $( document ).ready(function() {
    // display only upto max list items in the UL list
    const MAX_DISPLAY_LI_ITEMS = 1000;

    var issues = getGHIssueList();
    // using Octokit plugin to allow access to the github API using JS
    // user gitHub token should normally be used but is commented out below so to avoid
    // complications in running/having user obtain his/her own token. OPtimally this 
    // would be done
    $('body').css('cursor', 'wait');
    import('https://cdn.skypack.dev/@octokit/core').then(({ default: octokit, Octokit}) => {
            async function getIssues() {
               //const wOctokit = new Octokit({ auth: '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' });
                const wOctokit = new Octokit();
                var pageIncr=1;
                var response = {};
                
                do {
                    try {
                        response = await wOctokit.request("GET /repos/facebook/react/issues?page=" + pageIncr + "&per_page=100", {
                          owner: "facebook",
                          repo: "react",
                        });
                    }
                    catch (error) {
                        console.log('An error was returned  calling react github API!')
                        console.log(error.message);
                        return;
                    }
                   
                    // capture all data returned from the multiple page calls. 
                    // max per_page is 100 so this while loop will continue until
                    // no response.data is found.
                    issues = [...issues, ...response.data]; 
                    pageIncr++;
                } while (response.data && response.data.length )

                 $('body').css('cursor', 'default');
                 setGHIssueList(issues);

                 function addLiItemsFromIssues() {
                      const container = $("#listItem");
                     // we do not want to overload the browser page so setting the limit
                     // via const MAX_DISPLAY_LI_ITEMS to 1000, could be higher but did 
                     // want introduce a paging mechansim to the code due to timeboxing
                     var max = issues.length;
                     if (issues.length > MAX_DISPLAY_LI_ITEMS) max=MAX_DISPLAY_LI_ITEMS;
                     for (var i=0; i<max; i++) {
                         // create/capture the issue [] index on each <li> so that bug
                         // detail can be extracted when user tabs, clicks or hits enter
                         // key
                         var newLI = '<li class="myLItem" dataidx=' + i + '><a  href="#"  + >' + issues[i].title + '</a></li>';        
                         // add all titles intially to the search input box              
                          $(container).append(newLI);
                     }  
                 }
                 addLiItemsFromIssues();
                 // add an li eventlistener up to all <li></li>'s on the dom
                 // to capture the enter key
                 function addLiEnterEventListeners() {
                     document.querySelectorAll('#listItem li').forEach((item) => {
                            item.addEventListener('click', (e) => {
                                if (e.which === 1) { // enter key
                                     $('#attachPoint .bugEntry').remove();
                                    appendBugDetail(e.currentTarget);
                                }
                            })
                     }); 
                }
                addLiEnterEventListeners();
            
            }

         getIssues().catch(console.error.bind(console));
    });
}); // end of $( document ).ready(function() {