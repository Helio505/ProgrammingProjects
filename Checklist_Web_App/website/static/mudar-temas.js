// Após 200 ms, muda para o tema salvo.
setTimeout(() => {
    function getCookie(cookieName) {
        if (document.cookie.length != 0){
            var array = document.cookie.split("=");
            // alert("Tema=" + array[0] + " " + "Value=" + array[1]);
            // alert(array[1])
            console.log(array[1])
            console.log(typeof(array[1]))
            return array[1]
        }else{
            return null
        }
    }

    if (getCookie() == "escuro"){
        const btnEscuro = document.querySelector("#button-modo-escuro");
        btnEscuro.style.color = "#0063BAEB";
        btnEscuro.style.borderColor = "#0063BAEB";
        btnEscuro.style.borderWidth = "4px";

        ativarModoEscuro();
    }else{
        const btnDefault = document.querySelector("#button-modo-default");
        btnDefault.style.color = "#0063BAEB";
        btnDefault.style.borderColor = "#0063BAEB";
        btnDefault.style.borderWidth = "4px";

        ativarModoDefault();
    }
}, 200);


function resetarNavButtons() {
    document.querySelector("#button-modo-escuro").style.color = "white";
    document.querySelector("#button-modo-escuro").style.borderColor = "white";
    document.querySelector("#button-modo-escuro").style.borderWidth = "2px";

    document.querySelector("#button-modo-default").style.color = "white";
    document.querySelector("#button-modo-default").style.borderColor = "white";
    document.querySelector("#button-modo-default").style.borderWidth = "2px";
};

function ativarModoEscuro() {
    resetarNavButtons();

    // para body:
    document.querySelector("body").style.backgroundColor = "#212529ed";
    
    // para primary buttons:
    const primaryButtonNodeList = document.querySelectorAll(".primary-btn");
    for (let i = 0; i < primaryButtonNodeList.length; i++) {
        primaryButtonNodeList[i].style.color = "white";
        primaryButtonNodeList[i].style.borderWidth = "2px";
        primaryButtonNodeList[i].style.borderColor = "white";   
    }  

    // para labels:
    const labelsNodeList = document.querySelectorAll(".label");
    for (let i = 0; i < labelsNodeList.length; i++) {
        labelsNodeList[i].style.color = "white";
    }  

    // para inputs:
    const primaryInputsNodeList = document.querySelectorAll(".primary-input");
    for (let i = 0; i < primaryInputsNodeList.length; i++) {
        primaryInputsNodeList[i].style.color = "black";
        primaryInputsNodeList[i].style.borderWidth = "2px";
        primaryInputsNodeList[i].style.borderColor = "white";
        primaryInputsNodeList[i].style.backgroundColor = "#fffffff2";  
    }

    // para botão concluir/não-concluir:
    const statusTarefaNodeList = document.querySelectorAll("#input-button");
    for (let i = 0; i < statusTarefaNodeList.length; i++) {
        statusTarefaNodeList[i].style.borderWidth = "1px";
        statusTarefaNodeList[i].style.borderColor = "black";
    }

    // para container botões editar/deletar:
    const buttonsEditDeleteTarefaNodeList = document.querySelectorAll(".div-edit-delete-tarefa");
    for (let i = 0; i < buttonsEditDeleteTarefaNodeList.length; i++) {
        buttonsEditDeleteTarefaNodeList[i].style.borderWidth = "1px";
        buttonsEditDeleteTarefaNodeList[i].style.borderColor = "black";
        buttonsEditDeleteTarefaNodeList[i].style.backgroundColor = "black";  
    }

    
    // para o conteúdo da tarefa:
    const contentTarefaNodeList = document.querySelectorAll(".tarefa-component-content");
    for (let i = 0; i < contentTarefaNodeList.length; i++) {
        contentTarefaNodeList[i].style.color = "white";
    }
    
    // mudar o botão clicado:
    document.querySelector("#button-modo-escuro").style.color = "#0063BAEB";
    document.querySelector("#button-modo-escuro").style.borderColor = "#0063BAEB";
    document.querySelector("#button-modo-escuro").style.borderWidth = "4px";

    // mudar o botão de atualizar lista de listas:
    document.querySelector("#atualizar-lista-button").style.borderColor = "white";

    document.cookie = "Tema=escuro";
};

function ativarModoDefault() {
    resetarNavButtons();

    // para body:
    document.querySelector("body").style.backgroundColor = "white";
    
    // para primary buttons:
    const primaryButtonNodeList = document.querySelectorAll(".primary-btn");
    for (let i = 0; i < primaryButtonNodeList.length; i++) {
        primaryButtonNodeList[i].style.color = "black";
        primaryButtonNodeList[i].style.borderWidth = "2px";
        primaryButtonNodeList[i].style.borderColor = "black";   
    }  

    // para labels:
    const labelsNodeList = document.querySelectorAll(".label");
    for (let i = 0; i < labelsNodeList.length; i++) {
        labelsNodeList[i].style.color = "black";
    }  

    // para inputs:
    const primaryInputsNodeList = document.querySelectorAll(".primary-input");
    for (let i = 0; i < primaryInputsNodeList.length; i++) {
        primaryInputsNodeList[i].style.color = "black";
        primaryInputsNodeList[i].style.borderWidth = "2px";
        primaryInputsNodeList[i].style.borderColor = "black";
        primaryInputsNodeList[i].style.backgroundColor = "#white";  
    }

    // para botão concluir/não-concluir:
    const statusTarefaNodeList = document.querySelectorAll("#input-button");
    for (let i = 0; i < statusTarefaNodeList.length; i++) {
        statusTarefaNodeList[i].style.borderWidth = "1px";
        statusTarefaNodeList[i].style.borderColor = "black";
    }

    // para container botões editar/deletar:
    const buttonsEditDeleteTarefaNodeList = document.querySelectorAll(".div-edit-delete-tarefa");
    for (let i = 0; i < buttonsEditDeleteTarefaNodeList.length; i++) {
        buttonsEditDeleteTarefaNodeList[i].style.borderWidth = "1px";
        buttonsEditDeleteTarefaNodeList[i].style.borderColor = "black";
        buttonsEditDeleteTarefaNodeList[i].style.backgroundColor = "black";  
    }

    
    // para o conteúdo da tarefa:
    const contentTarefaNodeList = document.querySelectorAll(".tarefa-component-content");
    for (let i = 0; i < contentTarefaNodeList.length; i++) {
        contentTarefaNodeList[i].style.color = "white";
    }
    
    // mudar o botão clicado:
    document.querySelector("#button-modo-default").style.color = "#0063BAEB";
    document.querySelector("#button-modo-default").style.borderColor = "#0063BAEB";
    document.querySelector("#button-modo-default").style.borderWidth = "4px";

    // mudar o botão de atualizar lista de listas:
    document.querySelector("#atualizar-lista-button").style.borderColor = "black";

    document.cookie = "Tema=default";
};