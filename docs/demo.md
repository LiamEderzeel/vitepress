<style>
.yellow {
  background-color: yellow !important; 
}
.yellow span {
  color: black !important;
}
</style>


Fix attributes for internal `preWrapperPlugin`

```css
<style>
.yellow {
  background-color: yellow !important; 
}
.yellow span {
  color: black !important;
}
</style>
```

````md
```md {data-attribute="some data" .yellow}
````

```md {data-attribute="some data" .yellow}
I made some custom styling for this code block through markdown-it-attrs

Also i added a custom attribute "data-attribute"

```

````md
```md {1}{data-attribute="some data" .yellow}
````
```md {1}{data-attribute="some data" .yellow}
I made some custom styling for this code block through markdown-it-attrs

Also i added a custom attribute "data-attribute"

```

````md
```md {1}
````
```md {1}
I made some custom styling for this code block through markdown-it-attrs

Also i added a custom attribute "data-attribute"

```
