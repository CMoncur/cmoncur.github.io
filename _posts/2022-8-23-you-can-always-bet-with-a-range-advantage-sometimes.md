---
# Temporary
featured: true

# Global
layout: blog
title: "You Can Always Bet with a Range Advantage... Sometimes..."
date: 2022-08-24 22:29:00 -0700
category: poker
tags: [
    pot limit omaha,
    flop,
    hand analysis
]
teaser: |
    If you've ever played a low- or mid-stakes pot limit Omaha cash game, you've no doubt experienced the loose and often passive tendencies of the population. It's not uncommon to see a given hand go four or five ways to a flop...
---

## Obvious or Obscure?

If you've ever played a low- or mid-stakes pot limit Omaha cash game, you've no doubt experienced the loose and often passive tendencies of the population. It's not uncommon to see a given hand go four or five ways to a flop. While it's certainly a welcome sight at the poker table, navigating a hand with a player type of this sort, especially out of position, can leave you feeling unsure of how to proceed. For a trained player, actions at equilibrium should be inherently natural, logical, and reasonably straight forward in their deduction. The waters get murky, however, when your opponent exhibits tendencies such as entering the pot with a 50+% range.

It's a situation such as this that I'd like to explore today. Recently, I played a hand as a preflop aggressor, raising **A:spades: K:diamonds: J:spades: 9:diamonds:** from an early position. The only caller in this hand was the player on the button, a person with the aforementioned tendencies.

## Finding Overaggression

The flop fell **A:hearts: A:clubs: 4:diamonds:**. Clearly, a phenomenal flop for my hand in particular, but I began to wonder where my bluffs would come from. At the time, I checked. Immediately, I felt silly for doing so, but as I began to dive deeper into the given scenario, my actions didn't seem so out of line.

Although I assumed that this situation would be a high frequency bet given my range and equity advantage, I couldn't help but question how high? If I don't have an ace or a big pocket pair, what else am I throwing in the mix as a bluff? As it turns out, in a vacuum, I was asking a silly question...

| Action   | Frequency |
| :------- | :-------- |
| Check    | 1.8%      |
| Bet 33%  | 96.4%     |
| Bet 100% | 1.8%      |

At equilibrium, as seen above, the answer to my question can be simplified to, "any and every holding that isn't value". Simple enough. But that just scratched the surface of my curiosity. As I mentioned above, this player is far too loose and passive. In the output above, the solver assumes that the in-position opponent is calling with a reasonable range (5.3%), and also assuming that range will have far fewer aces than my own. To better model a solution for the given opponent, I then ran a simulation where the in-position opponent is flat calling my open with a 25% range without pocket aces.

I chose to model the simulation this way because, in addition to calling too frequently preflop, most loose passive opponents won't be 3-betting nearly as much as they should. The adjustments indicate that my flop action should be rather more passive:

| Action   | Frequency |
| :------- | :-------- |
| Check    | 18.6%     |
| Bet 33%  | 80.7%     |
| Bet 100% | 0.7%      |

Within this newfound checking range are hands such as big pocket pairs, middling pocket pairs with backdoor equity, trip aces, and even trip aces with backdoor flush and straight equity.

Again, though, this isn't the end of the story. At equilibrium, in the scenarios above, the in-position player is expected to float a flop bet with ~60% of their range. The high continuation frequency, despite my range advantage, is no doubt a result of my near-100% continuation bet frequency. I doubt very much that most players with loose and passive preflop tendencies are finding a call 60% of the time in this scenario. Half that is more believable. So what does the solution look like when my opponent calls preflop with a 25% range, but only floats flop continuation bets 30% of the time?

| Action   | Frequency |
| :------- | :-------- |
| Check    | 10.1%     |
| Bet 33%  | 89.0%     |
| Bet 100% | 0.9%      |

The answer, as seen above, is somewhere in the middle of the first two scenarios. I'm still checking a number of my large pocket pair holdings, as well as trip aces holdings that block my opponent's ability to continue. I should check a few of my misses as well, such as **JT97**.

## A More Passive Conclusion

From a scenario that might not seem that interesting on the surface, I was surprised to see such bold adjustments. The biggest takeaway that I gathered from this experiment is that when playing out of position against a loose and passive player on a dry flop that favors my range, there are times when I benefit from allowing the opponent to see a turn, or to make a mistake by betting into me.
