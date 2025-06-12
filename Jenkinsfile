pipeline {
  agent any
  environment {
    GITEA_REPO = 'git@gitea:tarjan-1/sargen_frontend.git'
    GITHUB_REPO = 'git@github.com:elansol/sargen_frontend.git'
    SONAR_PROJECT_KEY = 'sargen_frontend'
  }
  stages {
    stage('Checkout') {
      steps {
        sshagent(credentials: ['gitea-ssh']) {
          sh 'git clone --depth 1 $GITEA_REPO repo'
        }
      }
    }
    stage('SonarQube Analysis') {
      steps {
        dir('repo') {
          withSonarQubeEnv('SonarQube') {
            sh './gradlew sonarqube' // or `sonar-scanner` for JS
          }
        }
      }
    }
    stage('Quality Gate') {
      steps {
        timeout(time: 2, unit: 'MINUTES') {
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
}
