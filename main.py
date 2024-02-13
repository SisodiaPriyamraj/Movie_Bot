from flask import Flask, jsonify, request
from flask_cors import CORS
import asyncio
from scraper import *
from config import *
import database
import utils

app = Flask(__name__)
cors = CORS(app)

websites = [hdmovies4u_boo(), mkvcinemas_foo(), moviesmod_dev()]

@app.route('/api/hello', methods=['GET'])
def hello():
    return "Hello"

@app.route('/api/search', methods=['POST'])
async def search_handler():
    data = request.get_json()

    query = data["query"]
    results = []
    for w in websites:
        results.extend(await w.search(query))

    results = utils.search_confidence(query, results)

    return jsonify({"res": results[:10]})

@app.route('/api/download', methods=['POST'])
async def download_handler():
    data = request.get_json()

    query = data["query"]
    results = []
    async with ClientSession() as session:
        html = await scraper.fetch(query, session)
        for w in websites:
            if w.url == query[:len(w.url)]:
                results.extend(await w.download(html))

        return jsonify({"res": results})


if __name__ == '__main__':
    database.connect()
    loop = asyncio.get_event_loop()
    loop.run_until_complete(loop.run_until_complete(app.run(host='0.0.0.0', port=5000)))
    loop.run_forever()
