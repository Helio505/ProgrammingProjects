# Checklist Web App

Aplicação Web de Checklist, que possibilita a criação, modificação e remoção de listas e tarefas. As tarefas podem ser marcadas como concluídas ou não concluídas, e a aplicação possui modo escuro.

## Instruções de instalação e uso
- Instalar os requerimentos necessários.
- Executar o arquivo `main.py`.
- Ir para o navegador na porta padrão.
- Passo a passo para usar: [(ver em funcionamento (versão antiga))](other/gif.gif)
    - Criar uma lista.
    - Selecionar uma das listas (e clicar em selecionar).
    - Criar uma tarefa.
    - (se não aparecer automaticamente) Clicar em visualizar lista.

## Em funcionamento
![gif](other/gif.gif)

## Informações principais
- Utiliza Python 3.9.6
- Só foi testado no Windows 10.
- Testado no Microsoft Edge.
- Bibliotecas utilizadas:
    - Flask
    - Flask-RESTful
    - SQLAlchemy
    - SQLite3 (padrão)

## Requerimentos necessários
Para instalar os requerimentos necessários, nas versões corretas. Inserir comando `pip install -r requirements.txt`