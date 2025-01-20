# Rest API

## Get the __metadata Type

required for Power Platform 
__metadata typey "SP.Data.ListNameItem"

`https://[tenant].sharepoint.com/sites/[site]/_api/web/lists/GetByTitle('[List Or Library Title]')`

look for:
`<d:ListItemEntityTypeFullName>SP.Data.ListOrLibraryTitleItem</d:ListItemEntityTypeFullName>`

## Item level Permission

PrincipalId = SP Group id OR User Id
`_api/web/lists/GetByTitle('Site Pages')/items(5)/RoleAssignments/AddRoleAssignment(PrincipalId=9,RoleDefId=1073741827)`
