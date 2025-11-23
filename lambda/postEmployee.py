import json
import boto3

# Initialize DynamoDB resource
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('employeeData')

def lambda_handler(event, context):
    try:
        # Parse request body (JSON)
        body = json.loads(event['body'])
        
        employeeid = str(body['employeeid'])  # ID as string
        name = body['name']
        department = body['department']
        salary = body['salary']

        # Put item into DynamoDB
        table.put_item(
            Item={
                'employeeid': employeeid,  # string
                'name': name,
                'department': department,
                'salary': salary
            }
        )

        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'  # CORS
            },
            'body': json.dumps({'message': 'Employee added successfully'})
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)})
        }
