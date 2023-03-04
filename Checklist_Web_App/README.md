# Checklist Web App

Aplicação Web de Checklist, que possibilita a criação, modificação e remoção de listas e tarefas. As tarefas podem ser marcadas como concluídas.

## Instruções de instalação e uso
- Instalar os requerimentos necessários.
- Executar o arquivo `main.py`.
- Ir para o navegador na porta padrão.
- Passo a passo para usar: [(ver em funcionamento)](other/gif.gif)
    - Criar uma lista.
    - Atualizar a lista de listas (clicar em &#128260;).
    - Selecionar uma das listas (e clicar em selecionar).
    - Criar uma tarefa.
    - Clicar em visualizar lista.

## Em funcionamento
![gif](other/gif.gif)

## Informações principais
- Utiliza Python 3.9.6
- Só foi testado no Windows 10.
- Testado no Microsoft Edge.
- Não possui autenticação.
- Bibliotecas utilizadas:
    - sqlite3 (padrão)
    - Flask
    - Flask-RESTful
    - SQLAlchemy

## Requerimentos necessários
Para instalar os requerimentos necessários, nas versões corretas. Inserir comando `pip install -r requirements.txt`