from db.session import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship  


class User(Base):
    __tablename__ = 'USER'

    user_id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    first_name = Column(String)
    last_name = Column(String)
    profile_picture_url = Column(String)
    friends = Column(String)
    
    
class Friendship(Base):
    __tablename__ = 'FRIENDSHIPS'

    friendship_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, nullable=False)
    friend_id = Column(Integer, nullable=False)    

class Message(Base):
    __tablename__ = 'MESSAGE'

    message_id = Column(Integer, primary_key=True, index=True)
    from_user_id = Column(Integer, ForeignKey('USER.user_id'), nullable=False)
    to_user_id = Column(Integer, ForeignKey('USER.user_id'), nullable=False)
    content = Column(String, nullable=False)