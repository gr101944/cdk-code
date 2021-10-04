import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import { RemovalPolicy } from '@aws-cdk/core';

export class testDynamo extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new dynamodb.Table (this, "CDK-Test", {
        partitionKey: {name: "name", type: dynamodb.AttributeType.STRING},
        removalPolicy: RemovalPolicy.DESTROY
    })

   
  }
}
