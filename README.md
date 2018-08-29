# Serverless dynamodb

Starter project for serverless and dynamodb

## Setup

### Local

Install serverless 
```bash
npm install serverless -g
```
Install dynamodb locally
```bash
sls dynamodb install
```
Install all node dependencies
```bash
npm install
```
To Deploy locally run
```bash
sls offline start
```

### Deployment

To propagate your changes to aws run
(aws access key and secret should be configured in your local)
(during deployment public folder and dev dependencies are ignored)
```bash
sls deploy --region us-east-1
sls deploy --region ap-southeast-1
sls deploy --region eu-central-1
```
To Sync all assets in public folder run
```bash
sls sync
```

## Note

>All assets can be synced to s3 using serverless-s3bucket-sync plugin


