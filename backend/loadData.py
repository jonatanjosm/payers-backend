# -*- coding: utf-8 -*-
# Encoding: UTF-8

from logging import log
import requests
import xmltodict
import os
from dotenv import load_dotenv
import pymongo
import sys
from datetime import datetime

def extractTeams(obj):
    print ("[LOG-INFO] Extrayendo los equipos")
    teams = []
    for team in obj:
        newTeam = {
            "id": team['@id'],
            "nombre": team['@nombre'],
            "sigla": team['@sigla'],
            "paisId": team['@paisId'],
            "paisNombre": team['@paisNombre'],
            "tipo": team['@tipo'],
            "cantJugadores": team['jugadores']['@cant']
        }
        teams.append(newTeam)
    return teams

def extractPlayers(obj):
    print ("[LOG-INFO] Extrayendo los jugadores")
    try:
        players = []
        for team in obj:
            for player in team['jugadores']['jugador']:

                birthDate = player['fechaNacimiento'] if player['fechaNacimiento'] != None else "1900-01-01"

                birthTime = player['horaNacimiento'] if player['horaNacimiento'] != None else "00:00:00"

                age = int(player['edad']) if player['edad'] != None else 0
                weight = int(player['peso']) if player['peso'] != None else 0
                height = int(player['altura']) if player['altura'] != None else 0
                number = int(player['camiseta']) if player['camiseta'] != None else 0

                if birthTime == None:
                    print ('None value')
                newPlayer = {
                    "id": player['@id'],
                    "idTeam": team['@id'],
                    "rol": player['rol']['#text'],
                    "nombre": player['nombre'],
                    "apellido": player['apellido'],
                    "nombreCorto": player['nombreCorto'],
                    "fechaNacimiento": datetime.strptime(birthDate + 'T' + birthTime, '%Y-%m-%dT%H:%M:%S'),
                    "horaNacimiento": birthTime,
                    "edad": age,
                    "peso": weight,
                    "altura": height,
                    "camiseta": number,
                    "pais": player['pais'],
                }
                players.append(newPlayer)
        return players
    except Exception as e:
        print("[LOG-ERROR] Hubo un error extrayendo los jugadores")
        print(e)

def getData():
    try:
        print ("[LOG-INFO] Cargando datos del XML")
        url = os.getenv('XML_DATA')
        headers = {'Content-Type': 'text/xml; charset=utf-8',  'Accept': 'text/xml', 'Accept-Encoding': 'gzip, deflate, br'}

        response = requests.get(url, headers = headers)

        xmlData = response.content
        #print(xmlData)
        obj = xmltodict.parse(xmlData, encoding='utf-8')
        
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

def insertData(db, collection, data_):
    try:
        print ("[LOG-INFO] Insertando en la base de datos")
        ids = db[collection].insert_many(data_).inserted_ids
        print ("[LOG-INFO] Los datos han sido insertados ")
        return ids
    except Exception as e:
        print ("[LOG-ERROR] Hubo un error al insertar en la base de datos")
        print (e)
        return None

def main():
    try:
        load_dotenv()

        fanatiz_db = connectMongoDB() 
        if fanatiz_db == None:
            return None
            
        data = getData()

        if data == None:
            return None
        
        teams = extractTeams(data)
        players = extractPlayers(data)

        idsInsertTeams = insertData(fanatiz_db,"teams", teams)
        if idsInsertTeams == None:
            return None

        idsInsertPlayers = insertData(fanatiz_db,"players", players)
        if idsInsertPlayers == None:
            return None

    except Exception as e:
        print("[LOG-ERROR] Hubo un error al intentar cargar los datos a la BD")
        print (e)
        return None

if __name__ == '__main__':
    print ("[LOG-INFO] Iniciando proceso")
    sys.exit(main())