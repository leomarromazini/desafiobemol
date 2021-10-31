from app.configs.database import db
from flask import current_app
from re import fullmatch
from dataclasses import dataclass
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import validates
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from app.exeptions.exeptions import InvalidZipCode
import re
import requests
@dataclass
class UserModel(db.Model):

    id: int
    name: str
    cell_phone: str
    email: str
    city: str
    state: str
    street: str
    number: str
    complement: str
    zip_code: str

    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    cell_phone = Column(String(14), nullable=False)
    email = Column(String(211), nullable=False, unique=True)
    password_hash = Column(String(511), nullable=True)
    city = Column(String(50), nullable=False)
    state = Column(String(50), nullable=False)
    street = Column(String(50), nullable=False)
    number = Column(String(50), nullable=False)
    complement = Column(String(50))
    zip_code = Column(String(9), nullable=False)


    @validates('cell_phone')
    def validate_phone(self, key, cell_phone):
        regex = "\(\d{2}\)\d{5}\-\d{4}"
        valid_phone = fullmatch(regex, cell_phone)

        if not valid_phone:
            raise ValueError
        
        return cell_phone

    @validates('zip_code')
    def validate_phone(self, _, zip_code):
        regex = "\d{5}\-\d{3}"
        valid_zip_code = re.fullmatch(regex, zip_code)

        if not valid_zip_code:
            raise InvalidZipCode({"Error": 'CEP enviado está incorreto, deve estar no formato xxxxx-xxx.'})

        request = requests.get(f'http://viacep.com.br/ws/{zip_code}/json/').json()
        
        try:
            if request['erro']:
                raise InvalidZipCode({"Error": 'Cep inexistente'})
        except KeyError:
            return zip_code

    @property
    def password(self):
        raise AttributeError("Inaccessible password")

    @password.setter
    def password(self, password_to_hash):
        self.password_hash = generate_password_hash(password_to_hash)

    def verify_password(self, password_to_compare):
        return check_password_hash(self.password_hash, password_to_compare)

    @classmethod
    def create_new_user(cls, **data):
        password_to_hash = data.pop('password')

        new_user = cls(**data)
        print(new_user)
        new_user.password = password_to_hash

        session = current_app.db.session
        session.add(new_user)
        session.commit()

        return new_user
    
    @classmethod
    def login(cls, **data):
        found_user = cls.query.filter(UserModel.name == data['name']).first()
        print((data['password']))
        if not found_user:
            raise IndexError

        if found_user.verify_password(data['password']):
            
            acess_token = create_access_token(identity=found_user)
            return acess_token
        else:
            raise ValueError('invalid password')
