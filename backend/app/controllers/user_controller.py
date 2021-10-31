from flask import jsonify, request, current_app
from flask_jwt_extended.utils import get_jwt_identity
from flask_jwt_extended.view_decorators import jwt_required
from app.exeptions.exeptions import InvalidZipCode
from app.models.user_model import UserModel
from app.services.verification_functions import confirm_json_format
from sqlalchemy.exc import IntegrityError


def create_user():
    data = request.json
    valid_fields = ['name', 'cell_phone', 'email', 'password', 'city', 'state', 'street', 'number', 'complement', 'zip_code']

    try:
        confirm_json_format(valid_fields, **data)
    
        new_user = UserModel.create_new_user(**data)

        return jsonify(new_user), 201
    except KeyError as e:
        message = e.args[0]
        return {"Error": message}, 401  
    except TypeError:
        return {'Error': 'Campos inválidos'}, 409
    except ValueError:
        return {"Error": "O celular deve estar no formato (XX)xxxxx-xxxx"}, 400
    except IntegrityError:
        return {'Error': 'Email já cadastrado'}, 409
    except InvalidZipCode as e:
        return jsonify(e.args[0]), 400 

def user_login():
    data = request.get_json()
    valid_fields = ['name', 'password']

    try:
        confirm_json_format(valid_fields, **data)

        access_token = UserModel.login(**data)

        return {"access_token": access_token}, 200

    except KeyError as e:
        return {"Error": "Campos de login inválidos, envie apenas o nome e senha do usuário."}, 400
    except IndexError:
        return {"Error": "usuário não encontrado."}, 404
    except ValueError as e:
        message = e.args[0]
        return {"Error": message}, 401    
    except TypeError:
        return {'Error': 'Campos inválidos'}, 409
   


def get_user_by_id(id: int):

    user = UserModel.query.get(id)

    if not user:
        return  {"Error": "Usuário não encontrado."}, 404

  
    return jsonify(user), 200

@jwt_required()
def create_user_address():
    data = request.get_json()
    valid_fields = []
    user = get_jwt_identity()

    try:
        confirm_json_format(valid_fields, **data)
        

        user_found = UserModel.query.filter(UserModel.name == user.get('name')).first()

        if not user_found:
            raise IndexError

        new_address = UserModel.create_new_address(**data)
        address_id = {'adress_id': new_address.id}

        UserModel.update_info(user_found.name, **address_id)

        address_response = {
            'city': new_address.city, 
            'state': new_address.state, 
            'street': new_address.street, 
            'number': new_address.number, 
            'complement': new_address.complement, 
            'cep': new_address.cep
        }

        return jsonify(address_response), 201
    except IndexError:
        return {"Error": "usuário não encontrado."}, 404
    except KeyError as e:
        message = e.args[0]
        return {"Error": message}, 400
   
