document.getElementById('form-post').addEventListener('submit', (event) => {
    event.preventDefault(); 

    const dados = {
        nome: document.getElementById('nome').value,
        sobrenome: document.getElementById('sobrenome').value,
        email: document.getElementById('email').value,
        idade: parseInt(document.getElementById('idade').value),
        telefone: document.getElementById('telefone').value,
        rua: document.getElementById('rua').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        cpf: document.getElementById('cpf').value
    };

    fetch('/api/pessoas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao cadastrar pessoa');
        }
        return response.json();
    })
    .then(data => {
        alert('Pessoa cadastrada com sucesso!');
        document.getElementById('form-post').reset(); 
    })
    .catch(error => {
        alert('Erro ao cadastrar: ' + error.message);
        console.error('Erro ao cadastrar:', error);
    });
});