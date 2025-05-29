Application Development
 Create a simple "Hello World" web app in any language/framework of your choice.
 Push the code to a public GitHub repository.
Containerization
 Use Docker to:
 Create a Dockerfile to containerize the app.
 Ensure the app can run locally using docker run.
CI/CD Pipeline
 Use GitHub Actions (free tier) to:
 Run automated linting and build checks tests.
 Build the app and create a Docker image.
 Push the Docker image to Docker Hub or GitHub Container Registry.
 Trigger the pipeline on push to the main branch.
Deployment
 Deploy the app on a Kubernetes cluster on single node (self
-hosted or free
-tier cloud).
 Provide Kubernetes manifests to run the app.
 Ensure the app is accessible (NodePort or port forwarding is OK).
Monitoring & Logging
 The monitoring tools must:
 Monitor Kubernetes node VM metrics.
 Store application logs
 Have a dashboard to visualize these data.
Documentation
 Provide a detailed documentation in format of pdf that includes:
 Setup steps for the app, Docker, Kubernetes, and monitoring tools.
 Instructions to run the CI/CD pipeline.
 Deployment guide for minikube/k3s.
 Monitoring setup and how to access the Grafana dashboard.
 Troubleshooting steps you do along the way.
 Note: Incomplete or unclear documentation may reduce points