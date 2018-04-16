from flask import Flask, render_template, url_for
import datetime

app = Flask(__name__)

@app.route('/')
@app.route('/index')
def index():
  return render_template('index.html')

@app.route('/experience')
def experiences():
    return render_template('experience.html')

@app.context_processor
def getCurrentDate():
  return dict(current_date = datetime.datetime.now().strftime("%d %B %Y"))

if __name__ == '__main__':
  app.run(debug = True)
