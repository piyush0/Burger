FROM python:3.7

# Install app
ADD Makefile requirements.txt /burger/
WORKDIR /burger
RUN pip install -q --upgrade pip
RUN pip install -q gunicorn
RUN make install

# Add repo contents to image
ADD . /burger/

CMD gunicorn --bind 0.0.0.0:5000 manage:app