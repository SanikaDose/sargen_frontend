pipeline {
  agent any

  environment {
    GIT_SSH_COMMAND = "ssh -o StrictHostKeyChecking=no"
    PROJECT_KEY = 'sargen_frontend'
  }

  stages {

    stage('Clean Workspace') {
      steps {
        cleanWs()
      }
    }

    stage('Checkout') {
      steps {
        sshagent(credentials: ['gitea-ssh']) {
          checkout scm
        }
      }
    }


    stage('Mirror to GitHub') {
      steps {
        sshagent(credentials: ['github-ssh']) {
          sh '''
            git remote add github git@github.com:your-username/sargen_frontend.git || true
            git push github HEAD:development --force
          '''
        }
      }
    }
  }

  post {
    failure {
      echo '❌ Build failed...'
    }
    success {
      echo '✅ Build succeeded...'
    }
  }
}
