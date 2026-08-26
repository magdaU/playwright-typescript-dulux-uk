# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: purchase/tester-product.spec.ts >> Purchase a colour tester >> mobile customer adds a tester to the basket via the hamburger menu
- Location: tests/specs/purchase/tester-product.spec.ts:34:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Menu' })
    - locator resolved to <button aria-label="Menu" class="hamburger-icon js-menu-button">…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="onetrust-pc-dark-filter ot-fade-in"></div> from <div data-nosnippet="true" id="onetrust-consent-sdk">…</div> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="onetrust-pc-dark-filter ot-fade-in"></div> from <div data-nosnippet="true" id="onetrust-consent-sdk">…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 100ms
    50 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div class="onetrust-pc-dark-filter ot-fade-in"></div> from <div data-nosnippet="true" id="onetrust-consent-sdk">…</div> subtree intercepts pointer events
     - retrying click action
       - waiting 500ms

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - link "Skip to main content" [ref=e2] [cursor=pointer]:
    - /url: "#app"
  - paragraph [ref=e8] [cursor=pointer]: ✕
  - main [ref=e10]:
    - generic [ref=e11]:
      - generic [ref=e13]:
        - button "Close" [ref=e14] [cursor=pointer]:
          - img [ref=e16]
        - img [ref=e20]
        - generic [ref=e21]:
          - heading "Dulux Visualiser" [level=2] [ref=e24]
          - generic [ref=e26]: Instantly visualise this colour on your walls
        - link "View" [ref=e27] [cursor=pointer]:
          - /url: https://play.google.com/store/apps/details?id=com.akzonobel.uk.dulux&hl=en&gl=US
          - generic [ref=e28]: View
      - navigation [ref=e30]:
        - generic [ref=e32]:
          - button "Menu" [ref=e33] [cursor=pointer]
          - link "Logo" [ref=e36] [cursor=pointer]:
            - /url: https://www.dulux.co.uk/en
            - img "Brand Logo" [ref=e38]
          - generic [ref=e39]:
            - generic [ref=e40]:
              - list [ref=e42]:
                - listitem [ref=e43]:
                  - button "Find a colour" [ref=e44] [cursor=pointer]:
                    - generic [ref=e45]: Find a colour
                    - img [ref=e47]
                  - list:
                    - listitem [ref=e49]:
                      - link "Find a colour" [ref=e50] [cursor=pointer]:
                        - /url: /en/colour-details/h_White#tabId=item0
                    - listitem [ref=e51]:
                      - link "Neutrals" [ref=e52] [cursor=pointer]:
                        - /url: /en/white-and-neutral-paint
                    - listitem [ref=e53]:
                      - link "Greys" [ref=e54] [cursor=pointer]:
                        - /url: /en/grey-paint
                    - listitem [ref=e55]:
                      - link "Greens" [ref=e56] [cursor=pointer]:
                        - /url: /en/green-paint
                    - listitem [ref=e57]:
                      - link "Blues" [ref=e58] [cursor=pointer]:
                        - /url: /en/blue-paint
                    - listitem [ref=e59]:
                      - link "Reds" [ref=e60] [cursor=pointer]:
                        - /url: /en/red-paint
                    - listitem [ref=e61]:
                      - link "Yellows" [ref=e62] [cursor=pointer]:
                        - /url: /en/yellow-paint
                    - listitem [ref=e63]:
                      - link "Dulux Colours of the Year 2026" [ref=e64] [cursor=pointer]:
                        - /url: /en/dulux-colours-of-the-year-2026
                    - listitem [ref=e65]:
                      - link "Colour Play" [ref=e66] [cursor=pointer]:
                        - /url: /en/colour-inspiration/colour-play
                - listitem [ref=e67]:
                  - button "Choose a product" [ref=e68] [cursor=pointer]:
                    - generic [ref=e69]: Choose a product
                    - img [ref=e71]
                  - list:
                    - listitem [ref=e73]:
                      - link "Interior paint" [ref=e74] [cursor=pointer]:
                        - /url: /en/products/filters/p_Interior
                    - listitem [ref=e75]:
                      - link "Exterior paint" [ref=e76] [cursor=pointer]:
                        - /url: /en/products/filters/p_Exterior
                    - listitem [ref=e77]:
                      - link "All Dulux" [ref=e78] [cursor=pointer]:
                        - /url: /en/products
                    - listitem [ref=e79]:
                      - link "Cuprinol Woodcare" [ref=e80] [cursor=pointer]:
                        - /url: https://www.cuprinol.co.uk
                - listitem [ref=e81]:
                  - button "Ideas" [ref=e82] [cursor=pointer]:
                    - generic [ref=e83]: Ideas
                    - img [ref=e85]
                  - list:
                    - listitem [ref=e87]:
                      - link "Explore" [ref=e88] [cursor=pointer]:
                        - /url: /en/colour-inspiration
                    - listitem [ref=e89]:
                      - link "Kitchens" [ref=e90] [cursor=pointer]:
                        - /url: /en/kitchens
                    - listitem [ref=e91]:
                      - link "Living Rooms" [ref=e92] [cursor=pointer]:
                        - /url: /en/living-rooms
                    - listitem [ref=e93]:
                      - link "Bedrooms" [ref=e94] [cursor=pointer]:
                        - /url: /en/bedrooms
                    - listitem [ref=e95]:
                      - link "Bathrooms" [ref=e96] [cursor=pointer]:
                        - /url: /en/bathrooms
                    - listitem [ref=e97]:
                      - link "Home Office" [ref=e98] [cursor=pointer]:
                        - /url: /en/home-office
                    - listitem [ref=e99]:
                      - link "Children’s Bedroom" [ref=e100] [cursor=pointer]:
                        - /url: /en/kids-bedrooms
                    - listitem [ref=e101]:
                      - link "View our Interior Colour and Paint Guide" [ref=e102] [cursor=pointer]:
                        - /url: /content/dam/akzonobel-flourish/dulux/uk/en/interior-colour-and-pain-guide.pdf
                - listitem [ref=e103]:
                  - button "Help & tools" [ref=e104] [cursor=pointer]:
                    - generic [ref=e105]: Help & tools
                    - img [ref=e107]
                  - list:
                    - listitem [ref=e109]:
                      - link "Expert help" [ref=e110] [cursor=pointer]:
                        - /url: /en/expert-help
                    - listitem [ref=e111]:
                      - link "Paint Calculator" [ref=e112] [cursor=pointer]:
                        - /url: /en/paint-calculator
                    - listitem [ref=e113]:
                      - link "Find a pro" [ref=e114] [cursor=pointer]:
                        - /url: /en/select-decorators
                    - listitem [ref=e115]:
                      - link "Contact us" [ref=e116] [cursor=pointer]:
                        - /url: /en/contact-us
                - listitem [ref=e117]:
                  - link "Sustainability" [ref=e118] [cursor=pointer]:
                    - /url: /en/sustainability
                    - generic [ref=e119]: Sustainability
                - listitem [ref=e120]:
                  - link "Find a store" [ref=e121] [cursor=pointer]:
                    - /url: /en/storefinder
                    - generic [ref=e122]: Find a store
              - generic [ref=e124]:
                - generic [ref=e125]:
                  - link "Consumers" [ref=e126] [cursor=pointer]:
                    - /url: "#"
                  - link "Professional" [ref=e127] [cursor=pointer]:
                    - /url: https://www.duluxtradepaintexpert.co.uk/en
                - link "Corporate logo" [ref=e129] [cursor=pointer]:
                  - /url: https://www.akzonobel.com/en
                  - img [ref=e131]
            - list [ref=e134]:
              - listitem [ref=e135] [cursor=pointer]:
                - button "Search" [ref=e136]:
                  - img [ref=e138]
              - listitem [ref=e140] [cursor=pointer]:
                - link "Shopping Cart" [ref=e141]:
                  - /url: /en/store/cart
                  - img [ref=e143]
              - listitem [ref=e145] [cursor=pointer]:
                - button "User Icon" [ref=e146]:
                  - button "User Icon" [ref=e147]:
                    - img [ref=e148]
      - generic [ref=e153]:
        - paragraph [ref=e164]:
          - text: Free Delivery on all orders applies to orders placed and confirmed on
          - link "Dulux Paints - Find The Perfect Paint Colour for You | Dulux" [ref=e165] [cursor=pointer]:
            - /url: /en
          - text: between 24-August-2026 00:00am hrs and 31-August-2026 23:59pm hrs and is subject to availability. Click here for
          - link "T&Cs" [ref=e166] [cursor=pointer]:
            - /url: "#terms-and-conditions"
          - text: .
        - list [ref=e169]:
          - listitem [ref=e170]:
            - img "img1" [ref=e172]
            - generic [ref=e176]:
              - heading "Life is what you paint it" [level=1] [ref=e181]
              - generic [ref=e182]:
                - button "I have some colours in mind" [ref=e183] [cursor=pointer]:
                  - generic [ref=e184]: I have some colours in mind
                - link "I would like some ideas" [ref=e185] [cursor=pointer]:
                  - /url: "#"
                  - generic [ref=e186]: I would like some ideas
          - listitem [ref=e187]:
            - generic [ref=e191]:
              - heading "Pick your colour palette" [level=2] [ref=e195]
              - generic [ref=e196]:
                - button "White" [ref=e197] [cursor=pointer]:
                  - generic [ref=e198]:
                    - generic:
                      - paragraph
                - button "Red" [ref=e199] [cursor=pointer]:
                  - generic [ref=e200]:
                    - generic:
                      - paragraph
                - button "Orange" [ref=e201] [cursor=pointer]:
                  - generic [ref=e202]:
                    - generic:
                      - paragraph
                - button "Gold" [ref=e203] [cursor=pointer]:
                  - generic [ref=e204]:
                    - generic:
                      - paragraph
                - button "Yellow" [ref=e205] [cursor=pointer]:
                  - generic [ref=e206]:
                    - generic:
                      - paragraph
                - button "Lime" [ref=e207] [cursor=pointer]:
                  - generic [ref=e208]:
                    - generic:
                      - paragraph
                - button "Green" [ref=e209] [cursor=pointer]:
                  - generic [ref=e210]:
                    - generic:
                      - paragraph
                - button "Teal" [ref=e211] [cursor=pointer]:
                  - generic [ref=e212]:
                    - generic:
                      - paragraph
                - button "Blue" [ref=e213] [cursor=pointer]:
                  - generic [ref=e214]:
                    - generic:
                      - paragraph
                - button "Violet" [ref=e215] [cursor=pointer]:
                  - generic [ref=e216]:
                    - generic:
                      - paragraph
                - button "Cool Neutral" [ref=e217] [cursor=pointer]:
                  - generic [ref=e218]:
                    - generic:
                      - paragraph
                - button "Warm Neutral" [ref=e219] [cursor=pointer]:
                  - generic [ref=e220]:
                    - generic:
                      - paragraph
          - listitem [ref=e221]:
            - generic [ref=e224]:
              - heading "I'll be painting ..." [level=2] [ref=e227]
              - generic [ref=e228]:
                - generic [ref=e231]:
                  - button "Bathroom" [ref=e232] [cursor=pointer]:
                    - generic [ref=e233]: Bathroom
                    - img [ref=e235]
                  - generic [ref=e237]:
                    - button "Bathroom" [ref=e238] [cursor=pointer]
                    - button "Living room" [ref=e239] [cursor=pointer]
                    - button "Dining room" [ref=e240] [cursor=pointer]
                    - button "Bedroom" [ref=e241] [cursor=pointer]
                    - button "Children's room" [ref=e242] [cursor=pointer]
                    - button "Hallway" [ref=e243] [cursor=pointer]
                    - button "Home office" [ref=e244] [cursor=pointer]
                    - button "Kitchen" [ref=e245] [cursor=pointer]
                - button "Next" [ref=e246] [cursor=pointer]:
                  - generic [ref=e247]: Next
          - listitem [ref=e248]:
            - generic [ref=e251]:
              - heading "It's ..." [level=2] [ref=e254]
              - generic [ref=e255]:
                - generic [ref=e258]:
                  - button "Radiator" [ref=e259] [cursor=pointer]:
                    - generic [ref=e260]: Radiator
                    - img [ref=e262]
                  - generic [ref=e264]:
                    - button "Radiator" [ref=e265] [cursor=pointer]
                    - button "Skirting boards" [ref=e266] [cursor=pointer]
                    - button "Metal" [ref=e267] [cursor=pointer]
                    - button "Windows" [ref=e268] [cursor=pointer]
                    - button "Window frames" [ref=e269] [cursor=pointer]
                    - button "Doors" [ref=e270] [cursor=pointer]
                    - button "Ceilings" [ref=e271] [cursor=pointer]
                    - button "Wood" [ref=e272] [cursor=pointer]
                    - button "Door frames" [ref=e273] [cursor=pointer]
                    - button "Walls" [ref=e274] [cursor=pointer]
                    - button "Masonry" [ref=e275] [cursor=pointer]
                    - button "Entrance doors" [ref=e276] [cursor=pointer]
                    - button "Cupboards" [ref=e277] [cursor=pointer]
                    - button "Furniture" [ref=e278] [cursor=pointer]
                    - button "uPVC" [ref=e279] [cursor=pointer]
                    - button "Garage doors" [ref=e280] [cursor=pointer]
                    - button "Tiles" [ref=e281] [cursor=pointer]
                    - button "Melamine" [ref=e282] [cursor=pointer]
                - button "Next" [ref=e283] [cursor=pointer]:
                  - generic [ref=e284]: Next
        - generic [ref=e298]:
          - generic [ref=e299]:
            - generic [ref=e300]:
              - link "Social post with image from Jan 22 by null (ourhalliwellhome)" [ref=e301] [cursor=pointer]:
                - generic [ref=e305]:
                  - generic [ref=e306]:
                    - generic [ref=e308]: "@ourhalliwellhome"
                    - generic [ref=e309]:
                      - generic [ref=e310]: Jan 22
                      - generic "View 's post on instagram (opens in a new window)" [ref=e311]:
                        - img [ref=e312]
                  - list [ref=e317]:
                    - listitem [ref=e318]:
                      - generic "Share on Facebook (opens in a new window)" [ref=e319]: 
                    - listitem [ref=e320]:
                      - generic "Share on X (opens in a new window)" [ref=e321]: 
                    - listitem [ref=e322]:
                      - generic "Share on Pinterest (opens in a new window)" [ref=e323]: 
                    - text: 
              - link "Social post with image from Feb 26 by Romi 🕊💫 (ouroakhillhome)" [ref=e324] [cursor=pointer]:
                - generic [ref=e328]:
                  - generic [ref=e329]:
                    - generic [ref=e330]:
                      - generic [ref=e331]: Romi 🕊💫
                      - generic [ref=e332]: "@ouroakhillhome"
                    - generic [ref=e333]:
                      - generic [ref=e334]: Feb 26
                      - generic "View Romi 🕊💫's post on instagram (opens in a new window)" [ref=e335]:
                        - img [ref=e336]
                  - list [ref=e341]:
                    - listitem [ref=e342]:
                      - generic "Share on Facebook (opens in a new window)" [ref=e343]: 
                    - listitem [ref=e344]:
                      - generic "Share on X (opens in a new window)" [ref=e345]: 
                    - listitem [ref=e346]:
                      - generic "Share on Pinterest (opens in a new window)" [ref=e347]: 
                    - text: 
              - link "Social post with image from Jan 17 by null (tweedandtwinkles)" [ref=e348] [cursor=pointer]:
                - generic [ref=e352]:
                  - generic [ref=e353]:
                    - generic [ref=e355]: "@tweedandtwinkles"
                    - generic [ref=e356]:
                      - generic [ref=e357]: Jan 17
                      - generic "View 's post on instagram (opens in a new window)" [ref=e358]:
                        - img [ref=e359]
                  - list [ref=e364]:
                    - listitem [ref=e365]:
                      - generic "Share on Facebook (opens in a new window)" [ref=e366]: 
                    - listitem [ref=e367]:
                      - generic "Share on X (opens in a new window)" [ref=e368]: 
                    - listitem [ref=e369]:
                      - generic "Share on Pinterest (opens in a new window)" [ref=e370]: 
                    - text: 
              - link "Social post with image from Jan 16 by Renovating Number 51 🏠 (renoat51_)" [ref=e371] [cursor=pointer]:
                - generic [ref=e375]:
                  - generic [ref=e376]:
                    - generic [ref=e377]:
                      - generic [ref=e378]: Renovating Number 51 🏠
                      - generic [ref=e379]: "@renoat51_"
                    - generic [ref=e380]:
                      - generic [ref=e381]: Jan 16
                      - generic "View Renovating Number 51 🏠's post on instagram (opens in a new window)" [ref=e382]:
                        - img [ref=e383]
                  - list [ref=e388]:
                    - listitem [ref=e389]:
                      - generic "Share on Facebook (opens in a new window)" [ref=e390]: 
                    - listitem [ref=e391]:
                      - generic "Share on X (opens in a new window)" [ref=e392]: 
                    - listitem [ref=e393]:
                      - generic "Share on Pinterest (opens in a new window)" [ref=e394]: 
                    - text: 
              - link "Social post with image from Jan 16 by Victoria Russell (underrussellsroof)" [ref=e395] [cursor=pointer]:
                - generic [ref=e399]:
                  - generic [ref=e400]:
                    - generic [ref=e401]:
                      - generic [ref=e402]: Victoria Russell
                      - generic [ref=e403]: "@underrussellsroof"
                    - generic [ref=e404]:
                      - generic [ref=e405]: Jan 16
                      - generic "View Victoria Russell's post on instagram (opens in a new window)" [ref=e406]:
                        - img [ref=e407]
                  - list [ref=e412]:
                    - listitem [ref=e413]:
                      - generic "Share on Facebook (opens in a new window)" [ref=e414]: 
                    - listitem [ref=e415]:
                      - generic "Share on X (opens in a new window)" [ref=e416]: 
                    - listitem [ref=e417]:
                      - generic "Share on Pinterest (opens in a new window)" [ref=e418]: 
                    - text: 
              - link "Social post with image from Jan 16 by Emma McVeigh (homebird_mrsmac)" [ref=e419] [cursor=pointer]:
                - generic [ref=e423]:
                  - generic [ref=e424]:
                    - generic [ref=e425]:
                      - generic [ref=e426]: Emma McVeigh
                      - generic [ref=e427]: "@homebird_mrsmac"
                    - generic [ref=e428]:
                      - generic [ref=e429]: Jan 16
                      - generic "View Emma McVeigh's post on instagram (opens in a new window)" [ref=e430]:
                        - img [ref=e431]
                  - list [ref=e436]:
                    - listitem [ref=e437]:
                      - generic "Share on Facebook (opens in a new window)" [ref=e438]: 
                    - listitem [ref=e439]:
                      - generic "Share on X (opens in a new window)" [ref=e440]: 
                    - listitem [ref=e441]:
                      - generic "Share on Pinterest (opens in a new window)" [ref=e442]: 
                    - text: 
              - link "Social post with image from Jan 15 by Ashleigh Boyd (isntitgorgeous)" [ref=e443] [cursor=pointer]:
                - generic [ref=e447]:
                  - generic [ref=e448]:
                    - generic [ref=e449]:
                      - generic [ref=e450]: Ashleigh Boyd
                      - generic [ref=e451]: "@isntitgorgeous"
                    - generic [ref=e452]:
                      - generic [ref=e453]: Jan 15
                      - generic "View Ashleigh Boyd's post on instagram (opens in a new window)" [ref=e454]:
                        - img [ref=e455]
                  - list [ref=e460]:
                    - listitem [ref=e461]:
                      - generic "Share on Facebook (opens in a new window)" [ref=e462]: 
                    - listitem [ref=e463]:
                      - generic "Share on X (opens in a new window)" [ref=e464]: 
                    - listitem [ref=e465]:
                      - generic "Share on Pinterest (opens in a new window)" [ref=e466]: 
                    - text: 
              - link "Social post with image from Jan 14 by Emily Catterall (emilycat_xx)" [ref=e467] [cursor=pointer]:
                - generic [ref=e471]:
                  - generic [ref=e472]:
                    - generic [ref=e473]:
                      - generic [ref=e474]: Emily Catterall
                      - generic [ref=e475]: "@emilycat_xx"
                    - generic [ref=e476]:
                      - generic [ref=e477]: Jan 14
                      - generic "View Emily Catterall's post on instagram (opens in a new window)" [ref=e478]:
                        - img [ref=e479]
                  - list [ref=e484]:
                    - listitem [ref=e485]:
                      - generic "Share on Facebook (opens in a new window)" [ref=e486]: 
                    - listitem [ref=e487]:
                      - generic "Share on X (opens in a new window)" [ref=e488]: 
                    - listitem [ref=e489]:
                      - generic "Share on Pinterest (opens in a new window)" [ref=e490]: 
                    - text: 
            - button "next slide" [ref=e491] [cursor=pointer]:
              - text: 
              - generic [ref=e492]: Next
            - button "previous slide" [disabled] [ref=e493]:
              - text: 
              - generic [ref=e494]: Prev
          - generic [ref=e495]:
            - button "pagination-dot" [ref=e496] [cursor=pointer]
            - button "pagination-dot" [ref=e497] [cursor=pointer]
            - button "pagination-dot" [ref=e498] [cursor=pointer]
            - button "pagination-dot" [ref=e499] [cursor=pointer]
            - button "pagination-dot" [ref=e500] [cursor=pointer]
            - button "pagination-dot" [ref=e501] [cursor=pointer]
            - button "pagination-dot" [ref=e502] [cursor=pointer]
            - button "pagination-dot" [ref=e503] [cursor=pointer]
        - generic [ref=e511]:
          - tablist [ref=e514]:
            - tab "Warm neutrals" [ref=e515]:
              - region "Warm neutrals" [ref=e516] [cursor=pointer]
            - tab "Whites" [ref=e517]:
              - region "Whites" [ref=e518] [cursor=pointer]
            - tab "Cool Neutrals" [ref=e519]:
              - region "Cool Neutrals" [ref=e520] [cursor=pointer]
            - tab "Greens" [ref=e521]:
              - region "Greens" [ref=e522] [cursor=pointer]
            - tab "Popular Shades" [ref=e523]:
              - region "Popular Shades" [ref=e524] [cursor=pointer]
          - tabpanel [ref=e525]
      - generic [ref=e644]:
        - generic:
          - text: "If you are human, leave this field blank:"
          - textbox "If you are human, leave this field blank:" [ref=e645]
      - generic [ref=e648]:
        - generic [ref=e650]:
          - generic [ref=e651]: Easy and safe payment
          - img "Paypal" [ref=e653]
          - img "visa" [ref=e655]
          - img "master card" [ref=e657]
          - img "maestro" [ref=e659]
          - img "ideal" [ref=e661]
          - img "cb" [ref=e663]
          - img "klarna" [ref=e665]
        - generic [ref=e667]:
          - generic [ref=e668]: Follow us
          - link "Follow us" [ref=e669] [cursor=pointer]:
            - /url: https://www.facebook.com/dulux
            - img [ref=e671]
          - link "Follow us" [ref=e673] [cursor=pointer]:
            - /url: https://www.instagram.com/duluxuk/?hl=en
            - img [ref=e675]
          - link "Follow us" [ref=e678] [cursor=pointer]:
            - /url: https://www.pinterest.co.uk/duluxuk/
            - img [ref=e680]
          - link "Follow us" [ref=e682] [cursor=pointer]:
            - /url: https://twitter.com/duluxuk
            - img [ref=e684]
          - link "Follow us" [ref=e686] [cursor=pointer]:
            - /url: https://www.youtube.com/user/DuluxUK
            - img [ref=e688]
          - link "Follow us" [ref=e690] [cursor=pointer]:
            - /url: https://anchor.fm/lets-colour
            - img [ref=e692]
      - generic [ref=e697]:
        - generic [ref=e699]:
          - img [ref=e703]
          - list [ref=e706]:
            - listitem [ref=e707]:
              - link "About Dulux" [ref=e708] [cursor=pointer]:
                - /url: /en/about-dulux
                - generic [ref=e709]: About Dulux
            - listitem [ref=e710]:
              - link "Contact us" [ref=e711] [cursor=pointer]:
                - /url: /en/contact-us
                - generic [ref=e712]: Contact us
            - listitem [ref=e713]:
              - link "Find a stockist" [ref=e714] [cursor=pointer]:
                - /url: /en/storefinder
                - generic [ref=e715]: Find a stockist
            - listitem [ref=e716]:
              - link "Delivery Information" [ref=e717] [cursor=pointer]:
                - /url: /en/delivery-information
                - generic [ref=e718]: Delivery Information
            - listitem [ref=e719]:
              - link "Refunds and Cancellations" [ref=e720] [cursor=pointer]:
                - /url: /en/refunds-and-cancellations
                - generic [ref=e721]: Refunds and Cancellations
            - listitem [ref=e722]:
              - link "Terms and Conditions" [ref=e723] [cursor=pointer]:
                - /url: /en/terms-and-conditions
                - generic [ref=e724]: Terms and Conditions
            - listitem [ref=e725]:
              - link "Sitemap" [ref=e726] [cursor=pointer]:
                - /url: /en/html-site-map
                - generic [ref=e727]: Sitemap
        - generic [ref=e729]:
          - img [ref=e733]
          - list [ref=e736]:
            - listitem [ref=e737]:
              - link "Accessibility" [ref=e738] [cursor=pointer]:
                - /url: /en/accessibility
                - generic [ref=e739]: Accessibility
            - listitem [ref=e740]:
              - link "Colour Accuracy" [ref=e741] [cursor=pointer]:
                - /url: /en/colour-accuracy
                - generic [ref=e742]: Colour Accuracy
            - listitem [ref=e743]:
              - link "Cookies Settings" [ref=e744] [cursor=pointer]:
                - /url: javascript:void(0);
            - listitem [ref=e745]:
              - 'link "Terms and Conditions for #YesDulux" [ref=e746] [cursor=pointer]':
                - /url: /en/terms-and-conditions/yes-dulux
                - generic [ref=e747]: "Terms and Conditions for #YesDulux"
            - listitem [ref=e748]:
              - link "Sustainability" [ref=e749] [cursor=pointer]:
                - /url: /en/sustainability
                - generic [ref=e750]: Sustainability
        - generic [ref=e752]:
          - img [ref=e756]
          - list [ref=e759]:
            - listitem [ref=e760]:
              - link "Cuprinol" [ref=e761] [cursor=pointer]:
                - /url: https://www.cuprinol.co.uk/
                - generic [ref=e762]: Cuprinol
            - listitem [ref=e763]:
              - link "Dulux Select Decorators" [ref=e764] [cursor=pointer]:
                - /url: https://www.duluxselectdecorators.co.uk/
                - generic [ref=e765]: Dulux Select Decorators
            - listitem [ref=e766]:
              - link "Dulux Trade" [ref=e767] [cursor=pointer]:
                - /url: https://www.duluxtradepaintexpert.co.uk/en
                - generic [ref=e768]: Dulux Trade
            - listitem [ref=e769]:
              - link "Hammerite" [ref=e770] [cursor=pointer]:
                - /url: https://www.hammerite.co.uk/
                - generic [ref=e771]: Hammerite
            - listitem [ref=e772]:
              - link "Polycell" [ref=e773] [cursor=pointer]:
                - /url: https://www.polycell.co.uk/
                - generic [ref=e774]: Polycell
            - listitem [ref=e775]:
              - link "Dulux Heritage" [ref=e776] [cursor=pointer]:
                - /url: https://www.duluxheritage.co.uk
                - generic [ref=e777]: Dulux Heritage
      - generic [ref=e781]:
        - link "Footer logo" [ref=e783] [cursor=pointer]:
          - /url: https://www.dulux.co.uk/en
          - img "Dulux Logo" [ref=e785]
        - list [ref=e787]:
          - listitem [ref=e788]:
            - link "Manage Consent" [ref=e789] [cursor=pointer]:
              - /url: https://privacyportal-de.onetrust.com/ui/#/preferences/multipage/login/c080253a-46e2-4fe1-a168-299d71ceda02?BU=Deco&TargetCountry=GB
              - generic [ref=e790]: Manage Consent
          - listitem [ref=e791]:
            - link "Cookie Policy" [ref=e792] [cursor=pointer]:
              - /url: /en/cookies
              - generic [ref=e793]: Cookie Policy
          - listitem [ref=e794]:
            - link "Privacy Policy" [ref=e795] [cursor=pointer]:
              - /url: /en/privacy-policy
              - generic [ref=e796]: Privacy Policy
          - listitem [ref=e797]:
            - link "Legal" [ref=e798] [cursor=pointer]:
              - /url: /en/legal
              - generic [ref=e799]: Legal
          - listitem [ref=e800]:
            - link "MSA statement" [ref=e801] [cursor=pointer]:
              - /url: /en/akzonobel-modern-slavery-statement
              - generic [ref=e802]: MSA statement
          - listitem [ref=e803]:
            - link "Gender Pay Report" [ref=e804] [cursor=pointer]:
              - /url: /en/ici-gender-pay-report
              - generic [ref=e805]: Gender Pay Report
          - listitem [ref=e806]:
            - link "Other Akzonobel Sites" [ref=e807] [cursor=pointer]:
              - /url: https://www.akzonobel.com/en
              - generic [ref=e808]: Other Akzonobel Sites
          - listitem [ref=e809]:
            - link "Accessibility statement" [ref=e810] [cursor=pointer]:
              - /url: /en/accessibility-statement
              - generic [ref=e811]: Accessibility statement
        - generic [ref=e813]:
          - generic [ref=e814]: Copyright @ AkzoNobel Paints 2026
          - generic [ref=e815]:
            - link "Copyright Logo":
              - /url: https://www.akzonobel.com/en
              - generic [ref=e816] [cursor=pointer]:
                - img
  - contentinfo
  - dialog "We respect your privacy." [ref=e819]:
    - generic [ref=e820]:
      - generic [ref=e821]:
        - generic:
          - heading "We respect your privacy." [level=2] [ref=e822]
          - generic [ref=e823]:
            - text: By clicking “Accept All Cookies”, you agree to the storing of cookies on your device to enhance site navigation, analyze site usage, and assist in our marketing efforts.
            - link "More information about your privacy, opens in a new tab" [active] [ref=e824] [cursor=pointer]:
              - /url: https://www.dulux.co.uk/en/cookies
              - text: Cookie Statement for more information.
      - generic [ref=e826]:
        - button "Cookies Settings, Opens the preference center dialog" [ref=e827] [cursor=pointer]: Cookies Settings
        - generic [ref=e828]:
          - button "Reject All" [ref=e829] [cursor=pointer]
          - button "Accept All Cookies" [ref=e830] [cursor=pointer]
```

# Test source

```ts
  1  | import { Page } from '@playwright/test';
  2  | import { BasePage } from '../pages/BasePage';
  3  | 
  4  | const FIND_A_COLOUR_MENU_ITEM = 'Find a colour';
  5  | const MENU_HAMBURGER = 'Menu';
  6  | const SHOPPING_CART = 'Shopping Cart';
  7  | const SEARCH_FIELD = 'search-field';
  8  | const SEARCH_BUTTON = 'Search';
  9  | 
  10 | export class NavigationComponent extends BasePage {
  11 |   constructor(page: Page) {
  12 |     super(page);
  13 |   }
  14 | 
  15 |   async clickDropdownFindColour(): Promise<void> {
  16 |     await this.page.getByRole('button', { name: FIND_A_COLOUR_MENU_ITEM }).click();
  17 |     // The button triggers a page navigation (not a dropdown). Wait for the new
  18 |     // page to load before proceeding — without this, the next click resolves
  19 |     // against the outgoing page and hits a stale element.
  20 |     await this.page.waitForLoadState();
  21 |   }
  22 | 
  23 |   async clickDropdownHamburgerMenu(): Promise<void> {
> 24 |     await this.page.getByRole('button', { name: MENU_HAMBURGER }).click();
     |                                                                   ^ Error: locator.click: Test timeout of 30000ms exceeded.
  25 |   }
  26 | 
  27 |   async clickFindColour(): Promise<void> {
  28 |     await this.page.getByRole('link', { name: FIND_A_COLOUR_MENU_ITEM }).click();
  29 |   }
  30 | 
  31 |   async openShoppingCart(): Promise<void> {
  32 |     await this.page.getByRole('link', { name: SHOPPING_CART }).click();
  33 |   }
  34 | 
  35 |   async clickSearch(): Promise<void> {
  36 |     await this.page.getByRole('button', { name: SEARCH_BUTTON }).click();
  37 |   }
  38 | 
  39 |   async searchForColour(colour: string): Promise<void> {
  40 |     const searchField = this.page.getByRole('textbox', { name: SEARCH_FIELD });
  41 |     await searchField.fill(colour);
  42 |     await searchField.press('Enter');
  43 |   }
  44 | }
  45 | 
```