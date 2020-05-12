$(document).ready(()=>{
    utilityAddRecordToDisplay()
})

function utilityAddRecordToDisplay()
{
    let logs=localStorage.getItem('addLog')
    if (logs == null) {
    
    }
    else {
        logsObj = JSON.parse(logs);
        for(let obj of logsObj)
        {
            let itemName = obj['name']
            let supplierName = obj['supplier']
            let category = obj['category']

            let item = new Item(itemName,supplierName,category)
            let display=new Display()
            display.add(item)
        }
       
    }    
}

// Funtion to delete node

function deleteLog(name)
{
    let logs=localStorage.getItem('addLog')
    console.log(logs);
    if (logs == null) {
        console('Some error has occured. Local Storage data is corrupted.')
    }
    else {
        let index=0;
        logsObj = JSON.parse(logs);
        console.log(logs,logsObj);
        for(let obj of logsObj)
        {
            let itemName = obj['name']
            if(name==itemName)
            {

            }
            else
            {
                index++;
            }
        }
        console.log(index);
        logsObj.splice(index,1)
        localStorage.setItem('addLog',JSON.stringify(logsObj))
        tableBody=document.getElementById('tableBody')
        tableBody.innerHTML=''
        utilityAddRecordToDisplay()
    }      
}


// Item Constructor
function Item(name,supplier,category)
{
    this.name=name
    this.supplier=supplier
    this.category=category
}

//Display Constructor
function Display()
{
    
}

//Add methods to Display Prototype
Display.prototype.validate=function(item){
    if(item.name.length<2 || item.supplier.length<2)
    {
        return false
    }
    else
    {
        return true
    }
}

Display.prototype.add=function(item){
    tableBody=document.getElementById('tableBody')
    htmlString=`
                <tr class="rowData" "id="${item.name}">
                    <td class="itemName">${item.name}</td>
                    <td>${item.supplier}</td>
                    <td>${item.category}</td>
                    <td><button id=${item.name} style="transform:scale(0.8)" onclick="deleteLog('${item.name}')" class="btn btn-primary">Delete Record</button></td>
                </tr>
    `
    tableBody.innerHTML+=htmlString
}

Display.prototype.clear=function(){
    itemForm=document.getElementById('idForm')
    itemForm.reset()
}

Display.prototype.show=function(status,message){
    msg=document.getElementById('msg')
    msg.innerHTML=`
                    <div class="alert alert-${status} alert-dismissible fade show" role="alert">
                        <strong>${status}!</strong> ${message}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
    `
    setTimeout(function(){
        msg.innerHTML=''
    },2000)

}

//Event listener for itemForm
let itemForm=document.getElementById('idForm')
itemForm.addEventListener('submit',itemFormSubmit)

function itemFormSubmit(e)
{

    let itemName=document.getElementById('itemName').value
    let supplierName=document.getElementById('supplierName').value
    let category

    let electronics=document.getElementById('electronics')
    let furniture=document.getElementById('furniture')
    let eatables=document.getElementById('eatables')
    let books=document.getElementById('books')

    if(electronics.checked)
    {
        category='Electronics'
    }
    else if(furniture.checked)
    {
        category='Furniture'
    }
    else if(eatables.checked)
    {
        category='Eatable'
    }
    else if(books.checked)
    {
        category='Book'
    }

    e.preventDefault()
    item = new Item(itemName,supplierName,category)

    //Adding item to local storage
    let logs=localStorage.getItem('addLog')
    if (logs == null) {
        logsObj = [];
    }
    else {
        logsObj = JSON.parse(logs);
    }
    logsObj.push(item);
    localStorage.setItem('addLog', JSON.stringify(logsObj));

    //Display added record
    addRecordToDisplay(item)
}

// Display Function
function addRecordToDisplay(item,flag){
    display = new Display()

    if(display.validate(item))
    {
        display.add(item)
        display.clear()
        display.show("success","Item is successfully added to the record")
    }
    else
    {
        display.show('danger',"Log filled incorrectly")
    }
}

// Search Functionality
let searchTxt = document.getElementById('searchTxt');
searchTxt.addEventListener('input', e=>{
    let inputValue=searchTxt.value.toLowerCase();
    let rowData=document.getElementsByClassName('rowData');
    Array.from(rowData).forEach(ele => {
        let itemName=ele.querySelector('td.itemName').innerText.toLowerCase()
        console.log("Item is "+itemName);
        if(itemName.includes(inputValue))
        {
            ele.style.display='table-row'
        }
        else
        {
            ele.style.display='None'
        }
    })
});

let searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click',e=>{
e.preventDefault();
})
