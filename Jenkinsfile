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
        sshagent (credentials: ['contabo-ssh']) {
          sh '''
            echo "🧠 Loading NVM..."
            export NVM_DIR="$HOME/.nvm"
            [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
            nvm use 22

            echo "📁 Changing to deployment directory..."
            cd /var/www/sargen_frontend

            echo "🔄 Pulling latest code..."
            git fetch origin production
            git reset --hard origin/production

            echo "📦 Installing dependencies..."
            rm -rf node_modules package-lock.json .next
            npm install

            echo "🏗️ Building project..."
            npm run build

            echo "🚀 Restarting app..."
            pm2 delete sargen_frontend || true
            PORT=3000 pm2 start ecosystem.config.js --name sargen_frontend
            pm2 save

            echo "🔁 Reloading NGINX..."
            nginx -t && systemctl reload nginx

            echo "✅ Deployment completed"
          '''
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