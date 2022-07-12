pipeline {
  agent any

  environment {
    MONGODB_USERNAME="${env.ZTEB_MONGODB_USERNAME}"
    MONGODB_PASSWORD="${env.ZTEB_MONGODB_PASSWORD}"
    ALLTHATNODE_API_KEY="${env.ZTEB_ALLTHATNODE_API_KEY}"
    ALLTHATNODE_BAOBAB_ENDPOINT="${env.ZTEB_ALLTHATNODE_BAOBAB_ENDPOINT}"
    JWT_SECRET_KEY="${env.ZTEB_JWT_SECRET_KEY}"
    QR_API_KEY="${env.ZTEB_QR_API_KEY}"
  }

  stages{
    stage("Lagacy Remove") {
      steps{
        script {
          try {
            sh "docker rmi -f zteb-server:latest"
          } catch (err) {
            echo "The image of zteb-server is not defined"
          }
        }
        script {
          try {
            sh "docker rm -f zteb-server"
          } catch (err) {
            echo "zteb-server is not defined"
          }
        }
      }
    }
    stage("Build") {
      steps{
        sh "docker build -t zteb-server ./"
      }
    }
    stage("RUN") {
      steps {
        sh "docker run -d --name zteb-server -p 18080:8080 -e MONGODB_USERNAME=${MONGODB_USERNAME} -e MONGODB_PASSWORD=${MONGODB_PASSWORD} -e ALLTHATNODE_API_KEY=${ALLTHATNODE_API_KEY} -e ALLTHATNODE_BAOBAB_ENDPOINT=${ALLTHATNODE_BAOBAB_ENDPOINT} zteb-server:latest"
      }
    }
  }
}