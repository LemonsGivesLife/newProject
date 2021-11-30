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
    globalGet.Status = e.value;
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

    opt1.value = "New";
    opt1.id = "New"
    opt1.text = "New";

    opt2.value = "Working";
    opt2.id = "Working";
    opt2.text = "Working";
    
    opt3.value = "Sent";
    opt3.id = "Sent";
    opt3.text = "Sent";

    opt4.value = "Closed";
    opt4.id = "Closed";
    opt4.text = "Closed";

    sel.add(opt1);
    sel.add(opt2);
    sel.add(opt3);
    sel.add(opt4);

    return sel;
}

const tableDiv = document.querySelector("div.sales");

let tableHeaders = ["Sales Order Number","Account", "Opportunity Name", "Status"];

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
    salesTableBodyRow.setAttribute("class","salesTableRow");
    salesTableBodyRow.className = 'salesTableBodyRow';

    //Create relevant column cells that will be appended to the current table row

    //Account Name
    let accountName = document.createElement('td');
    accountName.setAttribute("class","col-2");
    accountName.innerText = singleRecord.AccountName[0];

    //Sales Order Number
    let salesOrderNo = document.createElement('td');
    salesOrderNo.setAttribute("class","col-1");
    salesOrderNo.innerText = singleRecord.SalesOrderNumber[0];

    //Opportunity Name
    let opptyName = document.createElement('td');
    opptyName.setAttribute("class","col-3");
    opptyName.innerText = singleRecord.OpportunityName[0];

    //Current Status
    let currentStage = document.createElement('td');
    currentStage.setAttribute("class","col-4");
    //currentStage.innerHTML = '<select name="stages" id="stages></select>';

    let selectStage = document.createElement('select');
    selectStage.setAttribute("id","stagesSelect");
    let storeSelectStage = addOptions(selectStage);
    currentStage.append(storeSelectStage);

    salesTable.append(salesTableBody);
    salesTableBody.append(salesTableBodyRow);
    salesTableBodyRow.append(salesOrderNo, accountName, opptyName, currentStage);
    //salesTableBodyRow.append(opptyNo, closeDate, accountName, currentStage);
    //salesTableBody.append(salesDiv);
    //salesTable.append(salesTableBodyRow);
    appendAll(singleRecord);
}

function appendAll(payload) {
    document.getElementById("stagesSelect").value = payload.Status;
}

/*
var slideSource = document.getElementById('salesTableBodyRow');

document.getElementById('saveButton').onclick = function () {
  slideSource.classList.toggle('fade');
}*/