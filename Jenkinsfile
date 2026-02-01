pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Clonando repositorio...'
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                echo 'Instalando dependencias...'
                sh 'npm install'
            }
        }
        
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                echo 'Publicando aplicación...'
                sh 'npm start'
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline ejecutado correctamente'
        }
        failure {
            echo '❌ Pipeline falló'
        }
        always {
            cleanWs()
        }
    }
}
