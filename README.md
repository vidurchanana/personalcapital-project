# personalcapital-project
 A micro service that invokes AWS elastic search and makes it available using API gateway and Lambda.

Information provided: 
1. A dataset(50 MB) in csv format ad a tect file with a listing of all the columns and their format. 
2. Search should be based on three parameters: Plan Name, Sponsor Name and Sponsor State.

Steps Involved: 

1. Conversion of CSV file to JSON in a format accpeted by Elastic Search. This process can be found CSVtoJSON.java file. Online converter don't allow you to convert the file larger than 2MB or 5MB. 

2. Additionally, AWS ES has different domain tiers with specific data upload limitations. Micro and Small are the free instances. 
I have used a small instance for this project. 

3. Next step is to upload the entire dataset. This had to be done in chunks because of the data upload limit. CSVtoSON.java has the capability to create limited rows JSON files. 

4. Once all the JSON files are ready, they can be uploaded from command prompt with a curl command. 
Note: On windows you'll have to download a curl package. On Linux, it's comparitively easier to install packages as it can be simply done from  a sudo apt-get install bash command. 

5. The upload data can be confirmed with a feature prvided by AWS ES, Kibana. Since ES is for data analytics, Kibana is wonderful tool to visualize and explore data. For more information, refer here: https://aws.amazon.com/elasticsearch-service/kibana/

6. Next, you have to use a service - API Gateway. I went ahead and created a resurce and GET function. The endpoint in this case would be your ES domain and can be accessed on the AWS ES dashboard. For this project, there were three query parameters - Plan Name, Sponsor Name and Sponsor State. These can be created while creating the GET method. 

7. Once, you've created the API, you can decide how you would like to execute the API - say through a Lambda function, HTTP, Mapping or another AWS service. For this application I went ahead and chose Lambda. 
Note: before selection, a Lambda function needs to be created. 

8. Go ahead and access the Lambda AWS Service and create a function. I created a Node.js function for the service. This function gets triggered whenever the API is called. Please refer to the APIfunction.js file. 

NodeJS

Endpoints available for search via NodeJS are:  
1. Plan Name: If you search for TIFFANY AND COMPANY EMPLOYEE ASSISTANCE PROGRAM, the encoded link will be : https://ssooiujwig.execute-api.us-west-1.amazonaws.com/prod/getPlans?plan-name=TIFFANY%20AND%20COMPANY%20EMPLOYEE%20ASSISTANCE%20PROGRAM

e.g. https://ssooiujwig.execute-api.us-west-1.amazonaws.com/prod/getPlans?plan-name= Your Plan Name

2. Sponsor Name: If you search for NORTHERN NEW JERSEY TEAMSTERS BENEFIT PLAN DEFINED CONTRIBUTION FUND, the link generated: https://ssooiujwig.execute-api.us-west-1.amazonaws.com/prod/getPlans?sponsor-name=NORTHERN%20NEW%20JERSEY%20TEAMSTERS%20BENEFIT%20PLAN

e.g. https://ssooiujwig.execute-api.us-west-1.amazonaws.com/prod/getPlans?sponsor-name= Your Sponsor Name

3. Sponsor State: Similary all the plans in Wisconsin would be as follows - https://ssooiujwig.execute-api.us-west-1.amazonaws.com/prod/getPlans?sponsor-state=WI

e.g. https://ssooiujwig.execute-api.us-west-1.amazonaws.com/prod/getPlans?sponsor-state= Your Sponsor State

Java

Endpoints available for search via JAVA are:  
1. Plan Name: If you search for TIFFANY AND COMPANY EMPLOYEE ASSISTANCE PROGRAM, the encoded link will be : https://bn4x4m69al.execute-api.us-west-1.amazonaws.com/prod/getPlans?plan-name=TIFFANY%20AND%20COMPANY%20EMPLOYEE%20ASSISTANCE%20PROGRAM

e.g. https://bn4x4m69al.execute-api.us-west-1.amazonaws.com/prod/getPlans?plan-name= Your Plan Name

2. Sponsor Name: If you search for NORTHERN NEW JERSEY TEAMSTERS BENEFIT PLAN DEFINED CONTRIBUTION FUND, the link generated: https://bn4x4m69al.execute-api.us-west-1.amazonaws.com/prod/getPlans?sponsor-name=NORTHERN%20NEW%20JERSEY%20TEAMSTERS%20BENEFIT%20PLAN

e.g. https://bn4x4m69al.execute-api.us-west-1.amazonaws.com/prod/getPlans?sponsor-name= Your Sponsor Name

3. Sponsor State: Similary all the plans in Wisconsin would be as follows - https://bn4x4m69al.execute-api.us-west-1.amazonaws.com/prod/getPlans?sponsor-state=WI

e.g. https://bn4x4m69al.execute-api.us-west-1.amazonaws.com/prod/getPlans?sponsor-state= Your Sponsor State


