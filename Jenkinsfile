pipeline {
  agent { label 'remote-java-server-83' }

  environment {
    STAGING_PATH = '/home/integracion/projects/dattapro-staging'
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
        sshagent(['ac0b1b39-b6e7-49fb-b6a4-fbfaa327d14c']) {
          sh '''
            set -e
            
            # 1. Prepare staging folder
            ssh -o StrictHostKeyChecking=no integracion@192.168.3.83 "
              sudo mkdir -p ${STAGING_PATH}
              sudo chown -R integracion:integracion ${STAGING_PATH} || sudo chown -R integracion ${STAGING_PATH}
              sudo rm -rf ${STAGING_PATH}/*
            "
            
            # 2. Copy compiled files to staging
            scp -o StrictHostKeyChecking=no -r dist/* integracion@192.168.3.83:${STAGING_PATH}/
            
            # 3. Copy to production, set permissions, and restart nginx
            ssh -o StrictHostKeyChecking=no integracion@192.168.3.83 "
              sudo mkdir -p ${DEPLOY_PATH}
              sudo rm -rf ${DEPLOY_PATH}/*
              sudo cp -r ${STAGING_PATH}/* ${DEPLOY_PATH}/
              sudo chown -R unisimon:unisimon ${DEPLOY_PATH} || sudo chown -R www-data:www-data ${DEPLOY_PATH} || true
              sudo chmod -R 755 ${DEPLOY_PATH}
              sudo systemctl restart nginx
            "
          '''
        }
      }
    }
  }
}