import * as cdk from '@aws-cdk/core';
import * as apigateway from '@aws-cdk/aws-apigateway';

export class createRESTapi extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new apigateway.RestApi(this, 'kendra-output');
    api.root.addMethod('ANY');
    //kendraResultStoreApi.addMethod('POST');
    const queries = api.root.addResource('queries');
    queries.addMethod('POST');
    const query = queries.addResource('{query_id}');
    
   
    
  }
}