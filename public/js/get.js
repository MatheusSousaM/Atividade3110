window.addEventListener('load', () => {
    // ⬇️ AQUI
    fetch('/api/pessoas')
        .then(response => response.json())
        .then(data => {
            const tabela = document.getElementById('tabela-pessoas');
            tabela.innerHTML = ''; // Limpa a tabela antes de preencher
            
            data.forEach(pessoa => {
                const linha = `
                    <tr>
                        <td>${pessoa.id}</td>
                        <td>${pessoa.nome} ${pessoa.sobrenome}</td>
                        <td>${pessoa.email}</td>
                        <td>${pessoa.telefone}</td>
                        <td>${pessoa.cpf}</td>
                    </tr>
                `;
                tabela.innerHTML += linha;
            });
        })
        .catch(error => console.error('Erro ao buscar pessoas:', error));
});