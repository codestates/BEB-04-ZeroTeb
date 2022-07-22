pipeline {
  agent any

  environment {
    MONGODB_USERNAME="${env.ZTEB_MONGODB_USERNAME}"
    MONGODB_PASSWORD="${env.ZTEB_MONGODB_PASSWORD}"
    ALLTHATNODE_API_KEY="${env.ZTEB_ALLTHATNODE_API_KEY}"
    ALLTHATNODE_BAOBAB_ENDPOINT="${env.ZTEB_ALLTHATNODE_BAOBAB_ENDPOINT}"
    JWT_SECRET_KEY="${env.ZTEB_JWT_SECRET_KEY}"
    QR_API_KEY="${env.ZTEB_QR_API_KEY}"
    KAKAO_API="${env.ZTEB_KAKAO_API}"

    KAS_ACCESS_KEY_ID="${env.ZTEB_KAS_ACCESS_KEY_ID}"
    KAS_SECRET_ACCESS_KEY="${env.ZTEB_KAS_SECRET_ACCESS_KEY}"
    KAS_AUTHORIZATION="${env.ZTEB_KAS_AUTHORIZATION}"

    PINATA_JWT="${env.ZTEB_PINATA_JWT}"
    PINATA_API_KEY="${env.ZTEB_PINATA_API_KEY}"
    PINATA_API_SECRET_KEY="${env.ZTEB_PINATA_API_SECRET_KEY}"

    OWNER_PRIVATE_KEY="${env.ZTEB_OWNER_PRIVATE_KEY}"
    OWNER_ADDRESS="${env.ZTEB_OWNER_ADDRESS}"
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
        sh "docker run -d --name zteb-server -p 18080:8080 -e MONGODB_USERNAME=${MONGODB_USERNAME} -e MONGODB_PASSWORD=${MONGODB_PASSWORD} -e ALLTHATNODE_API_KEY=${ALLTHATNODE_API_KEY} -e ALLTHATNODE_BAOBAB_ENDPOINT=${ALLTHATNODE_BAOBAB_ENDPOINT} -e JWT_SECRET_KEY=${JWT_SECRET_KEY} -e QR_API_KEY=${QR_API_KEY} -e KAKAO_API='${KAKAO_API}' -e PINATA_JWT='${PINATA_JWT}' -e KAS_ACCESS_KEY_ID='${KAS_ACCESS_KEY_ID}' -e KAS_SECRET_ACCESS_KEY='${KAS_SECRET_ACCESS_KEY}' -e KAS_AUTHORIZATION='${KAS_AUTHORIZATION}' -e NODE_OPTIONS='--openssl-legacy-provider' zteb-server:latest"
      }
    }
  }
}