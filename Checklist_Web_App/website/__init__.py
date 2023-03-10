from flask import Flask, request
from flask_restful import Api, Resource

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = "secretkey1234"
    app.config['JSON_SORT_KEYS'] = False

    api = Api(app)
    
    class Tasks_operations_by_id(Resource):
        def delete(self, id):
            from .views import session, sessionmaker, engine, Tarefa

            Session = sessionmaker(bind=engine)
            session = Session()
            
            tarefa_selecionada = session.query(Tarefa).filter_by(id=id).first()
            session.delete(tarefa_selecionada)
            session.commit()

            return {"result": f"Tarefa em id={id} deletada."}
        def patch(self, id):
            from .views import session, sessionmaker, engine, Extra, Tarefa

            Session = sessionmaker(bind=engine)
            session = Session()
            
            request2 = request.json
            conteúdo = request2["conteúdo"]

            # Id armazenada em extra:
            tarefa_selecionada = session.query(Tarefa).filter_by(id=id).first()
            tarefa_selecionada.conteúdo = conteúdo

            session.commit()
            return {"result": "tarefa modificada"}
    api.add_resource(Tasks_operations_by_id, "/tasks/<int:id>")

    from .views import views

    app.register_blueprint(views, url_prefix="/")
    return app