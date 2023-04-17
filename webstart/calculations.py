def permissions(guilds):
    return [
        guild for guild in guilds if int(guild.permissions) & 0x20 == 0x20
    ]  # returns True if User has Manage Server privilages


def iscasesin(guilds, Client_guilds):
    return [
        guild for guild in guilds if guild.id in [guild.id for guild in Client_guilds]
    ]  # returns servers if server is in discord bot server list


def updateLD(Client, LD_db, db, time):
    LD_db.get_leaderboard()
    if time.time() - LD_db.last_update["time"] < 86400:
        return [item for item in LD_db.leaderboard], True
    db.get_leaderboard()
    leaderboard = []
    for id in db.leaderboard[:10]:
        user_data = db.user_data.find_one({"_id": id[0]})
        if len(user_data["inventory"]) > 0:
            leaderboard.append(
                (
                    Client.users.get_user(id[0]).username,
                    id[1],
                    id[2],
                    Client.users.get_user(id[0]).avatar_url,
                    user_data["inventory"][0]["name"],
                )
            )
        else:
            leaderboard.append(
                (
                    Client.users.get_user(id[0]).username,
                    id[1],
                    id[2],
                    Client.users.get_user(id[0]).avatar_url,
                )
            )
    return leaderboard, True


def get_user_inv(db, datetime, id, LD_db):
    LD_db.get_leaderboard()
    user = LD_db.Leaderboard.find_one({"_id": id})
    user["rank"] = [user for user in LD_db.leaderboard].index(user) + 1
    user["inventory"] = [
        {
            "name": item["name"],
            "float": item["float"],
            "image_url": db.skin_data["skins"][item["name"]]["image_url"],
            "price": db.skin_data["skins"][item["name"]]["price"] / 100,
        }
        for item in user["inventory"]
    ]
    user["balance"] = user["balance"] / 100
    user["networth"] = user["networth"] / 100
    user["return"] = round(
        (user["stats"]["total_return"] / user["stats"]["total_spent"]) * 100, 2
    )
    user["join_date"] = datetime.utcfromtimestamp(user["join_date"]).strftime(
        "%Y-%m-%d"
    )
    return user  # returns user inventory with image_url as well as name and float
