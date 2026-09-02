# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: accessibility/a11y.spec.ts >> Accessibility checks >> home page has no serious or critical accessibility violations
- Location: tests/specs/accessibility/a11y.spec.ts:18:7

# Error details

```
Error: Found 4 serious/critical violation(s): aria-prohibited-attr, aria-valid-attr, color-contrast, image-alt

expect(received).toHaveLength(expected)

Expected length: 0
Received length: 4
Received array:  [{"description": "Ensure ARIA attributes are not prohibited for an element's role", "help": "Elements must only use permitted ARIA attributes", "helpUrl": "https://dequeuniversity.com/rules/axe/4.13/aria-prohibited-attr?application=playwright", "id": "aria-prohibited-attr", "impact": "serious", "nodes": [Array], "tags": [Array]}, {"description": "Ensure attributes that begin with aria- are valid ARIA attributes", "help": "ARIA attributes must conform to valid names", "helpUrl": "https://dequeuniversity.com/rules/axe/4.13/aria-valid-attr?application=playwright", "id": "aria-valid-attr", "impact": "critical", "nodes": [Array], "tags": [Array]}, {"description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds", "help": "Elements must meet minimum color contrast ratio thresholds", "helpUrl": "https://dequeuniversity.com/rules/axe/4.13/color-contrast?application=playwright", "id": "color-contrast", "impact": "serious", "nodes": [Array], "tags": [Array]}, {"description": "Ensure <img> elements have alternative text or a role of none or presentation", "help": "Images must have alternative text", "helpUrl": "https://dequeuniversity.com/rules/axe/4.13/image-alt?application=playwright", "id": "image-alt", "impact": "critical", "nodes": [Array], "tags": [Array]}]
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to main content" [ref=e2] [cursor=pointer]:
    - /url: "#app"
  - paragraph [ref=e8] [cursor=pointer]: ✕
  - main [ref=e10]:
    - generic [ref=e11]:
      - navigation [ref=e13]:
        - generic [ref=e15]:
          - generic [ref=e16]:
            - link "Consumers" [ref=e17] [cursor=pointer]:
              - /url: "#"
            - link "Professional" [ref=e18] [cursor=pointer]:
              - /url: https://www.duluxtradepaintexpert.co.uk/en
          - link "Corporate logo" [ref=e20] [cursor=pointer]:
            - /url: https://www.akzonobel.com/en
            - img [ref=e22]
        - generic [ref=e25]:
          - link "Logo" [ref=e27] [cursor=pointer]:
            - /url: https://www.dulux.co.uk/en
            - img "Brand Logo" [ref=e29]
          - generic [ref=e30]:
            - list [ref=e33]:
              - listitem [ref=e34] [cursor=pointer]:
                - button "Find a colour" [ref=e35]:
                  - generic [ref=e36]: Find a colour
                  - img [ref=e38]
              - listitem [ref=e40] [cursor=pointer]:
                - button "Choose a product" [ref=e41]:
                  - generic [ref=e42]: Choose a product
                  - img [ref=e44]
              - listitem [ref=e46] [cursor=pointer]:
                - button "Ideas" [ref=e47]:
                  - generic [ref=e48]: Ideas
                  - img [ref=e50]
              - listitem [ref=e52] [cursor=pointer]:
                - button "Help & tools" [ref=e53]:
                  - generic [ref=e54]: Help & tools
                  - img [ref=e56]
              - listitem [ref=e58] [cursor=pointer]:
                - link "Sustainability" [ref=e59]:
                  - /url: /en/sustainability
                  - generic [ref=e60]: Sustainability
              - listitem [ref=e61] [cursor=pointer]:
                - link "Find a store" [ref=e62]:
                  - /url: /en/storefinder
                  - generic [ref=e63]: Find a store
            - list [ref=e65]:
              - listitem [ref=e66] [cursor=pointer]:
                - button "Search" [ref=e67]:
                  - img [ref=e69]
              - listitem [ref=e71] [cursor=pointer]:
                - link "Shopping Cart" [ref=e72]:
                  - /url: /en/store/cart
                  - img [ref=e74]
              - listitem [ref=e76] [cursor=pointer]:
                - button "User Icon" [ref=e77]:
                  - button "User Icon" [ref=e78]:
                    - img [ref=e79]
      - generic [ref=e84]:
        - list [ref=e87]:
          - listitem [ref=e88]:
            - img "img1" [ref=e90]
            - generic [ref=e94]:
              - heading "Life is what you paint it" [level=1] [ref=e99]
              - generic [ref=e100]:
                - button "I have some colours in mind" [ref=e101] [cursor=pointer]:
                  - generic [ref=e102]: I have some colours in mind
                - link "I would like some ideas" [ref=e103] [cursor=pointer]:
                  - /url: "#"
                  - generic [ref=e104]: I would like some ideas
          - listitem [ref=e105]:
            - generic [ref=e109]:
              - heading "Pick your colour palette" [level=2] [ref=e113]
              - generic [ref=e114]:
                - button "White" [ref=e115] [cursor=pointer]:
                  - generic [ref=e116]:
                    - generic:
                      - paragraph
                - button "Red" [ref=e117] [cursor=pointer]:
                  - generic [ref=e118]:
                    - generic:
                      - paragraph
                - button "Orange" [ref=e119] [cursor=pointer]:
                  - generic [ref=e120]:
                    - generic:
                      - paragraph
                - button "Gold" [ref=e121] [cursor=pointer]:
                  - generic [ref=e122]:
                    - generic:
                      - paragraph
                - button "Yellow" [ref=e123] [cursor=pointer]:
                  - generic [ref=e124]:
                    - generic:
                      - paragraph
                - button "Lime" [ref=e125] [cursor=pointer]:
                  - generic [ref=e126]:
                    - generic:
                      - paragraph
                - button "Green" [ref=e127] [cursor=pointer]:
                  - generic [ref=e128]:
                    - generic:
                      - paragraph
                - button "Teal" [ref=e129] [cursor=pointer]:
                  - generic [ref=e130]:
                    - generic:
                      - paragraph
                - button "Blue" [ref=e131] [cursor=pointer]:
                  - generic [ref=e132]:
                    - generic:
                      - paragraph
                - button "Violet" [ref=e133] [cursor=pointer]:
                  - generic [ref=e134]:
                    - generic:
                      - paragraph
                - button "Cool Neutral" [ref=e135] [cursor=pointer]:
                  - generic [ref=e136]:
                    - generic:
                      - paragraph
                - button "Warm Neutral" [ref=e137] [cursor=pointer]:
                  - generic [ref=e138]:
                    - generic:
                      - paragraph
          - listitem [ref=e139]:
            - generic [ref=e142]:
              - heading "I'll be painting ..." [level=2] [ref=e145]
              - generic [ref=e146]:
                - generic [ref=e149]:
                  - button "Bathroom" [ref=e150] [cursor=pointer]:
                    - generic [ref=e151]: Bathroom
                    - img [ref=e153]
                  - generic [ref=e155]:
                    - button "Bathroom" [ref=e156] [cursor=pointer]
                    - button "Living room" [ref=e157] [cursor=pointer]
                    - button "Dining room" [ref=e158] [cursor=pointer]
                    - button "Bedroom" [ref=e159] [cursor=pointer]
                    - button "Children's room" [ref=e160] [cursor=pointer]
                    - button "Hallway" [ref=e161] [cursor=pointer]
                    - button "Home office" [ref=e162] [cursor=pointer]
                    - button "Kitchen" [ref=e163] [cursor=pointer]
                - button "Next" [ref=e164] [cursor=pointer]:
                  - generic [ref=e165]: Next
          - listitem [ref=e166]:
            - generic [ref=e169]:
              - heading "It's ..." [level=2] [ref=e172]
              - generic [ref=e173]:
                - generic [ref=e176]:
                  - button "Radiator" [ref=e177] [cursor=pointer]:
                    - generic [ref=e178]: Radiator
                    - img [ref=e180]
                  - generic [ref=e182]:
                    - button "Radiator" [ref=e183] [cursor=pointer]
                    - button "Skirting boards" [ref=e184] [cursor=pointer]
                    - button "Metal" [ref=e185] [cursor=pointer]
                    - button "Windows" [ref=e186] [cursor=pointer]
                    - button "Window frames" [ref=e187] [cursor=pointer]
                    - button "Doors" [ref=e188] [cursor=pointer]
                    - button "Ceilings" [ref=e189] [cursor=pointer]
                    - button "Wood" [ref=e190] [cursor=pointer]
                    - button "Door frames" [ref=e191] [cursor=pointer]
                    - button "Walls" [ref=e192] [cursor=pointer]
                    - button "Masonry" [ref=e193] [cursor=pointer]
                    - button "Entrance doors" [ref=e194] [cursor=pointer]
                    - button "Cupboards" [ref=e195] [cursor=pointer]
                    - button "Furniture" [ref=e196] [cursor=pointer]
                    - button "uPVC" [ref=e197] [cursor=pointer]
                    - button "Garage doors" [ref=e198] [cursor=pointer]
                    - button "Tiles" [ref=e199] [cursor=pointer]
                    - button "Melamine" [ref=e200] [cursor=pointer]
                - button "Next" [ref=e201] [cursor=pointer]:
                  - generic [ref=e202]: Next
        - generic [ref=e207]:
          - 'link "Dulux Colours of the Year 2026: The Rhythm of Blues Right Arrow" [ref=e210] [cursor=pointer]':
            - /url: /en/dulux-colours-of-the-year-2026
            - generic [ref=e215]:
              - 'heading "Dulux Colours of the Year 2026: The Rhythm of Blues" [level=4] [ref=e217]'
              - generic:
                - button "Right Arrow" [disabled]:
                  - generic:
                    - img
          - link "Watch our new TV ad - Life is what you paint it Right Arrow" [ref=e219] [cursor=pointer]:
            - /url: /en/life-is-what-you-paint-it
            - generic [ref=e224]:
              - heading "Watch our new TV ad - Life is what you paint it" [level=4] [ref=e226]
              - generic:
                - button "Right Arrow" [disabled]:
                  - generic:
                    - img
          - link "Start your colour journey with our tester range Right Arrow" [ref=e228] [cursor=pointer]:
            - /url: /en/testers
            - generic [ref=e233]:
              - heading "Start your colour journey with our tester range" [level=4] [ref=e235]
              - generic:
                - button "Right Arrow" [disabled]:
                  - generic:
                    - img
          - link "Find a store near you Right Arrow" [ref=e237] [cursor=pointer]:
            - /url: /en/storefinder
            - generic [ref=e242]:
              - heading "Find a store near you" [level=4] [ref=e244]
              - generic:
                - button "Right Arrow" [disabled]:
                  - generic:
                    - img
        - generic [ref=e252]:
          - generic [ref=e253]:
            - generic [ref=e254]:
              - link "Social post with image from Jan 22 by null (ourhalliwellhome), open post overlay" [ref=e255] [cursor=pointer]:
                - generic [ref=e259]:
                  - generic [ref=e260]:
                    - generic [ref=e262]: "@ourhalliwellhome"
                    - generic [ref=e263]:
                      - generic [ref=e264]: Jan 22
                      - generic "View 's post on instagram (opens in a new window)" [ref=e265]:
                        - img [ref=e266]
                  - list [ref=e271]:
                    - listitem [ref=e272]:
                      - generic "Share on Facebook (opens in a new window)" [ref=e273]: 
                    - listitem [ref=e274]:
                      - generic "Share on X (opens in a new window)" [ref=e275]: 
                    - listitem [ref=e276]:
                      - generic "Share on Pinterest (opens in a new window)" [ref=e277]: 
                    - text: 
              - link "Social post with image from Feb 26 by Romi 🕊💫 (ouroakhillhome), open post overlay" [ref=e278] [cursor=pointer]:
                - generic [ref=e282]:
                  - generic [ref=e283]:
                    - generic [ref=e284]:
                      - generic [ref=e285]: Romi 🕊💫
                      - generic [ref=e286]: "@ouroakhillhome"
                    - generic [ref=e287]:
                      - generic [ref=e288]: Feb 26
                      - generic "View Romi 🕊💫's post on instagram (opens in a new window)" [ref=e289]:
                        - img [ref=e290]
                  - list [ref=e295]:
                    - listitem [ref=e296]:
                      - generic "Share on Facebook (opens in a new window)" [ref=e297]: 
                    - listitem [ref=e298]:
                      - generic "Share on X (opens in a new window)" [ref=e299]: 
                    - listitem [ref=e300]:
                      - generic "Share on Pinterest (opens in a new window)" [ref=e301]: 
                    - text: 
              - link "Social post with image from Jan 17 by null (tweedandtwinkles), open post overlay" [ref=e302] [cursor=pointer]:
                - generic [ref=e306]:
                  - generic [ref=e307]:
                    - generic [ref=e309]: "@tweedandtwinkles"
                    - generic [ref=e310]:
                      - generic [ref=e311]: Jan 17
                      - generic "View 's post on instagram (opens in a new window)" [ref=e312]:
                        - img [ref=e313]
                  - list [ref=e318]:
                    - listitem [ref=e319]:
                      - generic "Share on Facebook (opens in a new window)" [ref=e320]: 
                    - listitem [ref=e321]:
                      - generic "Share on X (opens in a new window)" [ref=e322]: 
                    - listitem [ref=e323]:
                      - generic "Share on Pinterest (opens in a new window)" [ref=e324]: 
                    - text: 
              - link "Social post with image from Jan 16 by Renovating Number 51 🏠 (renoat51_), open post overlay" [ref=e325] [cursor=pointer]:
                - generic [ref=e329]:
                  - generic [ref=e330]:
                    - generic [ref=e331]:
                      - generic [ref=e332]: Renovating Number 51 🏠
                      - generic [ref=e333]: "@renoat51_"
                    - generic [ref=e334]:
                      - generic [ref=e335]: Jan 16
                      - generic "View Renovating Number 51 🏠's post on instagram (opens in a new window)" [ref=e336]:
                        - img [ref=e337]
                  - list [ref=e342]:
                    - listitem [ref=e343]:
                      - generic "Share on Facebook (opens in a new window)" [ref=e344]: 
                    - listitem [ref=e345]:
                      - generic "Share on X (opens in a new window)" [ref=e346]: 
                    - listitem [ref=e347]:
                      - generic "Share on Pinterest (opens in a new window)" [ref=e348]: 
                    - text: 
              - link "Social post with image from Jan 16 by Victoria Russell (underrussellsroof), open post overlay" [ref=e349] [cursor=pointer]:
                - generic [ref=e353]:
                  - generic [ref=e354]:
                    - generic [ref=e355]:
                      - generic [ref=e356]: Victoria Russell
                      - generic [ref=e357]: "@underrussellsroof"
                    - generic [ref=e358]:
                      - generic [ref=e359]: Jan 16
                      - generic "View Victoria Russell's post on instagram (opens in a new window)" [ref=e360]:
                        - img [ref=e361]
                  - list [ref=e366]:
                    - listitem [ref=e367]:
                      - generic "Share on Facebook (opens in a new window)" [ref=e368]: 
                    - listitem [ref=e369]:
                      - generic "Share on X (opens in a new window)" [ref=e370]: 
                    - listitem [ref=e371]:
                      - generic "Share on Pinterest (opens in a new window)" [ref=e372]: 
                    - text: 
              - link "Social post with image from Jan 16 by Emma McVeigh (homebird_mrsmac), open post overlay" [ref=e373] [cursor=pointer]:
                - generic [ref=e377]:
                  - generic [ref=e378]:
                    - generic [ref=e379]:
                      - generic [ref=e380]: Emma McVeigh
                      - generic [ref=e381]: "@homebird_mrsmac"
                    - generic [ref=e382]:
                      - generic [ref=e383]: Jan 16
                      - generic "View Emma McVeigh's post on instagram (opens in a new window)" [ref=e384]:
                        - img [ref=e385]
                  - list [ref=e390]:
                    - listitem [ref=e391]:
                      - generic "Share on Facebook (opens in a new window)" [ref=e392]: 
                    - listitem [ref=e393]:
                      - generic "Share on X (opens in a new window)" [ref=e394]: 
                    - listitem [ref=e395]:
                      - generic "Share on Pinterest (opens in a new window)" [ref=e396]: 
                    - text: 
              - link "Social post with image from Jan 15 by Ashleigh Boyd (isntitgorgeous), open post overlay" [ref=e397] [cursor=pointer]:
                - generic [ref=e401]:
                  - generic [ref=e402]:
                    - generic [ref=e403]:
                      - generic [ref=e404]: Ashleigh Boyd
                      - generic [ref=e405]: "@isntitgorgeous"
                    - generic [ref=e406]:
                      - generic [ref=e407]: Jan 15
                      - generic "View Ashleigh Boyd's post on instagram (opens in a new window)" [ref=e408]:
                        - img [ref=e409]
                  - list [ref=e414]:
                    - listitem [ref=e415]:
                      - generic "Share on Facebook (opens in a new window)" [ref=e416]: 
                    - listitem [ref=e417]:
                      - generic "Share on X (opens in a new window)" [ref=e418]: 
                    - listitem [ref=e419]:
                      - generic "Share on Pinterest (opens in a new window)" [ref=e420]: 
                    - text: 
              - link "Social post with image from Jan 14 by Emily Catterall (emilycat_xx), open post overlay" [ref=e421] [cursor=pointer]:
                - generic [ref=e425]:
                  - generic [ref=e426]:
                    - generic [ref=e427]:
                      - generic [ref=e428]: Emily Catterall
                      - generic [ref=e429]: "@emilycat_xx"
                    - generic [ref=e430]:
                      - generic [ref=e431]: Jan 14
                      - generic "View Emily Catterall's post on instagram (opens in a new window)" [ref=e432]:
                        - img [ref=e433]
                  - list [ref=e438]:
                    - listitem [ref=e439]:
                      - generic "Share on Facebook (opens in a new window)" [ref=e440]: 
                    - listitem [ref=e441]:
                      - generic "Share on X (opens in a new window)" [ref=e442]: 
                    - listitem [ref=e443]:
                      - generic "Share on Pinterest (opens in a new window)" [ref=e444]: 
                    - text: 
            - button "next slide" [ref=e445] [cursor=pointer]:
              - text: 
              - generic [ref=e446]: Next
            - button "previous slide" [disabled] [ref=e447]:
              - text: 
              - generic [ref=e448]: Prev
          - generic [ref=e449]:
            - button "pagination-dot" [ref=e450] [cursor=pointer]
            - button "pagination-dot" [ref=e451] [cursor=pointer]
            - button "pagination-dot" [ref=e452] [cursor=pointer]
            - button "pagination-dot" [ref=e453] [cursor=pointer]
            - button "pagination-dot" [ref=e454] [cursor=pointer]
            - button "pagination-dot" [ref=e455] [cursor=pointer]
            - button "pagination-dot" [ref=e456] [cursor=pointer]
            - button "pagination-dot" [ref=e457] [cursor=pointer]
        - generic [ref=e465]:
          - tablist [ref=e468]:
            - tab "Warm neutrals" [ref=e469]:
              - region "Warm neutrals" [ref=e470] [cursor=pointer]
            - tab "Whites" [ref=e471]:
              - region "Whites" [ref=e472] [cursor=pointer]
            - tab "Cool Neutrals" [ref=e473]:
              - region "Cool Neutrals" [ref=e474] [cursor=pointer]
            - tab "Greens" [ref=e475]:
              - region "Greens" [ref=e476] [cursor=pointer]
            - tab "Popular Shades" [ref=e477]:
              - region "Popular Shades" [ref=e478] [cursor=pointer]
          - tabpanel [ref=e479]
      - generic [ref=e598]:
        - generic:
          - text: "If you are human, leave this field blank:"
          - textbox "If you are human, leave this field blank:" [ref=e599]
      - generic [ref=e602]:
        - generic [ref=e604]:
          - generic [ref=e605]: Easy and safe payment
          - img "Paypal" [ref=e607]
          - img "visa" [ref=e609]
          - img "master card" [ref=e611]
          - img "maestro" [ref=e613]
          - img "ideal" [ref=e615]
          - img "cb" [ref=e617]
          - img "klarna" [ref=e619]
        - generic [ref=e621]:
          - generic [ref=e622]: Follow us
          - link "Follow us" [ref=e623] [cursor=pointer]:
            - /url: https://www.facebook.com/dulux
            - img [ref=e625]
          - link "Follow us" [ref=e627] [cursor=pointer]:
            - /url: https://www.instagram.com/duluxuk/?hl=en
            - img [ref=e629]
          - link "Follow us" [ref=e632] [cursor=pointer]:
            - /url: https://www.pinterest.co.uk/duluxuk/
            - img [ref=e634]
          - link "Follow us" [ref=e636] [cursor=pointer]:
            - /url: https://twitter.com/duluxuk
            - img [ref=e638]
          - link "Follow us" [ref=e640] [cursor=pointer]:
            - /url: https://www.youtube.com/user/DuluxUK
            - img [ref=e642]
          - link "Follow us" [ref=e644] [cursor=pointer]:
            - /url: https://anchor.fm/lets-colour
            - img [ref=e646]
      - generic [ref=e651]:
        - list [ref=e657]:
          - listitem [ref=e658]:
            - link "About Dulux" [ref=e659] [cursor=pointer]:
              - /url: /en/about-dulux
              - generic [ref=e660]: About Dulux
          - listitem [ref=e661]:
            - link "Contact us" [ref=e662] [cursor=pointer]:
              - /url: /en/contact-us
              - generic [ref=e663]: Contact us
          - listitem [ref=e664]:
            - link "Find a stockist" [ref=e665] [cursor=pointer]:
              - /url: /en/storefinder
              - generic [ref=e666]: Find a stockist
          - listitem [ref=e667]:
            - link "Delivery Information" [ref=e668] [cursor=pointer]:
              - /url: /en/delivery-information
              - generic [ref=e669]: Delivery Information
          - listitem [ref=e670]:
            - link "Refunds and Cancellations" [ref=e671] [cursor=pointer]:
              - /url: /en/refunds-and-cancellations
              - generic [ref=e672]: Refunds and Cancellations
          - listitem [ref=e673]:
            - link "Terms and Conditions" [ref=e674] [cursor=pointer]:
              - /url: /en/terms-and-conditions
              - generic [ref=e675]: Terms and Conditions
          - listitem [ref=e676]:
            - link "Sitemap" [ref=e677] [cursor=pointer]:
              - /url: /en/html-site-map
              - generic [ref=e678]: Sitemap
        - list [ref=e684]:
          - listitem [ref=e685]:
            - link "Accessibility" [ref=e686] [cursor=pointer]:
              - /url: /en/accessibility
              - generic [ref=e687]: Accessibility
          - listitem [ref=e688]:
            - link "Colour Accuracy" [ref=e689] [cursor=pointer]:
              - /url: /en/colour-accuracy
              - generic [ref=e690]: Colour Accuracy
          - listitem [ref=e691]:
            - link "Cookies Settings" [ref=e692] [cursor=pointer]:
              - /url: javascript:void(0);
          - listitem [ref=e693]:
            - 'link "Terms and Conditions for #YesDulux" [ref=e694] [cursor=pointer]':
              - /url: /en/terms-and-conditions/yes-dulux
              - generic [ref=e695]: "Terms and Conditions for #YesDulux"
          - listitem [ref=e696]:
            - link "Sustainability" [ref=e697] [cursor=pointer]:
              - /url: /en/sustainability
              - generic [ref=e698]: Sustainability
        - list [ref=e704]:
          - listitem [ref=e705]:
            - link "Cuprinol" [ref=e706] [cursor=pointer]:
              - /url: https://www.cuprinol.co.uk/
              - generic [ref=e707]: Cuprinol
          - listitem [ref=e708]:
            - link "Dulux Select Decorators" [ref=e709] [cursor=pointer]:
              - /url: https://www.duluxselectdecorators.co.uk/
              - generic [ref=e710]: Dulux Select Decorators
          - listitem [ref=e711]:
            - link "Dulux Trade" [ref=e712] [cursor=pointer]:
              - /url: https://www.duluxtradepaintexpert.co.uk/en
              - generic [ref=e713]: Dulux Trade
          - listitem [ref=e714]:
            - link "Hammerite" [ref=e715] [cursor=pointer]:
              - /url: https://www.hammerite.co.uk/
              - generic [ref=e716]: Hammerite
          - listitem [ref=e717]:
            - link "Polycell" [ref=e718] [cursor=pointer]:
              - /url: https://www.polycell.co.uk/
              - generic [ref=e719]: Polycell
          - listitem [ref=e720]:
            - link "Dulux Heritage" [ref=e721] [cursor=pointer]:
              - /url: https://www.duluxheritage.co.uk
              - generic [ref=e722]: Dulux Heritage
      - generic [ref=e726]:
        - link "Footer logo" [ref=e728] [cursor=pointer]:
          - /url: https://www.dulux.co.uk/en
          - img "Dulux Logo" [ref=e730]
        - list [ref=e732]:
          - listitem [ref=e733]:
            - link "Manage Consent" [ref=e734] [cursor=pointer]:
              - /url: https://privacyportal-de.onetrust.com/ui/#/preferences/multipage/login/c080253a-46e2-4fe1-a168-299d71ceda02?BU=Deco&TargetCountry=GB
              - generic [ref=e735]: Manage Consent
          - listitem [ref=e736]:
            - link "Cookie Policy" [ref=e737] [cursor=pointer]:
              - /url: /en/cookies
              - generic [ref=e738]: Cookie Policy
          - listitem [ref=e739]:
            - link "Privacy Policy" [ref=e740] [cursor=pointer]:
              - /url: /en/privacy-policy
              - generic [ref=e741]: Privacy Policy
          - listitem [ref=e742]:
            - link "Legal" [ref=e743] [cursor=pointer]:
              - /url: /en/legal
              - generic [ref=e744]: Legal
          - listitem [ref=e745]:
            - link "MSA statement" [ref=e746] [cursor=pointer]:
              - /url: /en/akzonobel-modern-slavery-statement
              - generic [ref=e747]: MSA statement
          - listitem [ref=e748]:
            - link "Gender Pay Report" [ref=e749] [cursor=pointer]:
              - /url: /en/ici-gender-pay-report
              - generic [ref=e750]: Gender Pay Report
          - listitem [ref=e751]:
            - link "Other Akzonobel Sites" [ref=e752] [cursor=pointer]:
              - /url: https://www.akzonobel.com/en
              - generic [ref=e753]: Other Akzonobel Sites
          - listitem [ref=e754]:
            - link "Accessibility statement" [ref=e755] [cursor=pointer]:
              - /url: /en/accessibility-statement
              - generic [ref=e756]: Accessibility statement
        - generic [ref=e758]:
          - generic [ref=e759]: Copyright @ AkzoNobel Paints 2026
          - generic [ref=e760]:
            - link "Copyright Logo":
              - /url: https://www.akzonobel.com/en
              - generic [ref=e761] [cursor=pointer]:
                - img
  - contentinfo
```

# Test source

```ts
  1  | import AxeBuilder from '@axe-core/playwright';
  2  | import { test, expect } from '../../fixtures';
  3  | 
  4  | // Automated accessibility scans (axe-core) of the pages the purchase journey
  5  | // touches. This runs against the live, third-party-controlled production site,
  6  | // so we only fail on 'serious'/'critical' impact violations — 'minor'/'moderate'
  7  | // findings are typically cosmetic and would make this suite flaky on content we
  8  | // don't own. The full violation list is still attached to the report for review.
  9  | //
  10 | // Deliberately NOT tagged @regression: an initial run found real, pre-existing
  11 | // violations on production (see BUG_REPORTS.md) that are outside this suite's
  12 | // control to fix. Keeping this out of the default CI gate avoids a permanently
  13 | // red pipeline; it's run on demand (`npm run test:a11y`) as an audit, and can
  14 | // be promoted into @regression once the known findings are resolved upstream.
  15 | test.describe('Accessibility checks', { tag: ['@a11y', '@desktop'] }, () => {
  16 |   const SERIOUS_OR_WORSE = ['serious', 'critical'];
  17 | 
  18 |   test('home page has no serious or critical accessibility violations', async ({
  19 |     page,
  20 |     homePage,
  21 |   }, testInfo) => {
  22 |     await homePage.open();
  23 | 
  24 |     const results = await new AxeBuilder({ page }).analyze();
  25 | 
  26 |     await testInfo.attach('axe-results-home.json', {
  27 |       body: JSON.stringify(results.violations, null, 2),
  28 |       contentType: 'application/json',
  29 |     });
  30 | 
  31 |     const seriousOrWorse = results.violations.filter((v) =>
  32 |       SERIOUS_OR_WORSE.includes(v.impact ?? ''),
  33 |     );
  34 |     expect(
  35 |       seriousOrWorse,
  36 |       `Found ${seriousOrWorse.length} serious/critical violation(s): ${seriousOrWorse.map((v) => v.id).join(', ')}`,
> 37 |     ).toHaveLength(0);
     |       ^ Error: Found 4 serious/critical violation(s): aria-prohibited-attr, aria-valid-attr, color-contrast, image-alt
  38 |   });
  39 | 
  40 |   test('cart page has no serious or critical accessibility violations', async ({
  41 |     page,
  42 |     cartPage,
  43 |   }, testInfo) => {
  44 |     await cartPage.open();
  45 | 
  46 |     const results = await new AxeBuilder({ page }).analyze();
  47 | 
  48 |     await testInfo.attach('axe-results-cart.json', {
  49 |       body: JSON.stringify(results.violations, null, 2),
  50 |       contentType: 'application/json',
  51 |     });
  52 | 
  53 |     const seriousOrWorse = results.violations.filter((v) =>
  54 |       SERIOUS_OR_WORSE.includes(v.impact ?? ''),
  55 |     );
  56 |     expect(
  57 |       seriousOrWorse,
  58 |       `Found ${seriousOrWorse.length} serious/critical violation(s): ${seriousOrWorse.map((v) => v.id).join(', ')}`,
  59 |     ).toHaveLength(0);
  60 |   });
  61 | });
  62 | 
```