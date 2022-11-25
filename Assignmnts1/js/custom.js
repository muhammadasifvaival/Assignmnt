var myContacts, filteredArray;
getAllContacts();
function displayAllContacts(allContacts){
    debugger;
    if(allContacts.length > 0){
        allContacts.forEach((element, index) => {
            addContactInTable(element, index);
        });
        var totalRows = $('#tblData').find('tbody tr:has(td)').length;
        var recordPerPage = 5;
        var totalPages = Math.ceil(totalRows / recordPerPage);
        var $pages = $('<div id="pages"></div>');
        for (i = 0; i < totalPages; i++) {
            $('<span class="pageNumber">&nbsp;' + (i + 1) + '</span>').appendTo($pages);
        }
        $pages.appendTo('#tblData');
    
        $('.pageNumber').hover(
            function() {
                $(this).addClass('focus');
            },
            function() {
                $(this).removeClass('focus');
            }
        );
    
        $('table').find('tbody tr:has(td)').hide();
        var tr = $('table tbody tr:has(td)');
        for (var i = 0; i <= recordPerPage - 1; i++) {
            $(tr[i]).show();
        }
        $('span').click(function(event) {
            $('#tblData').find('tbody tr:has(td)').hide();
            var nBegin = ($(this).text() - 1) * recordPerPage;
            var nEnd = $(this).text() * recordPerPage - 1;
            for (var i = nBegin; i <= nEnd; i++) {
                $(tr[i]).show();
            }
        });
    }
    else{
        $('#tblData tbody').append(`<span>No contacts found</span>`)
    }
}
function getAllContacts(){
    myContacts = filteredArray = JSON.parse(localStorage.getItem('myContacts'));
    if (myContacts == null){
        myContacts = filteredArray = [];
    }
}
function addContact(){
    debugger;
    let email = $('#email').val();
    let name = $('#fname').val();
    let number = $('#phone').val();
    let newContact = {
        email: email,
        name: name,
        number: number
    }
    myContacts.push(newContact);
    localStorage.setItem('myContacts', JSON.stringify(myContacts));
    window.location.href = './index.html'
}
function updateContact(index){
    debugger;
    myContacts[index].email = $('#email').val();
    myContacts[index].name = $('#fname').val();
    myContacts[index].number = $('#phone').val();
    localStorage.setItem('myContacts', JSON.stringify(myContacts));
    window.location.href = './index.html'
}
function addContactInTable(data, index){
    $('#tblData tbody').append(`
    <tr>
        <td>${data.name}</td>
        <td>${data.email}</td>
        <td>${data.number}</td>
        <td>
            <button type="button"><a href='./EditContact.html?i=${index}'>Edit</a></button>
            <button type="button" onclick="deleteContact(${index})">Delete</button>
        </td>
    </tr>`)
}
function emptyTable(){
    $('#tblData tbody').empty();
    $('#pages').remove();
}
function deleteContact(index){
    if(confirm('Are you sure you want to delete this contact?'))
    {
        myContacts.splice(index, 1);
        localStorage.setItem('myContacts', JSON.stringify(myContacts));
        emptyTable();
        displayAllContacts(myContacts);
    }
}
function editContact(index){
    localStorage.setItem('editCheck', true);
    localStorage.setItem('editIndex', index);
    window.location.href = './Contact.html';
}