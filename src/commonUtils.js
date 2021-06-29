// common functions that will be used by across more than one mod

// issues is an array of objects used to hold all issue information which includes
// title, labels, body, status, creator, etc
const initializeIssueObj = () => {
    var issues =[];
    return { 
        getIssues: function() {
            return issues;
        },
        setIssues: function(iss) {
            issues = iss;
        }
    };
}
let initFunc = initializeIssueObj();
function getGHIssueList() {
    return initFunc.getIssues();
}
function setGHIssueList(iss) {
    return initFunc.setIssues(iss);
}

// common function - append the bug detail to the dom, based on
// 1. tab out of input box will generate all bug detail for the items in the filtered list
// 2. user mouse clicks or uses enter key on any of the items in the filtered list
const appendBugDetail = (liItem) => {    
    var issues = getGHIssueList();
    var di = $(liItem).attr('dataIdx');
    var disp = $(liItem).css('display');
    if (di && disp != 'none') {

        //console.log("found index of -> " + di + " issues length is -> " + issues.length);
        var labelStr="";
        issues[di].labels.forEach((item) => labelStr += ' ' + item.name);
        var htmlRow = '' +
                    '<div class="bugEntry">' +
                    '<h4 class="d-flex alert alert-warning">' +
                             issues[di].title + '</h4>' +
                        '<div class="d-flex justify-content-start">' +                             
                        '<div class="col-md-2 display-5"><b>State</b>: ' +
                            issues[di].state + '</div>' +
                        '<div class="col-md-4 display-5"><b>Created</b>: ' +
                                issues[di].created_at + '</div>' +
                    '</div>' +
                    '<div class="d-flex justify-content-start">' +                             
                        '<div class="col-md-2"><div><b>Labels:</b></div>' +
                            labelStr + '</div>' +
                        '<div class="col-md-10">' +
                                issues[di].body + '</div>' +
                    '</div>' +
                    '</div>';

                    $('#attachPoint').append(htmlRow);
    }
}

export {getGHIssueList,setGHIssueList,appendBugDetail}