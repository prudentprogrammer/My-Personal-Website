from flask import Flask, render_template, url_for
import datetime
import csv
from collections import defaultdict

app = Flask(__name__)

@app.route('/')
@app.route('/index')
def index():
  return render_template('index.html')

@app.route('/experience')
def experiences():
    return render_template('experience.html')

@app.route('/education')
def education():
    print(getClasses())
    return render_template('education.html', classes_dict=getClasses())

@app.context_processor
def getCurrentDate():
  return dict(current_date = datetime.datetime.now().strftime("%d %B %Y"))

# Helper function to extract classes taken at university
def getClasses():
    classes_dict = defaultdict(list)
    file_handler = open('static/classes.csv', 'rb')
    reader = csv.reader(file_handler)
    for row in reader:
        class_name, level = row[0].strip(), row[1].strip()
        classes_dict[level].append(class_name)
    return classes_dict

if __name__ == '__main__':
  app.run(debug = True)
