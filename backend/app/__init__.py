from flask import Flask
from app.configs import env_configs, database as db, migration, jtw_auth
from app.routes import user_blueprint
from flask_cors import CORS

def create_app():

    app = Flask(__name__)

    CORS(app)
    app.config['CORS_HEADERS'] = 'Content-Type'

    jtw_auth.init_app(app)
    env_configs.init_app(app)
    db.init_app(app)
    migration.init_app(app)

    app.register_blueprint(user_blueprint.bp)

    return app