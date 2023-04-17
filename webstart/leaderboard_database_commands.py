import os
import pymongo
import certifi
from pymongo.collection import Collection

# MongoDB collections
Leaderboard: Collection
Last_update: Collection


mongo_client: pymongo.MongoClient

leaderboard = []
last_update = 0


# update the leaderboard
def get_leaderboard():
    global leaderboard, last_update
    last_update = Last_update.find_one({"_id": 1})
    leaderboard = Leaderboard.find().sort("networth", pymongo.DESCENDING)


def init():
    global mongo_client, Leaderboard, Last_update

    # try read mongodb database password from database_pass.txt, if fails read from environment variable
    try:
        # read local bot_info
        f = open("database_pass.txt", "r")
        PASS = f.read()
    except:
        # read password from environment variable
        PASS = os.environ["MONGO_DB_PASS"]

    # connect to MongoDB
    mongo_url = f"mongodb+srv://admin:{PASS}@csgo-case-bot.odtd2un.mongodb.net/?retryWrites=true&w=majority"
    mongo_client = pymongo.MongoClient(mongo_url, tlsCAFile=certifi.where())

    print("Connected to MongoDB database!")

    # load the csgo bot database
    db = mongo_client["csgo-case-bot-LD"]

    # load all collections from the database
    Leaderboard = db["LD"]
    Last_update = db["last_update"]

    print("Loaded LeaderBoard")
