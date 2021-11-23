const getOpptyRecord = 'https://salesordersystem-18112021.au-s1.cloudhub.io/getTestNine'
const postOpptyUpdate = 'https://salesordersystem-18112021.au-s1.cloudhub.io/postTestNine'

let globalGet;

function getData() {
    fetch(getOpptyRecord)
    .then(res => res.json())
    .then(scores => {
        globalGet = scores;
        appendRecord(scores);
        //appendAll(scores);
    })
}

function postData() {
    console.log(globalGet);
}

function updateSFRecord() {
    var e = document.getElementById('stagesSelect');
    globalGet.CurrentStage = e.value;
}

function postData2() {
    updateSFRecord();
    fetch(postOpptyUpdate, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(globalGet)
    })
    .then(function() {

    })
}

function addOptions(sel) {
    var opt1 = document.createElement("option");
    var opt2 = document.createElement("option");
    var opt3 = document.createElement("option");
    var opt4 = document.createElement("option");
    var opt5 = document.createElement("option");
    var opt6 = document.createElement("option");
    var opt7 = document.createElement("option");
    var opt8 = document.createElement("option");
    var opt9 = document.createElement("option");
    var opt10 = document.createElement("option");
    var opt11 = document.createElement("option");
    var opt12 = document.createElement("option");
    var opt13 = document.createElement("option");
    var opt14 = document.createElement("option");

    opt1.value = "Prospecting";
    opt1.id = "Prospecting"
    opt1.text = "Prospecting";

    opt2.value = "Qualification";
    opt2.id = "Qualification";
    opt2.text = "Qualification";
    
    opt3.value = "Needs Analysis";
    opt3.id = "Needs Analysis";
    opt3.text = "Needs Analysis";

    opt4.value = "Value Proposition";
    opt4.id = "Value Proposition";
    opt4.text = "Value Proposition";

    opt5.value = "Id. Decision Makers";
    opt5.id = "Id. Decision Makers";
    opt5.text = "Id. Decision Makers";

    opt6.value = "Perception Analysis";
    opt6.id = "Perception Analysis";
    opt6.text = "Perception Analysis";

    opt7.value = "Proposal/Price Quote";
    opt7.id = "Proposal/Price Quote";
    opt7.text = "Proposal/Price Quote";

    opt8.value = "Negotiation/Review";
    opt8.id = "Negotiation/Review";
    opt8.text = "Negotiation/Review";

    opt9.value = "Proactive";
    opt9.id = "Proactive";
    opt9.text = "Proactive";

    opt10.value = "50% Brief Proposal Pitch";
    opt10.id = "50% Brief Proposal Pitch";
    opt10.text = "50% Brief Proposal Pitch";

    opt11.value = "70% Client Feedback";
    opt11.id = "70% Client Feedback";
    opt11.text = "70% Client Feedback";

    opt12.value = "90% Negotiation & Opportunity";
    opt12.id = "90% Negotiation & Opportunity";
    opt12.text = "90% Negotiation & Opportunity";

    opt13.value = "Closed Won";
    opt13.id = "Closed Won";
    opt13.text = "Closed Won";

    opt14.value = "Closed Lost";
    opt14.id = "Closed Lost";
    opt14.text = "Closed Lost";

    sel.add(opt1);
    sel.add(opt2);
    sel.add(opt3);
    sel.add(opt4);
    sel.add(opt5);
    sel.add(opt6);
    sel.add(opt7);
    sel.add(opt8);
    sel.add(opt9);
    sel.add(opt10);
    sel.add(opt11);
    sel.add(opt12);
    sel.add(opt13);
    sel.add(opt14);

    return sel;
}

const tableDiv = document.querySelector("div.sales");

let tableHeaders = ["SF RecordId","OpportunityNo", "Close Date", "Account", "Current Stage"];

const createSalesTable = () => {
    //Creates the table automatically
    let salesTable = document.createElement('table'); 
    salesTable.className = 'salesTable';

    //Creates the table header group elements
    let salesTableHead = document.createElement('thead'); 
    salesTableHead.className = 'salesTableHead';

    //Creates the table header row elements
    let salesTableHeaderRow = document.createElement('tr');
    salesTableHeaderRow.className = 'salesTableHeaderRow';

    //Iterate over all strings in the tableHeaders array and append to the header cells to the table header row
    tableHeaders.forEach(header => {
        //Creates the current header cell during a specific iteration
        let salesHeader = document.createElement('th');
        salesHeader.innerText = header;
        //Appends current header cell to the header row
        salesTableHeaderRow.append(salesHeader);
    })

    //Appends the header row to the table header group element
    salesTableHead.append(salesTableHeaderRow);
    salesTable.append(salesTableHead);

    //Creates the table body group element
    let salesTableBody = document.createElement('tbody');
    salesTableBody.className = 'salesTableBody';
    //Appends the table body group element to the table
    salesTable.append(salesTableBody);

    //Appends the table body to the SalesTable div
    tableDiv.append(salesTable);
}

const appendRecord = (singleRecord) => {
    //Find the table that was created
    const salesTable = document.querySelector('.salesTable');
    const salesTableBody = document.querySelector('.salesTableBody')
    let salesDiv = document.createElement('div');

    //Create current table row
    let salesTableBodyRow = document.createElement('tr');
    salesTableBodyRow.className = 'salesTableBodyRow';

    //Create relevant column cells that will be appended to the current table row
    //SalesforceRecordId
    let sfRecordId = document.createElement('td');
    sfRecordId.innerText = singleRecord.RecordId;

    //OpportunityNumber
    let opptyNo = document.createElement('td');
    opptyNo.innerText = singleRecord.OpportunityNumber;

    //Close Date
    let closeDate = document.createElement('td');
    closeDate.innerText = singleRecord.CloseDate;

    //Account Name
    let accountName = document.createElement('td');
    accountName.innerText = singleRecord.AccountName;

    //Current Stage
    let currentStage = document.createElement('td');
    //currentStage.innerHTML = '<select name="stages" id="stages></select>';

    let selectStage = document.createElement('select');
    selectStage.setAttribute("id","stagesSelect");
    let storeSelectStage = addOptions(selectStage);
    currentStage.append(storeSelectStage);

    salesTable.append(salesTableBody);
    salesTableBody.append(salesTableBodyRow);
    salesTableBodyRow.append(sfRecordId, opptyNo, closeDate, accountName, currentStage);
    //salesTableBodyRow.append(opptyNo, closeDate, accountName, currentStage);
    //salesTableBody.append(salesDiv);
    //salesTable.append(salesTableBodyRow);
    appendAll(singleRecord);
}

function appendAll(payload) {
    document.getElementById("stagesSelect").value = payload.CurrentStage;
}