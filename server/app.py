from sanic import Sanic
from sanic.exceptions import NotFound, FileNotFound
# from sanic_cors import CORS

from database_engine import DataBaseEngine
from operational import BaseView, Interaction, User
from scripts import UserQueries, DummyTicket, TicketQueries

db = DataBaseEngine()
app = Sanic(__name__)


@app.exception(NotFound, FileNotFound)
def ignore_404s(request, exception):
    return BaseView.response_status(404)


@app.middleware('response')
def cors_headers(request, response):
    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Accept, Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    }
    if response.headers is None or isinstance(response.headers, list):
        response.headers = cors_headers
    elif isinstance(response.headers, dict):
        response.headers.update(cors_headers)
    return response

@app.route("/", methods=['GET'])
def index(request):
    return BaseView.response_status(200, {'hello': 'hello'})


@app.route('/api/news', methods=['GET'])
def news(request):
    new_users = db.check_users()
    new_interactions = db.check_interactions()

    return BaseView.response_status(200, {
        'users': new_users, 'interactions': new_interactions
    })

@app.route('/api/news/update', methods=['POST', 'OPTIONS'])
def news_update(request):
    if request.method == 'OPTIONS':
        return BaseView.response_status(200, {})
    new_users = db.pull_users()
    new_interactions = db.pull_interactions()

    return BaseView.response_status(200, {
        'users': new_users, 'interactions': new_interactions
    })


@app.route('/api/send_user', methods=['POST', 'OPTIONS'])
def send_user(request):
    if request.method == 'OPTIONS':
        return BaseView.response_status(200, {})
    data = request.json
    return BaseView.response_status(UserQueries.register(data))


@app.route('/api/gen_tickets/<to_create>', methods=['GET', 'OPTIONS'])
def gen_tickets(request, to_create):
    if request.method == 'OPTIONS':
        return BaseView.response_status(200, {})
    # to_create = 5
    for i in range(int(to_create)):
        print(f'Record {i + 1} of {to_create}')
        TicketQueries.register(vars(DummyTicket()))
    print('Done.')
    return BaseView.response_status(201)


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
