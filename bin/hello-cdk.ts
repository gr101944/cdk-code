#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { createBucket } from '../lib/basic/createBucket';
import { testDynamo } from '../lib/basic/createDynamoDB';
import { createRESTapi } from '../lib/basic/createAPIGateway';
import { createLambdaFromZip } from '../lib/complex/createLambdaFromZip';
import { createLambdaFromFolder } from '../lib/complex/createLambdaFromFolder';
import { createLambdaAPI } from '../lib/complex/createAPiGWLambda';
import { createLambda } from '../lib/basic/createLambda';
import {createVPC} from "../lib/complex/createVPC";


const app = new cdk.App();
new createBucket(app, 'createBucket', {});
new testDynamo(app, 'testDynamo', {});
new createRESTapi(app, 'createRESTapi', {});
new createLambda(app, 'createLambda', {});
new createLambdaFromZip(app, 'createLambdaFromZip', {});
new createLambdaFromFolder(app, 'createLambdaFromFolder', {});
new createLambdaAPI(app, 'createLambdaAPI', {});
new createVPC(app, 'createVPC')


