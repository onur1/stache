const hasOwnProperty = Object.prototype.hasOwnProperty

const { createElement } = require('react')
const t = require('./types')

const constant = a => () => a

const constantNull = constant(null)

const KEY_DELIM = '.'

const getRenderChildren = componentTree => val => {
  let j = 0
  let c = []
  let o
  for (; j < componentTree.length; ++j) {
    o = componentTree[j](val)
    if (o !== null) {
      if (t.String(o) && c.length > 0 && t.String(c[c.length - 1])) {
        // combine with the previous if both components output text
        c[c.length - 1] += o
      } else {
        c.push(o)
      }
    }
  }
  return c
}

const getRenderProps = props => {
  let i, o, c, p, n
  return s => {
    p = {}
    i = 0
    for (; i < props.length; i++) {
      o = props[i]
      n = o[0]
      c = o[1].map(f => f(s))
      if (c.length > 0) {
        if (c.length > 1) {
          p[n] = [c.map(String).join('')]
        } else {
          p[n] = c[0]
        }
      }
    }
    return p
  }
}

const createVariableComponent = (v, prop) => s => prop ? s[v.name] : String(s[v.name])

const createSectionComponent = (name, renderChildren) => {
  let val
  return s => {
    val = s[name]
    if (t.Boolean(val) && val === true) {
      return renderChildren(s)
    } else if (t.UnknownList(val) && val.length > 0) {
      return val.flatMap(renderChildren)
    } else if (t.UnknownStruct(val)) {
      return renderChildren(val)
    }
    return []
  }
}

const createInvertedSectionComponent = (name, renderChildren) => {
  let val
  return s => {
    if (!hasOwnProperty.call(s, name)) {
      return renderChildren(s)
    }
    val = s[name]
    if (
      t.Undefined(val) ||
      t.Nil(val) ||
      (t.Boolean(val) && val === false) ||
      (t.UnknownList(val) && val.length === 0)
    ) {
      return renderChildren(s)
    }
    return []
  }
}

const createTextComponent = t => constant(String(t.text))

const createPropertyComponent = (propName, propChildren, opts, index, tagWithDefaults) => {
  switch (propName) {
    case 'class':
      propName = 'className'
      break
    case 'for':
      propName = 'htmlFor'
      break
    case 'checked':
      propName = tagWithDefaults ? 'defaultChecked' : propName
      break
    case 'value':
      propName = tagWithDefaults ? 'defaultValue' : propName
      break
    default:
      if (hasOwnProperty.call(opts.syntheticEvents, propName)) {
        propName = opts.syntheticEventsReact[propName]
      }
  }
  return [propName, propChildren.map(c => createComponent(c, opts, index, null))]
}

const createElementComponent = (e, opts, index, key) => {
  const renderProps = getRenderProps(
    Object.entries(e.props).map(([propName, propChildren]) =>
      createPropertyComponent(
        propName,
        propChildren,
        opts,
        index,
        e.name === 'input' || e.name === 'select' || e.name === 'textarea' // has default value?
      )
    )
  )
  let renderChildren
  if (!hasOwnProperty.call(opts.selfClosingTags, e.name)) {
    renderChildren = getRenderChildren(
      e.children.map((c, i) => createComponent(c, opts, index, [key, String(i)].join(KEY_DELIM)))
    )
  } else {
    renderChildren = constantNull
  }
  let p, c
  // external?
  if (hasOwnProperty.call(opts.externs, e.name)) {
    return s => createElement(e.name, { ...renderProps(s), ...{ key } }, renderChildren(s))
  }
  // provided by user?
  if (hasOwnProperty.call(opts.registry, e.name)) {
    return s => {
      p = renderProps(s)
      c = renderChildren(p)
      if (c.length > 0) {
        p.children = c
      }
      return opts.registry[e.name](p)
    }
  }
  // own component?
  if (hasOwnProperty.call(index, e.name)) {
    return s => createElement(index[e.name], { ...renderProps(s), ...{ key } }, renderChildren(s))
  }
  return renderChildren
}

const createComponent = (node, opts, index, key) => {
  switch (node._tag) {
    case 'Element':
      if (!key) {
        throw new TypeError(`${node.name}: elements are not valid as prop children`)
      }
      return createElementComponent(node, opts, index, key)
    case 'Variable':
      return createVariableComponent(node, key === null)
    case 'Text':
      return createTextComponent(node)
    case 'Section':
      return createSectionComponent(
        node.name,
        getRenderChildren(
          node.children.map((c, i) => createComponent(c, opts, index, key ? [key, String(i)].join(KEY_DELIM) : null))
        )
      )
    case 'InvertedSection':
      return createInvertedSectionComponent(
        node.name,
        getRenderChildren(
          node.children.map((c, i) => createComponent(c, opts, index, key ? [key, String(i)].join(KEY_DELIM) : null))
        )
      )
  }
  return constantNull
}

const render = (sorted, opts) => {
  const syntheticEventsReact = Object.keys(opts.syntheticEvents).reduce(
    (i, o) => ({ ...i, ...{ [o.toLowerCase(o)]: o } }),
    {}
  )
  opts = {
    ...opts,
    ...{
      syntheticEventsReact,
      syntheticEvents: Object.keys(syntheticEventsReact).reduce((i, o) => ({ ...i, ...{ [o]: true } }), {}),
    },
  }
  return sorted.reduce((index, node, i) => {
    const c = createComponent(node, opts, index, String(i))
    return i === sorted.length - 1
      ? c
      : {
          ...index,
          ...{
            [node.name]: c,
          },
        }
  }, {})
}

module.exports = render
