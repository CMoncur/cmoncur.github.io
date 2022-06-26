---
# Temporary
featured: true

# Global
layout: blog
title: "Totally Fake and Invalid Blog Entry"
date: 2022-06-06 21:15:00 -0700
category: poker
tags: [
    preflop,
    etiquette,
    hand analysis,
    bankroll management,
    live poker
]
teaser: |
    **Lorem ipsum dolor sit amet, consectetur adipiscing elit.** Curabitur rutrum ex et nisl faucibus volutpat. Fusce posuere scelerisque dui sit amet pellentesque. Phasellus blandit orci augue, eu dignissim metus aliquam tincidunt.
---

## A Chapter Heading

**Lorem ipsum dolor sit amet, consectetur adipiscing elit.** Curabitur rutrum ex et nisl faucibus volutpat. Fusce posuere scelerisque dui sit amet pellentesque. Phasellus blandit orci augue, eu dignissim metus aliquam tincidunt.

{% highlight haskell %}
euclideanDistanceSquared :: Num a => [ a ] -> [ a ] -> Either NascentError a
euclideanDistanceSquared v w
    | length v /= length w  = Left DimensionalDiscrepancy
    | otherwise             = Right $ sum $ zipWith distanceSquared v w
        where
            distanceSquared vs ws = ( vs - ws ) ^ ( 2 :: Int )
{% endhighlight %}

{% highlight javascript %}
function dotProduct (v, w) {
  if (v.length !== w.length) {
    throw new TypeError("Dot Product expects two equal-sized arrays")
  }

  if (!Util.isArr(v) || !Util.isArr(w)) {
    throw new TypeError("Dot Product expects two arrays of numbers")
  }

  if ((!v.every((x) => Util.isNum(x))) || (!w.every((x) => Util.isNum(x)))) {
    const errMsg = "Arrays passed to Dot Product must contain only numbers"

    throw new TypeError(errMsg)
  }

  return v
    .map((x, idx) => x * w[idx])
    .reduce((x, xs) => x + xs, 0)
}
{% endhighlight %}

Fusce ultrices lacus quis odio mattis, sed tincidunt nunc iaculis. Nulla suscipit ante ultrices ornare hendrerit. Aenean iaculis mi urna, in tempus velit pharetra quis. Donec accumsan vel ipsum eu rhoncus.

*Vestibulum ante ipsum primis in faucibus orci* luctus et ultrices posuere cubilia curae; Nam pharetra risus a lorem consequat, ut placerat mauris fringilla. Integer porttitor, nisl in molestie tristique, sem erat feugiat sapien, non feugiat purus nisl id dui. Quisque tristique at libero ut gravida. Vivamus vel dolor auctor neque egestas egestas. Maecenas ut ex diam. Donec suscipit lectus a dui lobortis, ut accumsan libero pulvinar. Aliquam non mattis eros.

Duis non purus ut dolor ornare pellentesque. Proin pharetra id sem ut pretium. Duis ut ante lobortis, sagittis magna at, dictum mauris. Morbi tincidunt lobortis erat at tincidunt. Aenean molestie nec mauris ut elementum. Ut bibendum elit et elit bibendum pellentesque. Vivamus id vulputate dui, eget rhoncus ipsum. Duis vel arcu dictum, egestas ligula ut, iaculis tortor.