from flask.cli import FlaskGroup

from burger import app

cli = FlaskGroup(app)


if __name__ == "__main__":
    cli()
