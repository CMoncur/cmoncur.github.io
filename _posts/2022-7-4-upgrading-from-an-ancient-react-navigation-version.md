---
# Global
layout: blog
title: "Upgrading from an Ancient React Navigation Version"
date: 2022-07-04 21:54:00 -0700
category: dev
tags: [
    expo,
    javascript,
    plegr,
    react native,
    react navigation,
    refactoring,
    typescript
]
teaser: |
    The JavaScript/TypeScript landscape can shift at an overwhelming rate. I see this as both a blessing and a curse. On one hand, the tooling, libraries, and security features surrounding the ecosystem are constantly improving, and the developer experience is quite enjoyable...
---

## The JavaScript/TypeScript Landscape

The JavaScript/TypeScript landscape can shift at an overwhelming rate. I see this as both a blessing and a curse. On one hand, the tooling, libraries, and security features surrounding the ecosystem are constantly improving, and the developer experience is quite enjoyable. On the other, libraries and APIs introduce breaking changes at such a cyclic rate that it's tough to keep a passive side project project in a modern state -- especially if I only have the time (or drive) to work on it for one afternoon once every few months.

Back in late 2018, I began building a [poker ledger mobile application called Plegr](https://plegr.com){:target="_blank"}. I took pride in the quality of the code and the modern feel of the application, down to the detail. Everything had to be pixel perfect, and every possible user interaction had to feel smooth and natural. After the initial launch of the application in mid 2020, however, I only continued to work on the project passively.

Since it was rare that I had any good amount of time to devote to development, I dreaded typing that `yarn start` command. Without fail, there was a new Expo version available, and every upgrade represented at least a handful of breaking changes. After working through all of the library changes, issues, refactoring, etc... there was rarely much time left to develop new features.

## A Revival

That is... not until recently. I've finally begun to add some new functionality, such as filters and advanced stats. While most of the stale nature of the project was caught with my vigilant upgrading to the most up-to-date version of Expo, one major aspect of the application had been slipping through the cracks -- **React Navigation**. This library is the de facto way to manage screens, tabs, and general navigation within a React Native project.

When work on Plegr began, I was using React Navigation v3. The current version is v6. Somewhere near the time of Plegr's initial release, I upgraded the project to use v4. It was a rather simple change, as the API didn't change much between v3 and v4.

I was content leaving the project at v4 for as long as possible, but the nature of the way older versions of React Navigation wrapped the screens began to hold back development of new features...

## A Rabbit Hole

I wanted to begin work on a dark mode theme. I've never liked the idea of having the app leverage the dark/light mode preference of the device, so I wanted a setting that the user may toggle within the app itself. Sounds simple enough... I could create a context, have the state managed at the entrypoint component, and consume the context within each component where theme preferences were necessary.

The problem with this approach becomes clear when reviewing how React Navigation v3/v4 structures an app at the top level:

```typescript
const PlegrStack = createStackNavigator({
  Dashboard: { screen: Dashboard },
  Settings: { screen: Settings },

  ...

})

const AuthorizeStack = createStackNavigator({
  Login: { screen: Login },
  Register: { screen: Register },
  ForgotPassword: { screen: ForgotPassword },
})

export default createAppContainer(createSwitchNavigator(
  {
    PlegrEntrypoint: Plegr,
    Plegr: PlegrStack,
    Authorize: AuthorizeStack,
  },
  {
    initialRouteName: Page.PLEGR_ENTRYPOINT,
    navigationOptions: { ... },
  },
))
```

These stacks expect a *class*, not an *element*, and neither the stack nor the container are components that may be wrapped by a context provider. Now, I could create a wrapper class that manages context state and proceed to wrap *each and every page component*, but this solution would require me to refactor the whole application. If I was going to take the time to refactor the whole application, the preferable path forward would be to do so in a way that modernizes the application instead of working around an old library.

Upgrading React Navigation from v4 to v6 solves the underlying context issue, because the stack navigator and screen declarations are now *components* that may be wrapped by a context provider:

```tsx
renderStack = (): JSX.Element => (
  <PlegrStack.Navigator
      initialRouteName={ Page.LOADING }
      screenOptions={ ... }
  >
    {/* Base Pages */}
    <PlegrStack.Screen
      name={ Page.LOADING }
      component={ Loading }
    />
    <PlegrStack.Screen
      name={ Page.ERROR }
      component={ ErrorPage }
    />

    {/* Authentication Pages */}
    <PlegrStack.Screen
      name={ Page.LOGIN }
      component={ Login }
    />
    <PlegrStack.Screen
      name={ Page.REGISTER }
      component={ Register }
    />
    <PlegrStack.Screen
      name={ Page.FORGOT_PASSWORD }
      component={ ForgotPassword }
    />

    {/* Protected App Pages */}
    <PlegrStack.Screen
      name={ Page.DASHBOARD }
      component={ Dashboard }
      options={ ... }
    />
    <PlegrStack.Screen
      name={ Page.SETTINGS }
      component={ Settings }
      options={ ... }
    />

    ...

  </PlegrStack.Navigator>
)

render(): JSX.Element {
  return (
    <NavigationContainer ref={ PlegrNavigationRef }>
      { this.renderStack() }
    </NavigationContainer>
  )
}
```

I also find that the new API *feels* more declarative. In addition, there were some other API changes that allowed me to further clean up the codebase.

Previously, I was passing callbacks as route parameters from a parent page to a subordinate page, so that returning to the parent page would trigger an API call to fetch fresh data to replace data that may have become stale. For example...

- A user is on a Session Details page
- User clicks the edit button, which navigates to the Edit Session page
- The session is edited and then saved, which returns the user to the Session Details page
- The details that were on the page previously are now out of date, hence the need for a callback that triggers an API call to fetch fresh data

This approach always felt like an antipattern. It was a bit too tangled, and it became difficult to follow the logic from page to page when the components became larger and more complex. Fortunately, React Navigation v6 has a concept of [listeners](https://reactnavigation.org/docs/navigation-events/#navigationaddlistener){:target="_blank"}. Instead of passing callbacks as route parameters, I could simply put a `focus` listener on the parent page:

```typescript
async componentDidMount(): Promise<void> {
    
  ...

  this.props.navigation.addListener("focus", this.getSession)
}

componentWillUnmount(): void {
  this.props.navigation.removeListener("focus", ()=> {})
}
```

One more benefit of note is that navigation options may exist on the root level instead of the page level. Instead of having to include something like the following in *every page component*:

```typescript
export default class NeatPage extends React.Component<Props, State> {
  static navigationOptions = {
    headerShown: false,
  }

  ...

}
```

I may instead add `screenOptions` to the stack navigator at the entrypoint component of my application:

```tsx
<PlegrStack.Navigator
  initialRouteName={ Page.LOADING }
  screenOptions={ ... }
>

  ...

</PlegrStack.Navigator>
```

## A Portent of Things to Come

An astute reader may have noticed that I've been using class components instead of React's newer (and preferred) functional components. When I began working on Plegr in 2018, the functional approach was brand new, and class components still dominated the landscape, so that's the pattern I chose. Now that the rest of the codebase has been modernized, perhaps the next big step is to begin refactoring class components into their flashy newer functional counterparts. But, before I do that, I'd finally like to add some cool new features to Plegr.