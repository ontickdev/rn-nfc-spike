import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import "source-map-support/register";

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  console.log(event);
  console.log(context);

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json"
  };

  const appLinks = {
    applinks: {
        apps: [],
        details: [
            {
                appID: "V42C94UF8R.org.reactjs.native.example.RnNfcReaderSpike",
                paths: ["*"],
            }
        ]
    }
}
  
  const response: APIGatewayProxyResult = {
    statusCode: 200,

    body: JSON.stringify(appLinks),
    headers: headers,
  };

  return response;
};
