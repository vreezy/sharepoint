# Execute with PowerShell >= 7 or PowerShell core!
# called in a task group
# deploy-spfx.ps1 -client_id $(azure_client_id) -certificate_path "$(secureFilePath)" -certificate_password "$(azure_certificate_password)" -tenant_name "$(azure_tenant_name)" -site_url $(sp_site_url) -app_id "xxx" -path_to_sppkg '$(System.DefaultWorkingDirectory)/webPart.sppkg' 

[CmdletBinding()]
param (
    [Parameter(Mandatory = $true)]
    [string]
    $client_id,

    [Parameter(Mandatory = $true)]
    [string]
    $certificate_path,

    [Parameter(Mandatory = $false)]
    [string]
    $certificate_password,

    [Parameter(Mandatory = $true)]
    [string]
    $tenant_name,

    [Parameter(Mandatory = $true)]
    [string]
    $site_url,

    [Parameter(Mandatory = $true)]
    [string]
    $app_id,

    [Parameter(Mandatory = $true)]
    [string]
    $path_to_sppkg
)
process {

  function Get-XXXConnection($Url) {
    if (-not ([string]::IsNullOrEmpty($certificate_password)))
    {
      return Connect-PnPOnline -ClientId $client_id -CertificatePath $certificate_path -CertificatePassword (ConvertTo-SecureString -AsPlainText $certificate_password -Force) -Url $Url -ReturnConnection -Tenant "$tenant_name.onmicrosoft.com";  
    }
    else {
      return Connect-PnPOnline -ClientId $client_id -CertificatePath $certificate_path -Url $Url -ReturnConnection -Tenant "$tenant_name.onmicrosoft.com";  
    }
  }

  try {
    $connection = Get-XXXConnection -Url $site_url
    $retry_count = 1;
    do {
        if ($retry_count -eq 2) {
            Write-Host "Removing app with id '$app_id'...";
            Remove-PnPApp -Identity $app_id -Scope Site -Connection $connection -ErrorVariable error_remove_app -ErrorAction SilentlyContinue;
            if ($error_remove_app) {
                Write-Host "Error on removing App with id '$app_id': $error_remove_app" -ForegroundColor Red;
            }
            else {
                Write-Host "App with id '$app_id' successfully removed" -ForegroundColor Green;
            }
        }
        # Add-PnPSiteCollectionAppCatalog -site $sp_site_url
        Add-PnPApp -Path $path_to_sppkg -Scope Site -Publish -Overwrite -Connection $connection -SkipFeatureDeployment -ErrorVariable error_add_app -ErrorAction SilentlyContinue;
        if ($error_add_app) {
            Write-Host "Error occured, retry $retry_count/5. Error: $error_add_app";
        }
        $retry_count++;
    } until (!$error_add_app -or ($retry_count -gt 5))
    if ($error_add_app) {
        Write-Error "Deploying app failed!" -ForegroundColor Red;
    }
    else {
        Write-Host "App successfully deployed" -ForegroundColor Green;
    }
  }
  finally {
      # Disconnect-PnPOnline -Connection $connection;
  }
}