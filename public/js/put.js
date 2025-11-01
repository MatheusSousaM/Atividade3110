// Espera o botão "Buscar" ser clicado
document.getElementById('btn-buscar').addEventListener('click', () => {
    const cpf = document.getElementById('cpf-busca').value;
    
    // Busca na API usando o CPF (ex: /api/pessoas?cpf=123)
    fetch(`/api/pessoas?cpf=${cpf}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na rede');
            }
            return response.json();
        })
        .then(data => {
            // Verifica se a busca retornou alguma pessoa
            if (data.length === 0) {
                throw new Error('Pessoa não encontrada com este CPF');
            }
            
            // Pega o primeiro resultado da busca
            const pessoa = data[0]; 

            // Preenche os campos do formulário
            document.getElementById('id').value = pessoa.id;
            document.getElementById('nome').value = pessoa.nome;
            document.getElementById('sobrenome').value = pessoa.sobrenome;
            document.getElementById('email').value = pessoa.email;
            document.getElementById('idade').value = pessoa.idade;
            document.getElementById('telefone').value = pessoa.telefone;
            document.getElementById('rua').value = pessoa.rua;
            document.getElementById('bairro').value = pessoa.bairro;
            document.getElementById('cidade').value = pessoa.cidade;
            document.getElementById('estado').value = pessoa.estado;
            document.getElementById('cpf').value = pessoa.cpf;
            
            // Mostra o formulário de atualização
            document.getElementById('form-put').style.display = 'block';
        })
        .catch(error => {
            alert('Erro ao buscar pessoa: ' + error.message);
            // Garante que o formulário esteja escondido se der erro
            document.getElementById('form-put').style.display = 'none';
        });
});

// Espera o formulário "Atualizar" ser enviado
document.getElementById('form-put').addEventListener('submit', (event) => {
    event.preventDefault(); // Não deixa a página recarregar

    // Pega o ID da pessoa (que está no campo escondido)
    const idDaPessoa = document.getElementById('id').value;

    // Pega todos os dados dos campos do formulário
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

    // Envia os dados para a API usando o ID (ex: /api/pessoas/1)
    fetch(`/api/pessoas/${idDaPessoa}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao atualizar pessoa');
        }
        return response.json();
    })
    .then(data => {
        alert('Pessoa atualizada com sucesso!');
        document.getElementById('form-put').style.display = 'none'; // Esconde o formulário
        document.getElementById('form-put').reset(); // Limpa os campos
        document.getElementById('cpf-busca').value = ''; // Limpa o campo de busca
  Não   })
    .catch(error => console.error('Erro ao atualizar:', error));
});