Minimal reproduction repo for an issue with generating the `values` for a union-type prop that has a generic.

While this is a minimal reproduction of the issue, there's a few things that I've observed that together cause it:

- The types are imported from another file (for this example, they are imported from [src/types.ts](./src/types.ts))
  - `values` seem to be generated fine if all of the types involved are defined within the component file
- The type of the prop is a union of at least two values
  - `values` seems to be generated fine if the generic type is used alone, i.e. `` @Prop() color: AllowedColor<`${ColorName}-${ColorShadeName}`> ``
- The provided type for the generic is a [template literal type](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)
- The number of expanded values for the template literal value hits some limit
  - It's not clear what that limit is, but I provided some examples in [src/types.ts](./src/types.ts) with alternate combinations of the `ColorName` and `ColorShadeName` types where this issue does not happen

The issue can be observed in the generated `docs.json` file from the `docs-json` output target. For the `color` prop in the starter component, the `values` array which should contain an enumerated list of possible types + values for the prop, there is a mangled set of values that look like they are being split on the `|`, including parts of the generic `AllowedColors`.

```json
"values": [
  {
    "type": "ColorName"
  },
  {
    "type": "AllowedColors<\"Lavender-100\""
  },
  {
    "value": "Lavender-200",
    "type": "string"
  },
  {
    "value": "Lavender-300",
    "type": "string"
  },
  {
    "value": "Lavender-400",
    "type": "string"
  },
  {
    "value": "Lavender-500",
    "type": "string"
  },
  {
    "value": "Lavender-600",
    "type": "string"
  },
  {
    "value": "Ivy-100",
    "type": "string"
  },
  {
    "value": "Ivy-200",
    "type": "string"
  },
  {
    "value": "Ivy-300",
    "type": "string"
  },
  {
    "value": "Ivy-400",
    "type": "string"
  },
  {
    "value": "Ivy-500",
    "type": "string"
  },
  {
    "value": "Ivy-600",
    "type": "string"
  },
  {
    "value": "Rose-100",
    "type": "string"
  },
  {
    "value": "Rose-200",
    "type": "string"
  },
  {
    "value": "Rose-300",
    "type": "string"
  },
  {
    "value": "Rose-400",
    "type": "string"
  },
  {
    "value": "Rose-500",
    "type": "string"
  },
  {
    "type": "\"Rose-600\">"
  }
],
```

`ColorName` is also not expanded.

I would expect this to be an expanded list of the literal values of the type, e.g.

```json
"values": [
  {
    "value": "Lavender",
    "type": "string"
  },
  {
    "value": "Ivy",
    "type": "string"
  },
  {
    "value": "Rose",
    "type": "string"
  },
  {
    "value": "Lavender-100",
    "type": "string"
  },
  {
    "value": "Lavender-200",
    "type": "string"
  },
  {
    "value": "Lavender-300",
    "type": "string"
  },
  {
    "value": "Lavender-400",
    "type": "string"
  },
  {
    "value": "Lavender-500",
    "type": "string"
  },
  {
    "value": "Lavender-600",
    "type": "string"
  },
  {
    "value": "Ivy-100",
    "type": "string"
  },
  {
    "value": "Ivy-200",
    "type": "string"
  },
  {
    "value": "Ivy-300",
    "type": "string"
  },
  {
    "value": "Ivy-400",
    "type": "string"
  },
  {
    "value": "Ivy-500",
    "type": "string"
  },
  {
    "value": "Ivy-600",
    "type": "string"
  },
  {
    "value": "Rose-100",
    "type": "string"
  },
  {
    "value": "Rose-200",
    "type": "string"
  },
  {
    "value": "Rose-300",
    "type": "string"
  },
  {
    "value": "Rose-400",
    "type": "string"
  },
  {
    "value": "Rose-500",
    "type": "string"
  },
  {
    "value": "Rose-600",
    "type": "string"
  }
],
```

If you comment out the `ColorName` and `ColorShadeName` types in `types.ts` and uncomment one of the other two variations in that file and run a build, you'll find that it correctly expands those types. Similarly, if you remove the union type for the `color` prop in [src/components/my-component/my-component.tsx](./src/components/my-component/my-component.tsx) and run the build, you'll find the correct values in the `docs.json` file.
