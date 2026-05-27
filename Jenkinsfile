pipeline {
  agent { label 'remote-java-server-83' }

  environment {
    DEPLOY_PATH = '/home/integracion/projects/dattapro'
    VITE_API_URL = 'http://192.168.3.83/api'
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Install') {
      steps {
          sh '''
            node -v
            npm -v
            npm ci
          '''
      }
    }

    stage('Build') {
      steps {
          sh '''
            npm run build
            test -d dist
          '''
      }
    }

    stage('Deploy (local)') {
      steps {
        sh '''
          set -e
          rsync -r --delete --no-group --no-perms --omit-dir-times dist/ /home/integracion/projects/dattapro/
          sudo systemctl restart nginx
        '''
      }
    }
  }
}