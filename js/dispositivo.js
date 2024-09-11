document.addEventListener("DOMContentLoaded", function () {
    fetchDispositivos();

    document.getElementById('dispositivoFormElement').addEventListener('submit', function (event) {
        event.preventDefault();
        saveDispositivo();
    });
});

function fetchDispositivos() {
    fetch('http://localhost:8000/dispositivos')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('dispositivosList');
            list.innerHTML = '<ul class="list-group border border-danger">';
            data.dispositivos.forEach(dispositivo => {
                list.innerHTML += `
<li class="list-group-item m-2 p-2 border-bottom">
    <div class="row d-flex justify-content-between">
        <div class="col"><strong>${dispositivo.nome}</strong> - ${dispositivo.tipo} - ${dispositivo.potencia} W</div>
        <div class="col">
            <button class="btn btn-info btn-sm float-end ms-2" onclick="showEditForm(${dispositivo.id}, '${dispositivo.nome}', '${dispositivo.tipo}', ${dispositivo.potencia})">Editar</button>
        </div>
        <div class="col">
            <button class="btn btn-danger btn-sm float-end" onclick="deleteDispositivo(${dispositivo.id})">Deletar</button>
        </div>
    </div>
</li>`;
            });
            list.innerHTML += '</ul>';
        })
        .catch(error => console.error('Erro ao buscar dispositivos:', error));
}

function showAddForm() {
    document.getElementById('dispositivoFormElement').classList.remove('d-none');
    document.getElementById('dispositivoId').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('tipo').value = '';
    document.getElementById('potencia').value = '';
    document.getElementById('formTitle').innerText = 'Adicionar Dispositivo';
}

function showEditForm(id, nome, tipo, potencia) {
    document.getElementById('dispositivoFormElement').classList.remove('d-none');
    document.getElementById('dispositivoId').value = id;
    document.getElementById('nome').value = nome;
    document.getElementById('tipo').value = tipo;
    document.getElementById('potencia').value = potencia;
    document.getElementById('formTitle').innerText = 'Editar Dispositivo';
}

function saveDispositivo() {
    const id = document.getElementById('dispositivoId').value;
    const nome = document.getElementById('nome').value;
    const tipo = document.getElementById('tipo').value;
    const potencia = document.getElementById('potencia').value;
    const method = id ? 'PATCH' : 'POST';
    const url = id ? `http://localhost:8000/dispositivos/${id}` : 'http://localhost:8000/dispositivos';

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome: nome, tipo: tipo, potencia: parseFloat(potencia) })
    })
        .then(response => response.json())
        .then(() => {
            fetchDispositivos();
            document.getElementById('dispositivoFormElement').classList.add('d-none');
        })
        .catch(error => console.error('Erro ao salvar dispositivo:', error));
}

function deleteDispositivo(id) {
    fetch(`http://localhost:8000/dispositivos/${id}`, {
        method: 'DELETE'
    })
        .then(() => fetchDispositivos())
        .catch(error => console.error('Erro ao deletar dispositivo:', error));
}
