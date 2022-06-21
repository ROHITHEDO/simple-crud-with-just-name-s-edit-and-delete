console.log("hey")

$(document).ready(function () {
    getlocalData();


    createTable();

    deleteRow();
    editRow();
});


function getlocalData() {
    let localData = localStorage.getItem("iAmMessage");
    if (localData == null) {
        localStorage.setItem("iAmMessage", JSON.stringify([]));
    }

    localData = JSON.parse(localStorage.getItem("iAmMessage"));
    return localData;
}

function setlocalData(data) {
    localStorage.setItem("iAmMessage", JSON.stringify(data));
}

function createTable() {
    // let arr = getlocalData();
    let arr = JSON.parse(localStorage.getItem('iAmMessage'));
    for (let i = 0; i < arr.length; i++) {

        let div = $(`<div class="row w-50 p-3 bg-light rounded border-dark shadow" ></div>`)
        let p = $(`<p class="para col-lg-8" id = "${i}"></p>`)

        p.text(arr[i]);
        div.append(p)
        div.append(`<button class="col-lg-1 me-1 p-2 btn btn-danger Delete delbtn">Delete</button>`)
        div.append('<button class="col-lg-1 btn btn-success Edit editbtn" class="Edit" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button>')

        $("#tableID").append(div);
    }
}
function deleteRow() {
    $(".delbtn").click(function () {
        let parent = $(this).parent(); //para
        let index = $(parent).attr('id'); //para ka id

        $(parent).remove();


        let data = getlocalData();
        data.splice(index, 1);

        setlocalData(data);


    });
}



$("#savechanges").click(function () {
    let value = $("#inputfield").val();

    let div = $(`<div class="row" ></div>`)
    let p = $(`<p class="para col" ></p>`)

    p.text(value);
    div.append(p)
    div.append(`<button class="Delete delbtn col btn btn-danger">Delete</button>`)
    div.append('<button type="button" class="Edit col btn btn-success" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button>')

    $("#tableID").append(div);

    let localArray = getlocalData();
    localArray.push(value);
    setlocalData(localArray);

    $("#tableID").append(tr1);

})

function editRow() {
    $(".editbtn").click(function () {
        let parent = $(this).parent(); //para
        let targetIndex = $(parent.children()[0]).attr('id'); //para ka id

        let data = getlocalData();

        
        $("#editSaveChanges").click(function(){

            for (let i = 0; i < data.length; i++) 
            {
                if (i == targetIndex) {
                    if ($("#editInput").val() != "")
                    {
                        data[i] = $("#editInput").val();
                    
                        setlocalData(data);
                        
                        if($("#tableID").html()==""){
                            createTable();
                        }   
                        else{
                            $("#tableID").html("");
                            createTable();
                        }
                    }
                    else
                        return
    
                }
            }
        })



    });
}

$("#btndatafield").click(function () {
    if ($("#inputdatafield").val() == "") {
        $("#paradatafield").text("please fill the calender")
    }

    else {
        $("#paradatafield").text(calage($("#inputdatafield").val()))

    }

})


function calage(str) {
    let d = new Date(str).getFullYear();
    let curryear = new Date().getFullYear();
    return curryear - d;
}
