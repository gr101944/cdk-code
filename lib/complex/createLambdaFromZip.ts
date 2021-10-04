import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3 from '@aws-cdk/aws-s3';
import { Duration } from '@aws-cdk/core';


export class createLambdaFromZip extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    var bucketName2 = "rajesh.ds.code";
    var key = "cdk/index.zip";
    var lambdaDuration = 60;
    var memorySize = 512;
    const byName = s3.Bucket.fromBucketName(this, 'BucketByName', bucketName2);

    const fn = new lambda.Function(this, 'hrbotCDK', {
        runtime: lambda.Runtime.NODEJS_12_X,
        handler: 'index.handler',
        code: lambda.Code.fromBucket(byName, key),
        memorySize: memorySize,
        timeout: Duration.seconds (lambdaDuration)
      });
   
    
  }
}