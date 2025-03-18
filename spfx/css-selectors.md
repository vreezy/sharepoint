# CSS Selectors

- Stolen from: <https://codepen.io/dzearing/pen/jGdgrE>

```
console.log(
  mergeStyleSets({
    root: 
      {
        userSelect: 'none',
        background: 'red',
        selectors: {
          '@media screen and (-ms-high-contrast: active)': {
            background: 'purple'
          },
          ':hover': {
            background: 'blue',
            selectors: {
              '@media screen and (-ms-high-contrast: active)': {
                background: 'green'
              }
            }
          }
        }
      }   
  })
);
``` 

