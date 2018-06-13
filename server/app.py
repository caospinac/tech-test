from sanic import Sanic
from sanic.exceptions import NotFound, FileNotFound
# from sanic_cors import CORS

from feed_database import DataBaseEngine
from operational import BaseView, Interaction, User

db = DataBaseEngine()
app = Sanic(__name__)


@app.exception(NotFound, FileNotFound)
def ignore_404s(request, exception):
    return BaseView.response_status(404)


@app.middleware('response')
def cors_headers(request, response):
    cors_headers = {
        'access-control-allow-origin': '*',
        'access-control-allow-headers': 'Accept, Content-Type',
        'access-control-allow-methods': '*'
    }
    if response.headers is None or isinstance(response.headers, list):
        response.headers = cors_headers
    elif isinstance(response.headers, dict):
        response.headers.update(cors_headers)
    return response

@app.route('/', methods=['GET', 'POST'])
def index(request):
    return BaseView.response_status(200, {'hello': 'hello'})


@app.route('/api/news', methods=['GET'])
def news(request):
    new_users = db.check_users()['new_count']
    new_interactions = db.check_interactions()['new_count']

    return BaseView.response_status(200, {
        'users': new_users, 'interactions': new_interactions
    })

@app.route('/api/news/update', methods=['POST'])
def news_update(request):
    new_users = db.pull_users()['new_count']
    new_interactions = db.pull_interactions()['new_count']

    return BaseView.response_status(200, {
        'users': new_users, 'interactions': new_interactions
    })


app.add_route(User.as_view(), '/api/users')
app.add_route(User.as_view(), '/api/user/<id:int>')

app.add_route(Interaction.as_view(), '/api/interactions')
app.add_route(Interaction.as_view(), '/api/interaction/<id:int>')


if __name__ == '__main__':
    app.run(
        debug=True,
        host='0.0.0.0',
        port=8000,
        workers=1,
    )