pipeline {
agent {
    docker {
      image 'docker:24.0.5-dind'
      args '-v /var/run/docker.sock:/var/run/docker.sock'
    }
  }
  environment {
    DOCKER_HUB_USER = 'pranshu02'
    IMAGE_BACKEND = 'pranshu02/backend'
    IMAGE_FRONTEND = 'pranshu02/frontend'
    KUBECONFIG_CREDENTIAL_ID = 'kubeconfig-id-in-jenkins'
  }

  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/pranshu00000/vidverse.git'
        
      }
    }

    stage('Build Backend Image') {
      steps {
        dir('backend') {
          script {
            docker.build("${IMAGE_BACKEND}:latest")
          }
        }
      }
    }

    stage('Build Frontend Image') {
      steps {
        dir('frontend') {
          script {
            docker.build("${IMAGE_FRONTEND}:latest")
          }
        }
      }
    }

    stage('Push Images') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
          sh """
            echo "$PASS" | docker login -u "$USER" --password-stdin
            docker push ${IMAGE_BACKEND}:latest
            docker push ${IMAGE_FRONTEND}:latest
          """
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        withCredentials([file(credentialsId: 'kubeconfig-id-in-jenkins', variable: 'KUBECONFIG')]) {
          sh """
            export KUBECONFIG=$KUBECONFIG
            kubectl apply -f k8s/
          """
        }
      }
    }
  }
}
