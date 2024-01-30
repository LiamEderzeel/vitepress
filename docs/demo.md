<style>
.yellow {
  background-color: yellow !important; 
}
.yellow span {
  color: black !important;
}
</style>

Fix attributes for internal `preWrapperPlugin`

````md
```md {data-attribute="some data" .yellow}
````

```md {data-attribute="some data" .yellow}
I made some custom styling for this code block through markdown-it-attrs

Also i added a custom attribute "data-attribute"

```

