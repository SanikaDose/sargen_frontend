pipeline {
  agent any

  environment {
    GIT_SSH_COMMAND = "ssh -o StrictHostKeyChecking=no"
    PROJECT_KEY = 'sargen_frontend'
    CONTABO_HOST = '109.199.109.4'
    DEPLOY_DIR = '/var/www/sargen-frontend'
    PRODUCTION_DIR = '/var/www/sargen-frontend/production'
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
              # Clean and install dependencies
              echo "🧹 Cleaning and installing dependencies..."
              cd ${DEPLOY_DIR}
              rm -rf node_modules .next
              npm install
              
              # Build application
              echo "🏗️ Building Next.js application..."
              npm run build
              
              # Prepare production directory
              echo "📦 Preparing production files..."
              mkdir -p ${PRODUCTION_DIR}
              cp -R .next/standalone/* ${PRODUCTION_DIR}/
              cp -R .next/static ${PRODUCTION_DIR}/.next/
              cp -R public ${PRODUCTION_DIR}/
              
              # Manage PM2 process
              echo "🔄 Managing PM2 process..."
              if ! command -v pm2 &> /dev/null; then
                npm install -g pm2
              fi
              
              cd ${PRODUCTION_DIR}
              pm2 delete sargen-frontend || true
              pm2 start server.js --name "sargen-frontend"
              pm2 save
              
              # Configure Nginx
              echo "🔧 Updating Nginx configuration..."
              cat > /etc/nginx/sites-available/sargen <<"NGINX_CFG"
              server {
                  listen 80;
                  server_name sargen.elansoltech.in 109.199.109.4;
                  return 301 https://\\$host\\$request_uri;
              }
              
              server {
                  listen 443 ssl;
                  server_name sargen.elansoltech.in;
                  
                  ssl_certificate /etc/letsencrypt/live/sargen.elansoltech.in/fullchain.pem;
                  ssl_certificate_key /etc/letsencrypt/live/sargen.elansoltech.in/privkey.pem;
                  include /etc/letsencrypt/options-ssl-nginx.conf;
                  ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
                  
                  location / {
                      proxy_pass http://localhost:3000;
                      proxy_http_version 1.1;
                      proxy_set_header Upgrade \\$http_upgrade;
                      proxy_set_header Connection 'upgrade';
                      proxy_set_header Host \\$host;
                      proxy_cache_bypass \\$http_upgrade;
                  }
                  
                  location /_next/static {
                      alias ${PRODUCTION_DIR}/.next/static;
                      expires 365d;
                      access_log off;
                  }
              }
              NGINX_CFG
              
              # Enable site and reload Nginx
              ln -sf /etc/nginx/sites-available/sargen /etc/nginx/sites-enabled/
              nginx -t && systemctl reload nginx
              
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