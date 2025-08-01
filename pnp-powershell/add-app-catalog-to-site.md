## Add App  Catalog to site

- `Disconnect-PnPOnline`
- `Update-Module -Name PnP.PowerShell`
- `Connect-PnPOnline -Url "https://{TENANTNAME}-Admin.sharepoint.com" -ClientId {CLIENTID} -Interactive`
- `Add-PnPSiteCollectionAppCatalog -Site "https://{TENANTNAME}.sharepoint.com/sites/{SITE}`