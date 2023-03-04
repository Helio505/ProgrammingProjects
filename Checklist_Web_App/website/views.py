from flask import Blueprint, render_template
from flask_restful import request

from flask import Flask, make_response, jsonify, request

import sqlalchemy
from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import declarative_base, sessionmaker

engine = sqlalchemy.create_engine('sqlite:///db.db')
Base = declarative_base()

class Lista(Base):
    __tablename__ = 'lista'

    id = Column(Integer, primary_key=True)
    nome = Column(String(100))

class Tarefa(Base):
    __tablename__ = 'tarefa'

    id = Column(Integer, primary_key=True)
    nome = Column(String(100))
    conteúdo = Column(String(100))
    pertence_a = Column(Integer)
    status = Column(Boolean)

class Extra(Base):
    __tablename__ = 'extra'

    id = Column(Integer, primary_key=True)
    lista_selecionada = Column(Integer)
Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()

# Para ter certeza que a tabela
# extra tem somente um registro:
# Testando se o registro inicial existe:
a = session.query(Extra).filter_by(id=1).first()
if a == None:
    session.add(Extra(id=1))
    session.commit()
else:
    pass

views = Blueprint("views", __name__)

@views.route("/")
def home():
    return render_template("home.html")

@views.route("/lists", methods=['GET'])
def get_listas():
    """
    Retorna uma lista com todas as listas.
    """
    Session = sessionmaker(bind=engine)
    session = Session()
    listas = []
    for i in session.query(Lista).order_by(Lista.id):
        lista = {
            "id": i.id, "nome": i.nome
        }
        listas.append(lista)
    
    session.close()
    return make_response(
        jsonify(
            message="Lista com todas as listas.",
            data=listas
        )
    )

@views.route("/lists", methods=['POST'])
def inserir_lista():
    """
    Insere uma lista no banco de dados
    """

    Session = sessionmaker(bind=engine)
    session = Session()

    response = request.json

    # Se lista já existe com esse nome:
    if session.query(Lista).filter_by(nome=response['nome']).first() != None:
        return make_response(
            jsonify(
                message="Listas devem ter nomes únicos."
            ),
            500
        )
    else:
        lista_database = Lista(nome=response['nome'])
        session.add(lista_database)
        session.commit()
        session.close()

        return make_response(
            jsonify(
                message="Lista criada com sucesso."
            ),
            200
        )

@views.route("/tasks", methods=['POST'])
def criar_tarefa():
    """
    Cria um tarefa.
    """
    Session = sessionmaker(bind=engine)
    session = Session()

    response = request.json

    extra_database_saved_id_list = session.query(Extra).filter_by(id=1).first()

    tarefa = Tarefa(nome="tarefa", conteúdo=response['conteúdo'], pertence_a=extra_database_saved_id_list.lista_selecionada, status=0)
    session.add(tarefa)
    session.commit()
    session.close()
    return {"data": "tarefa adicionada com sucesso"}

@views.route("/extra/list/selected/id", methods=['PUT'])
def selecionar_lista():
    """
        Insere no banco de dados, a id da lista selecionada.
    """

    Session = sessionmaker(bind=engine)
    session = Session()

    # Nesse response está a lista que foi selecionada agora:
    response = request.json

    # Achando o id pelo nome da lista selecionada:
    lista_selecionada_nova = session.query(Lista).filter_by(nome=response['nome']).first()

    if lista_selecionada_nova == None:
        return make_response(
            jsonify(
            message="Not found"
            ),
            404
        )
    
    # Armazenando o id da nova lista selecionada no bd Extra:
    extra_database_save_id = session.query(Extra).filter_by(id=1).first()
    extra_database_save_id.lista_selecionada = lista_selecionada_nova.id

    session.commit()
    session.close()
    return {"data": response}

@views.route("/lists/selected/name", methods=['GET'])
def get_nome_lista_selecionada():
    """
        Retorna o nome da lista selecionada.
    """
    Session = sessionmaker(bind=engine)
    session = Session()

    saved_in_extra = session.query(Extra).filter_by(id=1).first()

    lista_by_id = session.query(Lista).filter_by(id=saved_in_extra.lista_selecionada).first()
    if lista_by_id == None:
        return make_response(
            jsonify(
                message="Nenhuma lista foi selecionada. Não é possível retornar o nome."
            ),
            500
        )
    
    nome_lista = lista_by_id.nome
    session.close()
    return make_response(
        jsonify(
            message="dfasfd",
            data={"data": nome_lista}
        )
    )

@views.route("/lists/selected/tasks", methods=['GET'])
def get_todas_tarefas_pertencentes():
    """
        Retorna a lista com todas as tarefas pertencentes à lista selecionada.
    """
    Session = sessionmaker(bind=engine)
    session = Session()

    saved_in_extra = session.query(Extra).filter_by(id=1).first()

    lista_by_id = session.query(Lista).filter_by(id=saved_in_extra.lista_selecionada).first()
    if lista_by_id == None:
        return make_response(
            jsonify(
                message="Nenhuma lista foi selecionada. Não é possível retornar as tarefas pertencentes."
            ),
            500
        )

    todas_tarefas = session.query(Tarefa).filter_by(pertence_a=lista_by_id.id)

    lista_de_todas_tarefas = []
    for i in todas_tarefas:
        tarefa = {
            "id": i.id,
            "nome": i.nome,
            "conteúdo": i.conteúdo,
            "status": i.status
        }
        lista_de_todas_tarefas.append(tarefa)
    session.close()

    return make_response(
        jsonify(
            message="dfasfd",
            data={"data": lista_de_todas_tarefas}
        )
    )

@views.route("/tasks/status", methods=['PUT'])
def mudar_status_checkbox():
    """
    Pega o submit do checkbox, e o id do checkbox.
    Muda o status do checkbox de uma tarefa.
    """
    
    request_json = request.json
    id_tarefa = request_json['id_tarefa']
    status_tarefa = request_json['status_tarefa']

    if  status_tarefa in [False, 0]:
        Session = sessionmaker(bind=engine)
        session = Session()

        tarefa = session.query(Tarefa).filter_by(id=id_tarefa).first()
        tarefa.status = True
        session.commit()
        
        return make_response(
            jsonify(
                message="Status da tarefa modificado com sucesso para TRUE."
            ),
            200
        )
    elif status_tarefa in [True, 1]:
        Session = sessionmaker(bind=engine)
        session = Session()

        tarefa = session.query(Tarefa).filter_by(id=id_tarefa).first()
        tarefa.status = False

        session.commit()
        return make_response(
            jsonify(
                message="Status da tarefa modificado com sucesso para FALSE."
            ),
            200
        )
    else:
        return make_response(
            jsonify(
                message="O servidor não conseguiu identificar o status da tarefa."
            ),
            500
        )

@views.route("/lists/selected", methods=['DELETE'])
def delete_lista():
    """
    Deleta a lista selecionada.
    """
    Session = sessionmaker(bind=engine)
    session = Session()

    # Id armazenada em extra:
    id_lista_selecionada = session.query(Extra).filter_by(id=1).first().lista_selecionada
    
    # Deletando a lista selecionada:
    lista_selecionada = session.query(Lista).filter_by(id=id_lista_selecionada).first()
    session.delete(lista_selecionada)
    session.commit()

    # Deletando todas as tarefas antes pertencentes à lista selecionada:
    listas_pertencentes = session.query(Tarefa).filter_by(pertence_a=id_lista_selecionada)
    for i in listas_pertencentes:
        session.delete(i)
        session.commit()


    # receber os dados aqui e mudar o nome da lista no banco de dados
    return {"data": "lista deletada com sucesso"}
    
@views.route("/lists/selected/name", methods=["PUT"])
def edit_nome_lista():
    """
    Modifica o nome da lista selecionada.
    """
    Session = sessionmaker(bind=engine)
    session = Session()
    
    request2 = request.json
    nome = request2["nome"]

    # Id armazenada em extra:
    id_lista_selecionada = session.query(Extra).filter_by(id=1).first().lista_selecionada
    
    lista_selecionada = session.query(Lista).filter_by(id=id_lista_selecionada).first()
    lista_selecionada.nome = nome

    session.commit()
    return {"result": "Lista modificaddddda."}