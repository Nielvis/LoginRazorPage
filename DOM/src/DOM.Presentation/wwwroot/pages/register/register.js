$(document).ready(function () {

    $("#btnRegister").click(function () {

        let obj = { 
            FirstName: $("#firstName").val(),
            LastName: $("#lastName").val(),
            Email: $("#email").val(),
            Password: $("#password").val()
        };

        if (!obj.FirstName || !obj.LastName || !obj.Email || !obj.Password) {
            $("#message").html("<div class='alert alert-warning'>Por favor, preencha todos os campos.</div>");
            return;
        }

 
        $.ajax({
            url: "/v1/api/register",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(obj),
            success: function (response) {
                $("#message").html("<div class='alert alert-success'>Usuário registrado com sucesso!</div>");
                $("#registerForm input").val(""); 
            },
            error: function (xhr) {
                $("#message").html("<div class='alert alert-danger'>Erro no registro do Usuário: " + xhr.responseText + "</div>");
            }
        });
    });

});

