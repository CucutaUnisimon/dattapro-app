pipeline {
  agent { label 'remote-java-server-83' }

  environment {
    DEPLOY_PATH = '/var/www/dattapro'
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
          sudo mkdir -p ${DEPLOY_PATH}
          sudo rm -rf ${DEPLOY_PATH}/*
          sudo cp -r dist/* ${DEPLOY_PATH}/
          sudo chown -R unisimon:unisimon ${DEPLOY_PATH} || sudo chown -R www-data:www-data ${DEPLOY_PATH} || true
          sudo chmod -R 755 ${DEPLOY_PATH}
          sudo systemctl restart nginx
        '''
      }
    }
  }
}