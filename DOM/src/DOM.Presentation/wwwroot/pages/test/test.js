$(document).ready(function () {
    Get();
});

function Form() {
    let html = "";

    html += "<div>";
    html += "<label>Name</label>";
    html += "<input type='text' id='name' class='form-control'>";
    html += "</div>";

    html += "<div>";
    html += "<label>Email</label>";
    html += "<input type='text' id='email' class='form-control'>";
    html += "</div>";

    return html;
}

function Register() {
    $(".modal-title").html("Register");

    let html = "";

    html += Form();
    html += "<hr>";
    html += "<a id='btnRegister'>Register</a>";

    $(".modal-body").html(html);

    $("#btnRegister").click(function () {
        let Obj = new Object();

        Obj.Name = $("#name").val();
        Obj.Email = $("#email").val();

        JAjaxSync("POST", "/v1/api/test", JSON.stringify(Obj), null, null, null);

        Get();
        ,
        $(".modal-title").html("");
        $(".modal-body").html("");
        $(".btn-close").click();
    });
}

function Edit(uid) {
    $(".modal-title").html("Edit");

    let html = "";
    html += "<input type='hidden' id='uid' value='" + uid + "' />";
    html += Form();
    html += "<hr>";
    html += "<a id='btnEdit'>Edit</a>";

    $(".modal-body").html(html);

    let result = JAjaxReturnLineSync("GET", "/v1/api/test/" + uid, null, null, null, null);

    $("#name").val(result.name);
    $("#email").val(result.email);

    $("#btnEdit").click(function () {
        let Obj = new Object();

        Obj.Name = $("#name").val();
        Obj.Email = $("#email").val();

        JAjaxSync("PUT", "/v1/api/test/" + $("#uid").val(), JSON.stringify(Obj), null, null, null);

        Get();

        $(".modal-title").html("");
        $(".modal-body").html("");
        $(".btn-close").click();
    });
}

function Get() {
    let html = "";

    let result = JAjaxReturnLineSync("GET", "/v1/api/test", null, null, null, null);

    html += "<a data-bs-toggle=\"modal\" data-bs-target=\"#modal\" onclick='Register()'>Register</a>";
    html += "<hr />";

    html += "<table class='table'>";
    html += "<thead>";
    html += "<tr>";
    html += "<th>Name</th>";
    html += "<th>Email</th>";
    html += "<th>Action</th>";
    html += "</tr>";
    html += "</thead>";

    html += "<tbody>";
    if (result.length > 0) {
        $.each(result, function (index, json) {
            html += "<tr>";
            html += "<td>" + json.name + "</td>";
            html += "<td>" + json.email + "</td>";
            html += "<td><a  data-bs-toggle=\"modal\" data-bs-target=\"#modal\" onclick='Edit(\"" + json.uid + "\")'><i class=\"fa-solid fa-pen-to-square\"></i></a> <a onclick='Delete(\"" + json.name + "\",\"" + json.uid + "\")'><i class=\"fa-solid fa-trash\"></i></a></td>";
            html += "</tr>";
        });
    } else {
        html += "<tr>";
        html += "<td colspan='100'>No records registered</td>";
        html += "</tr>";
    }
    html += "</tbody>";
    html += "</table>";

    $("#divBody").html(html);
}

function Delete(value,uid) {
    if (confirm('Do you want to delete the record: ' + value + '?')) {
        JAjaxSync("DELETE", "/v1/api/test/" + uid, null, null, null, null);

        Get();
    }
}