from flask import Flask, render_template, url_for
import datetime

app = Flask(__name__)

@app.route('/')
def index():
  #return 'Index Page'
  return render_template('index_page.html',
                        currentDate=getCurrentDate(),
                        description=getDescription()
                        )

@app.route('/experience')
def experiences():
    return render_template('experience.html')



def getCurrentDate():
  return datetime.datetime.now().strftime("%d %B %Y")

def getDescription():
  description = r"""
  I am an aspiring developer with a tremendous interest in software.
  After poking around with different areas in computer science and software development,
  I finally discovered my interests and dreams recently.
  The two fields that fully engage and motivate me are full stack development and data science.
  """
  return description



if __name__ == '__main__':
  app.run(debug = True)
