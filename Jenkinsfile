// pipeline {
//   agent any

//   environment {
//     GIT_SSH_COMMAND = "ssh -o StrictHostKeyChecking=no"
//     PROJECT_KEY = 'sargen_frontend'
//     CONTABO_HOST = 'YOUR_CONTABO_SERVER_IP'
//     DEPLOY_DIR = '/var/www/sargen-frontend'
//   }

//   stages {

//     stage('Clean Workspace') {
//       steps {
//         cleanWs()
//       }
//     }

//     stage('Checkout') {
//       steps {
//         sshagent(credentials: ['gitea-ssh']) {
//           checkout scm
//         }
//       }
//     }


//     stage('Mirror to GitHub') {
//       steps {
//         sshagent(credentials: ['github-ssh']) {
//           sh '''
//             git remote add github git@github.com:elansol/sargen_frontend.git || true
//             git push github HEAD:production --force
//           '''
//         }
//       }
//     }

//     stage('Deploy to Contabo') {
//       steps {
//         sshagent(credentials: ['contabo-ssh']) {
//           sh """
//             ssh -o StrictHostKeyChecking=no root@${CONTABO_HOST} << 'ENDSSH'
//               set -e

//               echo '🔄 Pulling latest frontend code...'
//               cd ${DEPLOY_DIR}
//               git pull origin production

//               echo '📦 Installing dependencies...'
//               // npm install --omit=dev
//               npm install

//               echo '🏗️ Building frontend...'
//               npm run build

//               echo '🚀 Restarting Nginx (or custom server)...'
//               systemctl restart nginx

//               echo '✅ Deployment complete.'
//             ENDSSH
//           """
//         }
//       }
//     }
//   }

//   post {
//     failure {
//       echo '❌ Build failed.'
//     }
//     success {
//       echo '✅ Build succeeded.'
//     }
//   }
// }


pipeline {
  agent any

  environment {
    GIT_SSH_COMMAND = "ssh -o StrictHostKeyChecking=no"
    PROJECT_KEY = 'sargen_frontend'
    CONTABO_HOST = '109.199.109.4'         // your Contabo IP
    DEPLOY_DIR = '/var/www/sargen-frontend'
    REPO_URL = 'git@github.com:elansol/sargen_frontend.git'
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
            git remote add github git@github.com:elansol/sargen_frontend.git || true
            git push github HEAD:production --force
          '''
        }
      }
    }

 pipeline {
  agent any

  environment {
    GIT_SSH_COMMAND = "ssh -o StrictHostKeyChecking=no"
    PROJECT_KEY = 'sargen_frontend'
    CONTABO_HOST = '109.199.109.4'         // your Contabo IP
    DEPLOY_DIR = '/var/www/sargen-frontend'
    REPO_URL = 'git@github.com:elansol/sargen_frontend.git'
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
            git remote add github git@github.com:elansol/sargen_frontend.git || true
            git push github HEAD:production --force
          '''
        }
      }
    }

    stage('Deploy to Contabo') {
      steps {
        sshagent(credentials: ['contabo-ssh']) {
          sh """
            ssh -o StrictHostKeyChecking=no root@${CONTABO_HOST} << 'ENDSSH'
              set -e

              echo '🚀 Restarting Nginx...'
              nginx -t && systemctl reload nginx

              echo '✅ Deployment completed successfully.'
            ENDSSH
          """
        }
      }
    }
  }


  post {
    failure {
      echo '❌ Build failed.'
    }
    success {
      echo '✅ Build succeeded.'
    }
  }
}
