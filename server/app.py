from sanic import Sanic
from sanic.exceptions import NotFound, FileNotFound
from sanic.response import html, redirect
# from sanic_cors import CORS

from operational import User

app = Sanic(__name__)


@app.exception(NotFound, FileNotFound)
def ignore_404s(request, exception):
    return BaseController.response_status(404)


@app.middleware('response')
async def cors_headers(request, response):
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

@app.route("/", methods=['GET', 'POST'])
async def index(request):
    return json({'hello': 'hello'})


app.add_route(User.as_view(), '/api/user')
app.add_route(User.as_view(), '/api/user/<id>')


if __name__ == '__main__':
    app.run(
        debug=True,
        host='0.0.0.0',
        port=8000,
        workers=1,
    )