from flask import Blueprint
from app.controllers.user_controller import create_user, create_user_address, get_user_by_id, user_login

bp = Blueprint('categories_bp', __name__, url_prefix='/user')

bp.post('/signup')(create_user)
bp.post('/signin')(user_login)
bp.get('/<int:id>')(get_user_by_id)
bp.post('/address')(create_user_address)
