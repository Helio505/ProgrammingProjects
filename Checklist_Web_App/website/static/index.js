const atualizarListaBtn = document.querySelector("#atualizar-lista-button");
atualizarListaBtn.addEventListener("click", update_select);
function update_select() {
    /*
        Atualiza a lista de listas.
        -É acionada quando o botão atualizar listas é pressionado-
    */
    var http = new XMLHttpRequest();
    var url = "http://127.0.0.1:5000/lists";
    var method = "GET";

    http.open(method, url);
    http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    http.onreadystatechange = function() {
        if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
            // console.log(JSON.parse(http.responseText)[0].userId);
            // console.log(JSON.parse(http.responseText));

            document.getElementById("select").innerHTML = null;
            let parsedResponse = (JSON.parse(http.responseText));
            for (i of parsedResponse.data){
                document.getElementById("select").innerHTML += (
                    `<option value="${i.nome}">
                        ${i.nome}
                    </option>`)
            }

        }else if(http.readyState === XMLHttpRequest.DONE && http.status !== 200){
            console.log("Error");
        }
    }
    http.send();
}


function visualizar_lista() {
    /*
        Mostra a lista selecionada, e suas tarefas.
    */
        get_name_lista();
        get_tarefas_pertencentes();
    }   


function get_name_lista() {
    // Mandando request:
    var http = new XMLHttpRequest();
    var url = "http://127.0.0.1:5000/lists/selected/name";
    var method = "GET";

    http.open(method, url);
    http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    http.onreadystatechange = function() {
        if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
            
            const nomeListaSelecionada = (JSON.parse(http.responseText)).data.data;
            // console.log(nomeListaSelecionada);

            // Colocando o nome no component:
            document.getElementById("lista-title").innerHTML = nomeListaSelecionada;

            // Mostrando qual lista está selecionada no momento:
            document.querySelector("#lista-selecionada").innerHTML = (
            `
            Lista selecionada:
            <div id="lista-selecionada-content">
                ${nomeListaSelecionada}
            </div>`);
               
        }else if(http.readyState === XMLHttpRequest.DONE && http.status !== 200){
            console.log("Error");
        }
    }
    http.send();
}
get_name_lista();

function get_tarefas_pertencentes() {

    const request = new XMLHttpRequest();
    request.open("GET", ("http://127.0.0.1:5000/lists/selected/tasks"));
    request.onload = () => {
        const data = JSON.parse(request.response)
        // console.log(data.data)

        document.getElementById("lista-content-id").innerHTML = null;
        for (const [key, value] of Object.entries(data.data.data)){
                        if (value.status == 1){
                            // var status = "[X]";
                            var status = '\u2611';
                            var contentAndFontWeight = `<strike>${value.conteúdo}</strike>`
                        }else if (value.status == null || value.status == 0){
                            // var status = "[]";
                            var status = '\u2610';
                            var contentAndFontWeight = `${value.conteúdo}`
                        }

                        document.getElementById("lista-content-id").innerHTML += (`
                        <div class="tarefa-component">
                            <div class="tarefa-component-checkbox">
                                <!-- Botões tarefa -->
                                <form action="">
                                    <input id="input-button" type="button" name="input3" value="${status}" onclick="editTarefaStatus(${value.id}, ${value.status});">
                                    <input id="input-button2" type="hidden" name="input4" value="${value.id}">
                                </form>
                            </div>
                            <!-- Botões tarefa -->
                            <div class="div-edit-delete-tarefa" id="div-edit-delete-tarefa${value.id}">
                                <input id="input-button-edit-tarefa" type="button" value="Edit" onclick="editTarefa(${value.id});" name="edit${value.id}">
                                <input id="input-button-delete-tarefa" type="button" value="Del" onclick="deletarTarefa(${value.id});">
                            </div>
                            <div class="tarefa-component-content">
                                ${contentAndFontWeight}
                            </div>
                        </div>`);
                    }
    }
    request.send()
}

function editNomeLista() {
    document.getElementById("lista-title").innerHTML = (
        `
        <div id="div-edit">
            <form action="">
             
                    <input id="list-title-input" type="text">
                    <input id="button3" type="button" value="Editar" onclick="editNomeListaRequest();">

            </form>
        </div>
        `
    );
}
function editNomeListaRequest() {
    
    const newListName = document.querySelector("#list-title-input").value;
    
    let emptyName = ["", " ", "  ", "   ", "    "];
    if (emptyName.includes(newListName)) {
        alert("Insira algum nome válido para a lista.")
        return
    }

    // Mandando request:
    var http = new XMLHttpRequest();
    var url = "http://127.0.0.1:5000/lists/selected";
    var method = "PUT";
    // alert(newListName)
    http.open(method, url);
    http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    http.onreadystatechange = function() {
        if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
            // console.log(JSON.parse(http.responseText));
            console.log(http.status);
            visualizar_lista();
            
        }else if(http.readyState === XMLHttpRequest.DONE && http.status !== 200){
            console.log(http.status)
            console.log("Error");
        }
    }
    http.send(JSON.stringify({
        "nome": newListName
    }));
}

/* Para criar lista */
const buttonCriarLista = document.querySelector("#send-criar-lista");
buttonCriarLista.addEventListener("click", function(e){
    e.preventDefault();

    const inputTagNomeLista = document.querySelector("#input-criar-lista");
    const nomeLista = inputTagNomeLista.value;

    let emptyName = ["", " ", " ", "   "];
    if (emptyName.includes(nomeLista)) {
        alert("Insira algum nome para a lista.")
        return
    }


    // Mandando request:
    var http = new XMLHttpRequest();
    var url = "http://127.0.0.1:5000/lists";
    var method = "POST";

    http.open(method, url);
    http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    http.onreadystatechange = function() {
        if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
            console.log(http.status);
            
        }else if(http.readyState === XMLHttpRequest.DONE && http.status === 500){
            console.log("Error");
            alert("Lista não criada: Listas devem ter nomes únicos.")
        }
    }
    http.send(JSON.stringify({
        "nome": nomeLista
    }));
     // Atualizar após mudança no BD
    document.querySelector("#input-criar-lista").value = null;
});

/* Para selecionar uma lista */
const buttonSelecionarLista = document.querySelector("#button-select");
buttonSelecionarLista.addEventListener("click", function(e){
    e.preventDefault();

    const select = document.querySelector("#select");
    const selectValue = select.value;

    console.log(selectValue);

    // Mandando request:
    var http = new XMLHttpRequest();
    var url = "http://127.0.0.1:5000/extra/list/selected/id";
    var method = "PUT";

    http.open(method, url);
    http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    http.onreadystatechange = function() {
        if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
            // console.log(JSON.parse(http.responseText));
            console.log(http.status)
            get_name_lista();
            // console.log(http.status)
            // visualizar_lista();
            
        }else if(http.readyState === XMLHttpRequest.DONE && http.status !== 200){
            console.log("Error");
        }
    }
    http.send(JSON.stringify({
        "nome": selectValue
    }));
    // visualizar_lista();
});

/* Para criar tarefa */
const buttonCriarTarefa = document.querySelector("#button-criar-tarefa");
buttonCriarTarefa.addEventListener("click", function(e){
    e.preventDefault();

    const inputTagContentTarefa = document.querySelector("#input-content-tarefa");
    const tarefaContent = inputTagContentTarefa.value;

    let emptyName = ["", " ", "  ", "   ", "    "];
    if (emptyName.includes(tarefaContent)) {
        alert("Insira algum conteúdo para a tarefa.")
        return
    }


    // Mandando request:
    var http = new XMLHttpRequest();
    var url = "http://127.0.0.1:5000/tasks";
    var method = "POST";

    http.open(method, url);
    http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    http.onreadystatechange = function() {
        if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
            // console.log(JSON.parse(http.responseText));
            console.log(http.status)
            // console.log(http.status)
            visualizar_lista();
            
        }else if(http.readyState === XMLHttpRequest.DONE && http.status !== 200){
            console.log(http.status);
            console.log("Error");
        }
    }
    http.send(JSON.stringify({
        "conteúdo": tarefaContent
    }));
    // Ao clicar em add task, var remover o conteúdo atual:
    document.querySelector("#input-content-tarefa").value = null;
    // Ao clicar em add, abre a visualização da lista:
    // visualizar_lista();
});

/* Event listener e função para mudar o status da tarefa ao clicar: */
const buttonTaskStatus = document.querySelector("#input-button");
buttonTaskStatus.addEventListener("click", function () {
    if (button.value === "[]") {
        button.value = "[X]";
    }else{
        button.value = "[]";
    }
});

/* Para resetar a página */
const buttonResetPage = document.querySelector("#reset-button");
buttonResetPage.addEventListener("click", function(){
    document.location.reload();
    window.location.href = "/"
});



// const buttonDeleteLista = document.querySelector("#input-button-delete-lista");
// buttonDeleteLista.addEventListener("click", 
function deleteLista(){
    // Mandando request:
    var http = new XMLHttpRequest();
    var url = "http://127.0.0.1:5000/lists/selected";
    var method = "DELETE";

    http.open(method, url);
    http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    http.onreadystatechange = function() {
        if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
            // console.log(JSON.parse(http.responseText));
            console.log(http.status);
            document.location.reload();
            window.location.href = "/";
            
        }else if(http.readyState === XMLHttpRequest.DONE && http.status !== 200){
            console.log(http.status);
            console.log("Error");
        }
    }
    http.send();
    // document.querySelector("#input-content-tarefa").value = null;
};


const buttonDeleteTarefa = document.querySelector("#input-button-delete-tarefa");
buttonDeleteTarefa.addEventListener("click", deletarTarefa); 
function deletarTarefa(parameter){
    // Pegando o id que vou precisar:
    hiddenInputId = parameter;
    
    // Mandando request:
    var http = new XMLHttpRequest();
    var url = `http://127.0.0.1:5000/tasks/${hiddenInputId}`;
    var method = "DELETE";

    http.open(method, url);
    http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    http.onreadystatechange = function() {
        if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
            // console.log(JSON.parse(http.responseText));
            console.log(http.status);
            visualizar_lista();
            
        }else if(http.readyState === XMLHttpRequest.DONE && http.status !== 200){
            console.log(http.status);
            console.log("Error");
        }
    }
    http.send();
    // document.querySelector("#input-content-tarefa").value = null;
};

function editTarefa(parameter) {
    const hiddenInputId = parameter;
    
    var inputAndSubmit = (
        `
        <div id="div-edit">
            <form action="">
                    <input id="tarefa-input" type="text">
                    <input id="button4" type="button" value="Submit" onclick="editTarefaRequest(${hiddenInputId});">
            </form>
        </div>
        `
    )
    // document.getElementById("div-edit-delete-tarefa").innerHTML = inputAndSubmit;
    document.getElementById(`div-edit-delete-tarefa${hiddenInputId}`).innerHTML = inputAndSubmit;
}
function editTarefaRequest(parameter) {
    const hiddenInputId = parameter;
    const newTarefaContent = document.querySelector("#tarefa-input").value;
    
    let emptyName = ["", " ", "  ", "   ", "    "];
    if (emptyName.includes(newTarefaContent)) {
        alert("Insira algum conteúdo válido para a tarefa.")
        return
    }

    // Mandando request:
    var http = new XMLHttpRequest();
    var url = `http://127.0.0.1:5000/tasks/${hiddenInputId}`;
    var method = "PUT";
    // alert(newListName)
    http.open(method, url);
    http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    http.onreadystatechange = function() {
        if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
            // console.log(JSON.parse(http.responseText));
            console.log(http.status)
            // console.log(http.status)
            visualizar_lista();
            
        }else if(http.readyState === XMLHttpRequest.DONE && http.status !== 200){
            console.log(http.status)
            console.log("Error");
        }
    }
    http.send(JSON.stringify({
        "conteúdo": newTarefaContent
    }));
}


function editTarefaStatus(par1, par2) {
    // Mandando request:
    var http = new XMLHttpRequest();
    var url = "http://127.0.0.1:5000/tasks/status";
    var method = "PUT";

    http.open(method, url);
    http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    http.onreadystatechange = function() {
        if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
            // console.log(JSON.parse(http.responseText));
            console.log(http.status)
            // console.log(http.status)
            visualizar_lista();
            
        }else if(http.readyState === XMLHttpRequest.DONE && http.status !== 200){
            console.log(http.status)
            console.log("Error");
        }
    }
    http.send(JSON.stringify({
        "id_tarefa": par1,
        "status_tarefa": par2
    }));
}