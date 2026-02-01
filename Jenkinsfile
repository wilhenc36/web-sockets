pipeline {
    agent any

    environment {
        IMAGE_NAME = "web-sockets-app"
        IMAGE_TAG  = "latest"
        CONTAINER_NAME = "web-sockets-app-container"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                url: 'https://github.com/wilhenc36/web-sockets.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                }
            }
        }

        stage('Run Container') {
            steps {
                script {
                    // Detiene y elimina el contenedor si ya existe
                    sh """
                    docker rm -f ${CONTAINER_NAME} || true
                    docker run -d \
                      --restart unless-stopped \
                      --name ${CONTAINER_NAME} \
                      -p 3000:3000 \
                      ${IMAGE_NAME}:${IMAGE_TAG}
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline ejecutado correctamente"
        }
        failure {
            echo "❌ Error en el pipeline"
        }
        cleanup {
            // Limpieza opcional
            sh "docker system prune -f || true"
        }
    }
}
