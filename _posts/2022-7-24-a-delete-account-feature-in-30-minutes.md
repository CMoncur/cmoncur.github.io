---
# Global
layout: blog
title: "A \"Delete Account\" Feature in 30 Minutes"
date: 2022-07-24 22:37:00 -0700
category: dev
tags: [
    aws amplify,
    aws cognito,
    expo,
    javascript,
    plegr,
    react native,
    typescript
]
teaser: |
    It's the last email a developer wants to see at midnight on a weekend night... 

    ```
    App Store Connect - We noticed an issue with your submission.
    ```

    I had worked tirelessly during my weeknight evenings last week to finish dark mode support, an aggregate stat feature, and some visual enhancements for [Plegr, my side project](https://plegr.com){:target="_blank"}.
---

## An Expected Yet Frustrating Occurrence

It's the last email a developer wants to see at midnight on a weekend night... 

```
App Store Connect - We noticed an issue with your submission.
```

I had worked tirelessly during my weeknight evenings last week to finish dark mode support, an aggregate stat feature, and some visual enhancements for [Plegr, my side project](https://plegr.com){:target="_blank"}. Everything had been tested thoroughly, and I was excited about having submitted the app update to Apple's App Store on Thursday night, going into the weekend with a feeling of accomplishment.

Instead, around midnight between late Friday night and early Saturday morning, and after having waited over 24 hours for a response from Apple, I received the aforementioned email. I imagine most developers have come to expect this. After all, compliance regulations are ever changing, and as an indie developer, it's impractical (impossible, really) to keep up with them all. Still, it doesn't make the pill any easier to swallow, especially when the feedback loop can last days.

This time, the app rejection was due to Plegr not having a means of allowing users to delete their accounts from within the app. While there has always been a means to delete a Plegr account externally, this no longer cuts it for Apple. I decided that I was going to stay up for however long it took to add this feature to the app, even if it meant staying up until sunrise. I didn't want this looming over my head for the remainder of the weekend, or bleeding into the coming work week.

Fortunately, as it turns out, it was a trivial addition.

## A Pleasant Surprise

As a natural first step, I began by looking through [AWS Amplify's JavaScript documentation](https://docs.amplify.aws/lib/auth/delete_user/q/platform/js/){:target="_blank"}, and discovered that calling the `Auth.deleteUser()` would suffice, so long as a valid auth token was present. Surely, the settings page would serve as a host for this feature, since the settings page is available only to authenticated users. My implementation looked something like this:

```typescript
deleteAccount = async(): Promise<void> => {
  await this.setState({ loading: true })

  try {
    await Auth.deleteUser()
    this.props.navigation.navigate(Page.LOGIN)
  } catch (err) {
    ...
  }
}
```

Next, within the view logic for the settings page, I created a section for destructive actions, and added a button to call the `deleteUser` method:

```typescript
<Text style={ style.headerTextBold }>Danger Zone</Text>
<PlegrButton
  colorScheme="red"
  disabled={ false }
  onPress={ ... }
  text="Delete Account"
/>
```

When taking a destructive action, however, it makes sense to issue some kind of warning to the user. Especially in the case of account deletion. A simple alert will do:

```typescript
confirmDeleteAccount = async (): Promise<void> => {
  Alert.alert(
    "Delete Plegr Account?",
    "Are you sure you want to delete your account? This action is "
    + "PERMANENT, and your account and data will be irrecoverable.",
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete Account",
        onPress: this.deleteAccount,
        style: "destructive",
      },
    ],
  )
}
```

Lastly, I simply applied the `onPress={ this.confirmDeleteAccount }` prop to the `PlegrButton` component, and I was ready to test. Everything tested out perfectly on the first go-around, without any need for revision!

## What About the API Data?

Since Plegr uses AWS Cognito for user registration and authentication, I do not store any email addresses in the database. Plegr's API grabs a user's UUID to map it to session and location data. Once an account is deleted, the data is effectively dissociated. If a user were to register again using the same email address, their new account would be issued a new UUID, and therefore none of the user's old data is retrievable.

A user may still request that session and location data be deleted after the fact, and I see no practical reason to keep session and location data for an account that has been deleted. Eventually, I can add some full-stack logic to make this happen. But, for the sake of getting Plegr's updates published to the App Store, this was sufficient.

All said and done, I was finished adding the feature within 30 minutes, to include submitting the new build to the App Store. No unreasonably late night necessary! To top it all off, Plegr's update was approved and published before I woke up on Saturday morning!