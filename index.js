document.getElementById('cep-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evitar o comportamento padrão de envio do formulário

    // Obter os valores dos campos
    const nome = document.getElementById('nome').value;
    const cep = document.getElementById('cep').value;
    const complemento = document.getElementById('complemento').value || 'N/A'; // Definir 'N/A' se o campo estiver vazio

    // Validar o formato do CEP
    if (!/^\d{5}-\d{3}$/.test(cep)) {
        alert("CEP inválido. O formato correto é XXXXX-XXX.");
        return;
    }

    // Ocultar o texto informativo
    document.querySelector('.cep-instruction').style.display = 'none';

    try {
        // Fazer a requisição para a API do ViaCEP
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

        // Verificar se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error("Erro ao buscar o CEP. Verifique o CEP e tente novamente.");
        }

        // Converter a resposta para JSON
        const data = await response.json();

        // Verificar se o CEP retornou um erro
        if (data.erro) {
            alert("CEP não encontrado.");
            return;
        }

        // Atualizar os resultados na página
        document.getElementById('resultado-nome').textContent = nome;
        document.getElementById('resultado-logradouro').textContent = data.logradouro;
        document.getElementById('resultado-complemento').textContent = complemento;
        document.getElementById('resultado-bairro').textContent = data.bairro;
        document.getElementById('resultado-cidade').textContent = data.localidade;
        document.getElementById('resultado-estado').textContent = data.uf;

        // Mostrar o resultado e o botão de recolher
        document.getElementById('resultado').classList.remove('hidden');
        document.getElementById('collapse-button').classList.remove('hidden');
    } catch (error) {
        // Exibir mensagem de erro
        alert(`Ocorreu um erro: ${error.message}`);
    }
});

document.getElementById('toggle-info').addEventListener('click', function(event) {
    event.preventDefault(); // Evitar o comportamento padrão do link

    // Alternar a visibilidade da seção de informações com animação
    const infoSection = document.getElementById('info-section');
    if (infoSection.classList.contains('hidden')) {
        infoSection.classList.remove('hidden');
        infoSection.classList.add('visible');
    } else {
        infoSection.classList.remove('visible');
        infoSection.classList.add('hidden');
    }
});

document.getElementById('collapse-button').addEventListener('click', function(event) {
    event.preventDefault(); // Evitar o comportamento padrão do link

    // Ocultar a caixa de resultados com animação
    const resultado = document.getElementById('resultado');
    resultado.classList.add('hidden');
    document.getElementById('collapse-button').classList.add('hidden');
});
