pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/tu_usuario/Integracion-C.git'
            }
        }

        stage('Install') {
            steps {
                dir('app') {
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                dir('app') {
                    sh 'npm run test'
                }
            }
        }

        stage('Coverage') {
            steps {
                dir('app') {
                    sh 'npm run coverage'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t mi-app .'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completado con éxito!'
        }
        failure {
            echo 'El pipeline falló.'
        }
    }
}