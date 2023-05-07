#!/usr/bin/python3
"""
Flask App that integrates with AirBnB static HTML Template
"""
import uuid
from models import storage
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.place import Place
from os import environ
from flask import Flask, render_template
# flask setup
app = Flask(__name__)
app.url_map.strict_slashes = False



# begin flask page rendering
@app.teardown_appcontext
def close_db(error):
    """
    this method calls .close() (i.e. .remove()) on
    the current SQLAlchemy Session
    """
    storage.close()


@app.route('/100-hbnb/')
def hbnb(the_id=None):
    """
    handles request to custom template with states, cities & amentities
    """
    states = storage.all('State').values()
    amentities = storage.all('Amenity').values()
    places = storage.all('Place').values()
    users = dict([user.id, "{} {}".format(user.first_name, user.last_name)]
                 for user in storage.all('User').values())
    cache_id = (str(uuid.uuid4()))
    return render_template('100-hbnb.html',
                           states=states,
                           amentities=amentities,
                           places=places,
                           users=users,
                           cache_id=cache_id)


if __name__ == "__main__":
    """
    MAIN FLASK"""
    app.run(host='0,0,0,0', port='5000')
