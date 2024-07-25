# pnp-modern-search

## Results Filter

Um Folder zu unterbinden kann man in der Eigenschaft "ParentLink" schauen. die ist beeser als "Path"

## Handelbars Templates

### Taxonomie field

don't show null change ; by ,
```
{{#if (slot item @root.slots.RelevantFuer)}}
  {{join (split (slot item @root.slots.RelevantFuer) ";") ","}}
{{else}}

{{/if}}
```

alternate with replace:
```
{{#if (slot item @root.slots.RelevantFuer)}}
  {{replace (slot item @root.slots.RelevantFuer) ";" ","}}
{{else}}

{{/if}}
```
