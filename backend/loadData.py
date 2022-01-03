import requests
import xmltodict, json
import os
from dotenv import load_dotenv
import pymongo
import sys


def getData():
    try:
        print ("[LOG-INFO] Cargando datos del XML")
        url = os.getenv('XML_DATA')
        
        response = requests.get(url)

        xmlData = response.content
        obj = xmltodict.parse(xmlData)
        
        return obj['plantelEquipo']['equipo']
    except Exception as e:
        print ("[LOG-ERROR] Hubo un error al descargar el XML")  
        print (e) 
        return None

def connectMongoDB():
    try:
        print ("[LOG-INFO] Conectando a la base de datos")
        password = os.getenv('DB_PASSWORD')
        connection = os.getenv('MONGO_CONNECTION')
        dbName = os.getenv('DB_NAME')

        connection = connection.replace("<password>", password)
        connection = connection.replace("myFirstDatabase", dbName)

        client = pymongo.MongoClient(connection)
        db = client.fanatiz_db
        print(db)
        return db
    except Exception as e:
        print ("[LOG-ERROR] Hubo un error al conectarse a la base de datos")
        print (e)
        return None

def insertData(fanatiz_db, data_):
    try:
        print ("[LOG-INFO] Insertando en la base de datos")
        ids = fanatiz_db.teams.insert_many(data_).inserted_ids
        print ("[LOG-INFO] Los datos han sido insertados ")
        return ids
    except Exception as e:
        print ("[LOG-ERROR] Hubo un error al insertar en la base de datos")
        print (e)
        return None

def main():
    try:
        load_dotenv()

        client = connectMongoDB() 
        if client == None:
            return None
            
        data = getData()

        if data == None:
            return None
        
        idInsert = insertData(client, data)
        if idInsert == None:
            return None
    except Exception as e:
        print("[LOG-ERROR] Hubo un error al intentar cargar los datos a la BD")
        print (e)
        return None

if __name__ == '__main__':
    print ("[LOG-INFO] Iniciando proceso")
    sys.exit(main())