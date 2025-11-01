document.getElementById('btn-deletar').addEventListener('click', () => {
    const cpf = document.getElementById('cpf-deleta').value; 
    if (!cpf) {
        alert('Digite um CPF para deletar.');
        return;
    }

    if (!confirm(`Tem certeza que deseja deletar a pessoa com CPF ${cpf}?`)) { 
        return;
    }

    // ⬇️ AQUI
    fetch(`/api/pessoas?cpf=${cpf}`) 
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const pessoaId = data[0].id;
                
                // ⬇️ E AQUI
                return fetch(`/api/pessoas/${pessoaId}`, {
                    method: 'DELETE'
                });
            } else {
                throw new Error('Pessoa não encontrada.');
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Pessoa deletada com sucesso!');
                document.getElementById('cpf-deleta').value = ''; 
            } else {
                throw new Error('Falha ao deletar.');
            }
        })
        .catch(error => {
            console.error('Erro ao deletar:', error);
            alert(error.message);
        });
});