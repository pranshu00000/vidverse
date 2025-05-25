pipeline {
  agent {
    docker {
      image 'docker:24.0.5-cli'
      args '-v /var/run/docker.sock:/var/run/docker.sock -u root --privileged'
    }
  }
  environment {
    DOCKER_HUB_USER = 'pranshu02'
    IMAGE_BACKEND = 'pranshu02/backend'
    IMAGE_FRONTEND = 'pranshu02/frontend'
    KUBECONFIG_CREDENTIAL_ID = 'kubeconfig-id-in-jenkins'
    DOCKER_HOST = 'unix:///var/run/docker.sock'
    DOCKER_BUILDKIT = '1'
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
            // Create docker directory with proper permissions
            sh 'mkdir -p $HOME/.docker && chmod 755 $HOME/.docker'
            
            // Build the image using shell command for better control
            sh "docker build -t ${IMAGE_BACKEND}:latest ."
          }
        }
      }
    }
    stage('Build Frontend Image') {
      steps {
        dir('frontend') {
          script {
            sh "docker build -t ${IMAGE_FRONTEND}:latest ."
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
  post {
    always {
      // Clean up docker images to save space
      sh '''
        docker image prune -f || true
        docker system prune -f || true
      '''
    }
    failure {
      echo 'Pipeline failed! Check the logs above for details.'
    }
    success {
      echo 'Pipeline completed successfully!'
    }
  }
}