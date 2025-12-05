pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Clonar el repo
                git 'https://github.com/Juanbcg/Integration'
            }
        }

        stage('Fix folder name (Windows capitalization)') {
            steps {
                // Renombrar App a app si es necesario
                bat '''
                if exist App (
                    rename App app
                )
                '''
            }
        }

        stage('Install dependencies') {
            steps {
                // Entrar a la carpeta app
                dir('app') {
                    bat 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                dir('app') {
                    bat 'npm test'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('app') {
                    bat 'npm run build'
                }
            }
        }

        stage('Archive Results') {
            steps {
                archiveArtifacts artifacts: 'app/build/**', fingerprint: true
            }
        }
    }
}