---
title: "Set up Jenkins CI in Docker Container & Run Your Tests Inside Their Own Container"
date: 2020-5-3
---

### So you want to start testing your code? Good choice. Testing is a great way to make sure nothing breaks in deployment, and Jenkins makes it easy to automate this process.

![card](/media/jenkins-in-docker-and-tests-inside-own-container/card.jpeg)

In this tutorial you will learn how to set up Jenkins, so it runs inside a Docker container, and test your projects inside their own container. This is useful if you want to test your application in its own custom environment, isolated from Jenkins.

![illustration](/media/jenkins-in-docker-and-tests-inside-own-container/illustration.jpeg)

**Why run Jenkins in a Docker container?**

Having your Jenkins setup containerized makes it portable and quick to set up. Whether you are running Mac, Windows or Linux running Jenkins inside Docker is easy and straightforward.

**Why run my project in a Docker container within Jenkins?**

This is definitely not always necessary but can be an advantage if you want to specify your exact testing situation.

If your project is meant to be deployed using Docker it is important that your testing environment completely matches your production environment.

## Setting up Jenkins

Here we are going to need Docker to be installed inside our Jenkins container, so we create a Dockerfile that builds on top of the official Jenkins image. Put this in a file called *Dockerfile_jenkins_setup*

```dockerfile
FROM jenkins/jenkins:lts

USER root

RUN apt-get update && \
apt-get -y install apt-transport-https \
     ca-certificates \
     curl \
     gnupg2 \
     software-properties-common && \
curl -fsSL https://download.docker.com/linux/$(. /etc/os-release; echo "$ID")/gpg > /tmp/dkey; apt-key add /tmp/dkey && \
add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/$(. /etc/os-release; echo "$ID") \
   $(lsb_release -cs) \
   stable" && \
apt-get update && \
apt-get -y install docker-ce

RUN apt-get install -y docker-ce

RUN usermod -a -G docker jenkins

USER jenkins
```

You could also pull the image from the [image source](https://hub.docker.com/r/gustavoapolinario/jenkins-docker/dockerfile?ref=hackernoon.com)

**Building the image:**

```bash
docker build -f DockerfileJenkinsSetup -t gustavoapolinario/jenkins-docker .
```

**Running the container:**

```bash
docker run -d -p 8080:8080 \ 
-v /var/run/docker.sock:/var/run/docker.sock \
 -v /var/jenkins_home:/var/jenkins_home \ # Optional
 --name Jenkins_Docker gustavoapolinario/jenkins-docker

# One line:
docker run -d -p 8080:8080 -v /var/run/docker.sock:/var/run/docker.sock -v /var/jenkins_home:/var/jenkins_home --name Jenkins_Docker gustavoapolinario/jenkins-docker
```

Now visit *localhost:8080*

Jenkins will ask you for a password. You can retrieve it by running:

```bash
docker exec Jenkins_Docker cat /var/jenkins_home/secrets/initialAdminPassword
```

Just a few more things to set up Jenkins:
 - Click: Install suggested plugins
 - Fill in your information

## The app

For this project I have created a very simple Node app. You can find the full source code at: [https://github.com/carltheperson/Jenkins-Docker-Example.git](https://github.com/carltheperson/Jenkins-Docker-Example.git)
I have also written a simple test using Mocha and Chai. The test just tests if the app returns with status 200. I test my app using *npm test*

```javascript
const express = require("express");
const app = express();
const port =  process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.status(200);
    res.send("Cool beans");
});

app.listen(port, () => { 
    console.log(`App is up and listening on port ${port}`);
});

module.exports = app;
```

Let’s pretend that this app is going to be deployed on a server in a Docker container. So, I create a Dockerfile based on the Node image. Note that I am setting the app directory to an environment variable.

```dockerfile
FROM node:latest

ENV PROJECTDIR /nodeApp

WORKDIR $PROJECTDIR

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

## The pipeline

We are now going to create the pipeline that will build our Docker image and run our tests inside.
 - On the Jenkins homepage, Click: New Item
 - Pick Pipeline
 - Select: Pipeline script from SCM
 - Put in your git repository.
 - Add the path to your Jenkinsfile

![pipeline image](/media/jenkins-in-docker-and-tests-inside-own-container/pipeline.jpeg)

Now we should be good to go. When we ask Jenkins to build our app, it will clone our repository and execute our Jenkinsfile.

Here is the Jenkinsfile I am using. It will build an image from the files in the Git repository using our Dockerfile. It will then enter the image and extract the *PROJECTDIR* environment variable that we defined earlier. Then it copies everything from that directory into our workspace. This is not always necessary, and we could just run the tests directly with the files from the repository, but I like doing it because the project directory might look different depending on what you specified in your Dockerfile.
Our pipeline will then go inside the new directory and run the test. At the end it will remove the Docker image, so you don't get a bunch of images from old builds taking up space.

```groovy
pipeline {
    environment {
        // This registry is important for removing the image after the tests
        registry = "yourname/nodeapp"
    }
    agent any
    stages {
        stage("Test") {
            steps {
                script {
                    // Building the Docker image
                    dockerImage = docker.build registry + ":$BUILD_NUMBER"

                    try {
                        dockerImage.inside() {
                            // Extracting the PROJECTDIR environment variable from inside the container
                            def PROJECTDIR = sh(script: 'echo \$PROJECTDIR', returnStdout: true).trim()

                            // Copying the project into our workspace
                            sh "cp -r '$PROJECTDIR' '$WORKSPACE'"

                            // Running the tests inside the new directory
                            dir("$WORKSPACE$PROJECTDIR") {
                                sh "npm test"
                            }
                        }

                    } finally {
                        // Removing the docker image
                        sh "docker rmi $registry:$BUILD_NUMBER"
                    }
                }
            }
        }
    }
}
```

## Building

We can now try building our app (just select your item and click build) and it should fail or succeed depending on if the tests we’ve written pass.
If something unexpected happens you can click on the build and look at the console output. This should give you a clue as to what happened. 

If your build fails saying something like *“Got permission denied while trying to connect to the Docker daemon socket”*, then the GID of the Docker group in the container does not match the one on your machine (some problems with permissions). What worked for me on Ubuntu was:

```bash
docker exec --user root Jenkins_Docker groupmod -g `cut -d: -f3 < <(getent group docker)` docker
docker restart Jenkins_Docker
```

## Conclusion

You should now be able to set up Jenkins in a Docker container and create a pipeline that builds an image and runs tests inside it. Hopefully you will get into the habit of continuous integration, and I am sure it will improve your workflow. 