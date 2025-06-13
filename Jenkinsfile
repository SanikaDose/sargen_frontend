pipeline {
  agent any

  options {
    skipDefaultCheckout() // ✅ allowed here
    // ❌ cleanWs() not allowed here
  }

  environment {
    SONARQUBE_SCANNER = 'SonarLocal' // Must match what you set in Jenkins
    SONARQUBE_SERVER  = 'SonarQubeServer'    // Must match the server name in Jenkins
    GITEA_REPO = 'git@gitea:tarjan-1/sargen_frontend.git'
    GITHUB_REPO = 'git@github.com:elansol/sargen_frontend.git'
    SONAR_PROJECT_KEY = 'sargen_frontend'
  }

  stages {
    stage('Clean Workspace') {
      steps {
        cleanWs() // ✅ allowed here
      }
    }

    stage('Checkout') {
      steps {
        sshagent(credentials: ['gitea-ssh']) {
          sh '''
            rm -rf repo
            git clone --depth 1 ${GITEA_REPO} repo
          '''
        }
      }
    }

    stage('SonarQube Analysis') {
      steps {
        dir('repo') {
          withSonarQubeEnv('SonarQubeServer') {
            sh '''
              sonar-scanner \
                -Dsonar.projectKey=sargen_frontend \
                -Dsonar.projectName=sargen_frontend \
                -Dsonar.sources=. \
                -Dsonar.host.url=https://cicd.elansoltech.in/sonar
            '''
          }
        }
      }
    }

    stage('Quality Gate') {
      steps {
        timeout(time: 10, unit: 'MINUTES') {
          waitForQualityGate abortPipeline: true
        }
      }
    }

    stage('Mirror to GitHub') {
      steps {
        sshagent(credentials: ['github-ssh']) {
          sh '''
            cd repo
            git remote add github $GITHUB_REPO || true
            git push --mirror github
          '''
        }
      }
    }
  }

  post {
    success {
      echo '✅ Pipeline completed successfully.'
    }
    failure {
      echo '❌ Pipeline failed.'
    }
  }
}
