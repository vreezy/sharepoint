# Column-formatting notes

## Official Docu

https://learn.microsoft.com/en-us/sharepoint/dev/declarative-customization/column-formatting

## Content

### thumbnail-column.json

uses a thumbnail (de-DE: Miniaturansicht) column

pictures from this columns are saved in the siteAssets/Lists/{GUID of List where the column exists} and not as attachments!

example data in a thumbnail column:
{"type":"thumbnail","fileName":"{fileName}.{Filetype}","nativeFile":{},"fieldName":"{fieldName}","serverUrl":"https://{tenant}.sharepoint.com","fieldId":"{GUID}","serverRelativeUrl":"/sites/{siteName}/SiteAssets/Lists/{GUID}/{fileName}.{Filetype}","id":"{GUID}"}

this formatting shows a 64x64px thumbnail in 100% so the full image is visible, normally you don't see the full image
additional you can click the thumbnail to see a bigger thumbnail.

### date-up-to-seconds.json

The Lists shows in the first days only yesterday or if you set it to date time you dont see the seconds.
tis show the ull date and time with seconds