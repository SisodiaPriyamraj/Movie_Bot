from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
from dotenv import load_dotenv

load_dotenv()

uri = f'mongodb+srv://{os.getenv("MONGOUSER")}:{os.getenv("MONGOPW")}@moivebot.tfytve8.mongodb.net/?retryWrites=true&w=majority'
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

def connect():
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(e)

