# CURL


## Get Token

```
$token = (curl "https://login.microsoftonline.com/<TENANT_ID>/oauth2/v2.0/token"-H "Content-Type: application/x-www-form-urlencoded" --data "grant_type=client_credentials&client_id=<CLIENT_ID>&client_secret=<CLIENT_SECRET>&scope=https%3A%2F%2Fservicebus.azure.net/.default" | ConvertFrom-Json | Select-Object -Property access_token | Format-Table -HideTableHeaders | Out-String -width 9999).trim()
```


## Service Bus SINGLE queue
```
curl -X POST "https://ogos-dev.servicebus.windows.net/testqueue/messages" -H "Authorization: Bearer $token" -H "Content-Type: application/json" -d "@./curl.json" 
```

## Service Bus MULTIPE queue (10 times)
```
curl -X POST -H "Authorization: Bearer $token" -H "Content-Type: application/json" -d "@./curl.json" --parallel --parallel-immediate --parallel-max 10 --parallel-max 5 --config urls.txt
```