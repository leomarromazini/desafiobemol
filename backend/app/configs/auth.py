from app.models.user_model import UserModel
from flask_httpauth import HTTPTokenAuth


auth = HTTPTokenAuth(scheme='Bearer')


@auth.verify_token
def verify_token(api_key):
    user = UserModel.query.filter_by(api_key=api_key).first()

    if user == None:
        return False
    return True