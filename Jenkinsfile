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
    // Add timeout settings for Docker operations
    COMPOSE_HTTP_TIMEOUT = '300'
    DOCKER_CLIENT_TIMEOUT = '300'
  }
  
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    
    stage('Verify Docker') {
      steps {
        script {
          sh '''
            echo "Verifying Docker installation..."
            docker --version
            docker info
            echo "Docker verification complete"
          '''
        }
      }
    }
    
    stage('Build Backend Image') {
      steps {
        dir('backend') {
          script {
            try {
              sh '''
                echo "Building backend image..."
                mkdir -p $HOME/.docker && chmod 755 $HOME/.docker
                docker build -t ${IMAGE_BACKEND}:${BUILD_NUMBER} .
                docker tag ${IMAGE_BACKEND}:${BUILD_NUMBER} ${IMAGE_BACKEND}:latest
                echo "Backend image built successfully"
              '''
            } catch (Exception e) {
              error "Failed to build backend image: ${e.getMessage()}"
            }
          }
        }
      }
    }
    
    stage('Build Frontend Image') {
      steps {
        dir('nextjsfrontend') {
          script {
            try {
              sh '''
                echo "Building frontend image..."
                docker build -t ${IMAGE_FRONTEND}:${BUILD_NUMBER} .
                docker tag ${IMAGE_FRONTEND}:${BUILD_NUMBER} ${IMAGE_FRONTEND}:latest
                echo "Frontend image built successfully"
              '''
            } catch (Exception e) {
              error "Failed to build frontend image: ${e.getMessage()}"
            }
          }
        }
      }
    }
    
    stage('Test Images') {
      steps {
        script {
          sh '''
            echo "Verifying built images..."
            docker images | grep ${IMAGE_BACKEND}
            docker images | grep ${IMAGE_FRONTEND}
            echo "Image verification complete"
          '''
        }
      }
    }
    
    stage('Push Images') {
      steps {
        script {
          withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
            retry(3) {
              sh '''
                echo "Logging into Docker Hub..."
                echo "$PASS" | docker login -u "$USER" --password-stdin
                
                echo "Pushing backend image..."
                docker push ${IMAGE_BACKEND}:${BUILD_NUMBER}
                docker push ${IMAGE_BACKEND}:latest
                
                echo "Pushing frontend image..."
                docker push ${IMAGE_FRONTEND}:${BUILD_NUMBER}
                docker push ${IMAGE_FRONTEND}:latest
                
                echo "All images pushed successfully"
              '''
            }
          }
        }
      }
    }
    
    stage('Deploy to Kubernetes') {
      when {
        anyOf {
          branch 'main'
          branch 'master'
        }
      }
      steps {
        script {
          withCredentials([file(credentialsId: 'kubeconfig-id-in-jenkins', variable: 'KUBECONFIG')]) {
            sh '''
              echo "Deploying to Kubernetes..."
              export KUBECONFIG=$KUBECONFIG
              
              # Verify kubectl connection
              kubectl cluster-info
              
              # Apply Kubernetes manifests
              if [ -d "k8s" ]; then
                kubectl apply -f k8s/
                
                # Wait for deployments to be ready
                kubectl rollout status deployment/backend-deployment --timeout=300s || true
                kubectl rollout status deployment/frontend-deployment --timeout=300s || true
                
                echo "Deployment completed"
              else
                echo "k8s directory not found, skipping deployment"
              fi
            '''
          }
        }
      }
    }
  }
  
  post {
    always {
      script {
        sh '''
          echo "Cleaning up Docker resources..."
          docker logout || true
          docker image prune -f || true
          docker system prune -f || true
          echo "Cleanup completed"
        '''
      }
    }
    
    success {
      echo 'Pipeline completed successfully! 🎉'
      script {
        sh '''
          echo "=== Build Summary ==="
          echo "Build Number: ${BUILD_NUMBER}"
          echo "Images Built:"
          echo "  - ${IMAGE_BACKEND}:${BUILD_NUMBER}"
          echo "  - ${IMAGE_FRONTEND}:${BUILD_NUMBER}"
          echo "===================="
        '''
      }
    }
    
    failure {
      echo 'Pipeline failed! ❌ Check the logs above for details.'
    }
    
    unstable {
      echo 'Pipeline completed with warnings ⚠️'
    }
  }
}