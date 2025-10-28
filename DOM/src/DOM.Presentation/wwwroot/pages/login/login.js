document.getElementById('btnLogin').addEventListener('click', function () {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        document.getElementById('message').innerHTML = '<p class="text-danger">Preencha todos os campos</p>';
        return;
    }

    fetch('v1/api/login', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Email: email, Password: password })
    })
        .then(async res => {
            if (res.ok) {
                const url = '/App/Index';
                window.location.href = url;
            } else {
                const data = await res.json();
                document.getElementById('message').innerHTML = `<p class="text-danger">${data.Message || 'Email ou senha incorretos'}</p>`;
            }
        })
        .catch(err => {
            console.error(err);
            document.getElementById('message').innerHTML = '<p class="text-danger">Erro no servidor</p>';
        });
});