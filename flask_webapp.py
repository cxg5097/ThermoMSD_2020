import sqlite3, time

import flask
from flask import after_this_request

app = flask.Flask(__name__)
app.config["DEBUG"] = True


@app.route('/send_measure', methods=['POST'])
def post_to_sqlite_db():
    connection = sqlite3.connect("sensordata1.db")
    c = connection.cursor()
    data = flask.request.get_json()
    print("Adding data: {}".format(data))
    c.execute("INSERT INTO sensor_data VALUES ('{}', '{}')".format(data["time"], data["Voltage"]))
    connection.commit()
    connection.close()
    return "Done!"

@app.route('/get_result', methods=['GET'])
def get_results():
    @after_this_request
    def add_header(response):
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response

    connection = sqlite3.connect("Mouse_Temp.dbf")
    c = connection.cursor()
   # query_time = time.time() - 30
    #c.execute("SELECT * FROM sensor_data WHERE timestamp >= {}".format(query_time))
    c.execute("SELECT * FROM sensor_data LIMIT 100000")
    result = c.fetchall()
    connection.close()
    split_result = list(zip(*result))
    time_samples = list(split_result[0])
    voltage_samples = list(split_result[1])
    payload = {
        "time": time_samples,
        "voltage": voltage_samples
    }
    return payload


def create_table():
    print("Starting SQLite Database Instance")
    connection = sqlite3.connect("sensordata1.db")
    c = connection.cursor()
    c.execute("CREATE TABLE IF NOT EXISTS sensor_data (timestamp real, voltage real);")
    connection.commit()
    connection.close()


if __name__ == "__main__":
    create_table()
    app.run(host="192.168.137.1", port=31415, use_reloader=False)