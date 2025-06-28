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
//             git push github HEAD:development --force
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
    CONTABO_HOST = '109.199.109.4'
    DEPLOY_DIR = '/var/www/sargen_frontend'
    REPO_URL = 'git@github.com:elansol/sargen_frontend.git'
  }

  stages {
    stage('Clean Workspace') {
      steps {
        cleanWs()
      }
    }

    stage('Checkout from Gitea') {
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
            ssh -o StrictHostKeyChecking=no root@${CONTABO_HOST} '
              set -e

              echo "🚀 Navigating to deployment directory..."
              cd ${DEPLOY_DIR}

              echo "🔄 Fetching latest code..."
              git fetch origin production
              git reset --hard origin/production

              echo "📦 Installing dependencies..."
              rm -rf node_modules .next
              npm install

              echo "🏗️ Building Next.js frontend..."
              npm run build

              echo "🔄 Restarting PM2 on port 3000..."
              pm2 delete ${PROJECT_KEY} || true
              PORT=3000 pm2 start npm --name "${PROJECT_KEY}" -- start
              pm2 save

              echo "✅ Deployment completed successfully"
            '
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