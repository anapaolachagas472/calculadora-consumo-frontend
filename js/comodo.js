document.addEventListener("DOMContentLoaded", function () {
    fetchComodos();

    document.getElementById('comodoFormElement').addEventListener('submit', function (event) {
        event.preventDefault();
        saveComodo();
    });
});

function fetchComodos() {
    fetch('http://localhost:8000/comodos')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar cômodos: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const list = document.getElementById('comodosList');
            list.innerHTML = '<ul class="list-group border border-danger">';
            
            if (Array.isArray(data.comodos)) {
                data.comodos.forEach(comodo => {
                    list.innerHTML += `
                        <li class="list-group-item m-2 p-2 border-bottom">
                            <div class="row d-flex justify-content-between">
                                <div class="col"> <strong>${comodo.nome}</strong> - Tipo ID: ${comodo.tipo_id}</div>
                                <div class="col"> <button class="btn btn-info btn-sm float-end ms-2" onclick="showEditForm(${comodo.id}, '${comodo.nome}', ${comodo.tipo_id})">Editar</button></div>
                                <div class="col"> <button class="btn btn-danger btn-sm float-end" onclick="deleteComodo(${comodo.id})">Deletar</button></div>
                            </div>
                        </li>`;
                });
            } else {
                list.innerHTML += '<li class="list-group-item">Nenhum cômodo encontrado</li>';
            }

            list.innerHTML += '</ul>';
        })
        .catch(error => {
            console.error(error);
            alert('Erro ao carregar cômodos. Verifique o console para mais detalhes.');
        });
}

function showAddForm() {
    document.getElementById('comodoForm').classList.remove('d-none');
    document.getElementById('comodoId').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('tipo_id').value = '';
    document.getElementById('formTitle').innerText = 'Adicionar Cômodo';
}

function showEditForm(id, nome, tipo_id) {
    document.getElementById('comodoForm').classList.remove('d-none');
    document.getElementById('comodoId').value = id;
    document.getElementById('nome').value = nome;
    document.getElementById('tipo_id').value = tipo_id;
    document.getElementById('formTitle').innerText = 'Editar Cômodo';
}

function saveComodo() {
    const id = document.getElementById('comodoId').value;
    const nome = document.getElementById('nome').value;
    const tipo_id = parseInt(document.getElementById('tipo_id').value);

    console.log('ID:', id);
    console.log('Nome:', nome);
    console.log('Tipo ID:', tipo_id);

    if (!nome) {
        alert('Por favor, insira um nome válido.');
        return;
    }

    const method = id ? 'PATCH' : 'POST';
    const url = id ? `http://localhost:8000/comodos/${id}` : 'http://localhost:8000/comodos';

    const requestData = { nome: nome, tipo_id: tipo_id };

    console.log('Request Data:', requestData);

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                console.error('Erro:', data);
                throw new Error(data.detail || 'Erro desconhecido ao salvar o cômodo');
            });
        }
        return response.json();
    })
    .then(() => {
        fetchComodos();
        document.getElementById('comodoForm').classList.add('d-none');
    })
    .catch(error => {
        console.error(error);
        alert('Erro ao salvar o cômodo. Verifique o console para mais detalhes.');
    });
}

function deleteComodo(id) {
    if (!confirm('Tem certeza que deseja deletar este cômodo?')) {
        return;
    }

    fetch(`http://localhost:8000/comodos/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao deletar o cômodo: ' + response.statusText);
            }
            fetchComodos();
        })
        .catch(error => {
            console.error(error);
            alert('Erro ao deletar o cômodo. Verifique o console para mais detalhes.');
        });
}
