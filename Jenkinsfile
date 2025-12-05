pipeline {
    agent any

    stages {
        stage('Install dependencies') {
            steps {
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

        stage('Fix folder name (Windows capitalization)') {
            steps {
                // Por si Jenkins o Windows generaron App en vez de app
                bat '''
                if exist App (
                    rename App app
                )
                '''
            }
        }

        stage('Archive Results') {
            steps {
                archiveArtifacts artifacts: 'app/build/**', fingerprint: true
            }
        }
    }
}