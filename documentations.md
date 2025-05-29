# LACAK.IO TAKE HOME TEST
on this lab, i am creating a CI/CD pipeline with github actions for a simple hello-world app.

the tools i am using are:

-google cloud platform (google compute engine vm)
-vscode
-git
-github actions

# Preparation
there are a few things that need to be configured before creating the CI Workflow, these things are:

- Creating VM instance on google compute engine. (ubuntu 22.04 LTS running on e2-medium)
- creating git repository
- add secrets and ssh keys for the pipeline on github action secrets.
- installing docker and k3s on the compute engine instance

# workflow
for the ci/cd pipeline i created two workflow .yml files
1. main.yml
This workflow will run every time a push is made to the main branch.
So any commit pushed to main triggers the pipeline.

- build-and-push job
this job will Installs Node.js version 18 on the runner.
This is needed to run Node.js commands like npm install and npm run lint.
this job also run the linting script for error checking.
the rest of the pipeline work to build an image from the Dockerfile and the push it to my docker hub registry.

2. deploy.yml
this workflow will deploy the app image on the k3s installed on my compute engine instance.
as with main.yml, the workflow will be trigger whenever any code is pushed to the main branch in the git repository.

- deploy job
for this job, the first step is to write the SSH_PRIVATE_KEY secret called key.pem with strict permission (chmod 600), this key will be used to authenticate SSH to the GCP VM.

after creating the key, the workflow will open an SSH session to the GCP VM with cretentials that is also stored in the the github action secrets, and will use key.pem private key for authentication.

inside the SSH session, it will clone the github repo containing the app and deployment manifest in the vm. if the repo already cloned, this will fail but the next command ensure the latest code.

after inside the app directory, the workflow will pull from main branch and updates the local repo with the latest change from that branch.

after pulling from main, it then will use kubectl to apply the manifest from deployment.yaml. this will trigger the deployment or update of the kubernetes resources on the k3s node running on the vm.

if both main.yml and deploy.yml run properly, the application will be deployed on the k3s and can be accessed through the vm external IP

# K8s deployment
This Deployment ensures that one Pod is running the app as "hello-world-app" container, listening internally on port 3000, labeled app=hello.
this manifest also include a service for using nodeport, exposing the app port (3000) to 30003 for external access.

# Monitoring
for this section of the lab, i used grafana and prometheus for monitoring, and loki and promtail for logging.

for this monitoring stack, i created a monitoring namespace, in it i installed grafana, prometheus, loki and promtail via helm.

the grafana and prometheus run successfully and can be accessed properly, unfortunately i encounter an error in connecting loki to grafana so the logging aspect is stil missing