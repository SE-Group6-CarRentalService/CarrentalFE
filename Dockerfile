# base image  
FROM python:3.10   
# setup environment variable  
ENV DockerHOME=/home/app/webapp  

# set work directory  
RUN mkdir -p $DockerHOME  

# where your code lives  
WORKDIR $DockerHOME  

# set environment variables  
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1  

# copy whole project to your docker home directory. 
COPY . $DockerHOME  
# run this command to install all dependencies  
RUN conda install -r requirements.txt  
# port where the Django app runs  
EXPOSE 8950  

VOLUME [ "/data" ]
# start server  
CMD python manage.py runserver  