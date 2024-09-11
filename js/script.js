document.addEventListener("DOMContentLoaded", function () {
 
    fetchResidencias();
 
    document.getElementById('residenciaFormElement').addEventListener('submit', function (event) {
 
        event.preventDefault();
 
        saveResidencia();
 
    });
 
});
 
function fetchResidencias() {
 
    fetch('http://localhost:8000/bandeira')
 
        .then(response => response.json())
 
        .then(data => {
 
            const list = document.getElementById('residenciasList');
 
            list.innerHTML = '<ul class="list-group border border-danger">';
 
            data.forEach(residencia => {
 
                list.innerHTML += `
<li class="list-group-item m-2 p-2 border-bottom">
<div class="row d-flex justify-content-between">
<div class="col"> <strong>${residencia.proprietario}</strong></div>
<div class="col"> <button class="btn btn-info btn-sm float-end ms-2" onclick="showEditForm(${residencia.id}, '${residencia.proprietario}')">Editar</button></div>
<div class="col"> <button class="btn btn-danger btn-sm float-end" onclick="deleteResidencia(${residencia.id})">Deletar</button></div>
</div>
</li>`;
 
            });
 
            list.innerHTML += '</ul>';
 
        });
 
}
 
function showAddForm() {
 
    document.getElementById('residenciaForm').classList.remove('d-none');
 
    document.getElementById('residenciaId').value = '';
 
    document.getElementById('proprietario').value = '';
 
    document.getElementById('formTitle').innerText = 'Adicionar Unidade Consumidora';
 
}
 
function showEditForm(id, proprietario) {
 
    document.getElementById('residenciaForm').classList.remove('d-none');
 
    document.getElementById('residenciaId').value = id;
 
    document.getElementById('proprietario').value = proprietario;
 
    document.getElementById('formTitle').innerText = 'Editar Unidade Consumidora';
 
}
 
function saveResidencia() {
 
    const id = document.getElementById('residenciaId').value;
 
    const proprietario = document.getElementById('proprietario').value;
 
    const method = id ? 'PATCH' : 'POST';
 
    const url = id ? `http://localhost:8000/residencias/${id}` : 'http://localhost:8000/residencias';
 
    fetch(url, {
 
        method: method,
 
        headers: {
 
            'Content-Type': 'application/json'
 
        },
 
        body: JSON.stringify({ proprietario: proprietario })
 
    })
 
        .then(response => response.json())
 
        .then(() => {
 
            fetchResidencias();
 
            document.getElementById('residenciaForm').classList.add('d-none');
 
        });
 
}
 
function deleteResidencia(id) {
 
    fetch(`http://localhost:8000/residencias/${id}`, {
 
        method: 'DELETE'
 
    })
 
        .then(() => fetchResidencias());
 
}
 
 
document.addEventListener("DOMContentLoaded", function () {
 
    fetchBandeiras();
 
    document.getElementById('bandeiraFormElement').addEventListener('submit', function (event) {
 
        event.preventDefault();
 
        saveBandeira();
 
    });
 
});
 
function fetchBandeiras() {
 
    fetch('http://localhost:8000/bandeiras')
 
        .then(response => response.json())
 
        .then(data => {
 
            const list = document.getElementById('bandeirasList');
 
            list.innerHTML = '<ul class="list-group border border-danger">';
 
            data.bandeiras.forEach(bandeira => {
 
                list.innerHTML += `
<li class="list-group-item m-2 p-2 border-bottom">
<div class="row d-flex justify-content-between">
<div class="col"> <strong>${bandeira.nome}</strong> - R$ ${bandeira.tarifa}</div>
<div class="col"> <button class="btn btn-info btn-sm float-end ms-2" onclick="showEditForm(${bandeira.id}, '${bandeira.nome}', ${bandeira.tarifa})">Editar</button></div>
<div class="col"> <button class="btn btn-danger btn-sm float-end" onclick="deleteBandeira(${bandeira.id})">Deletar</button></div>
</div>
</li>`;
 
            });
 
            list.innerHTML += '</ul>';
 
        })
 
        .catch(error => console.error('Erro ao buscar bandeiras:', error));
 
}
 
function showAddForm() {
 
    document.getElementById('bandeiraForm').classList.remove('d-none');
 
    document.getElementById('bandeiraId').value = '';
 
    document.getElementById('nome').value = '';
 
    document.getElementById('tarifa').value = '';
 
    document.getElementById('formTitle').innerText = 'Adicionar Bandeira';
 
}
 
function showEditForm(id, nome, tarifa) {
 
    document.getElementById('bandeiraForm').classList.remove('d-none');
 
    document.getElementById('bandeiraId').value = id;
 
    document.getElementById('nome').value = nome;
 
    document.getElementById('tarifa').value = tarifa;
 
    document.getElementById('formTitle').innerText = 'Editar Bandeira';
 
}
 
function saveBandeira() {
 
    const id = document.getElementById('bandeiraId').value;
 
    const nome = document.getElementById('nome').value;
 
    const tarifa = parseFloat(document.getElementById('tarifa').value);
 
    const method = id ? 'PATCH' : 'POST';
 
    const url = id ? `http://localhost:8000/bandeiras/${id}` : 'http://localhost:8000/bandeiras';
 
    fetch(url, {
 
        method: method,
 
        headers: {
 
            'Content-Type': 'application/json'
 
        },
 
        body: JSON.stringify({ nome: nome, tarifa: tarifa })
 
    })
 
        .then(response => response.json())
 
        .then(() => {
 
            fetchBandeiras();
 
            document.getElementById('bandeiraForm').classList.add('d-none');
 
        })
 
        .catch(error => console.error('Erro ao salvar bandeira:', error));
 
}
 
function deleteBandeira(id) {
 
    fetch(`http://localhost:8000/bandeiras/${id}`, {
 
        method: 'DELETE'
 
    })
 
        .then(() => fetchBandeiras())
 
        .catch(error => console.error('Erro ao deletar bandeira:', error));
 
}