import re

with open('src/app/services/portfolio.ts', 'r') as f:
    content = f.read()

# For lines 354, 360, 384, 403, 427 we need to fix the unescaped single quotes
content = content.replace("reason: 'It nails that surreal, mysterious aura—reminiscent of the eerie, calm authority of Wonder of U from JoJo's Bizarre Adventure. The suited man with the floating green apple obscures what's right in front of you, capturing a sense of unstoppable, quiet calamity and existential mystery.'", "reason: \"It nails that surreal, mysterious aura—reminiscent of the eerie, calm authority of Wonder of U from JoJo's Bizarre Adventure. The suited man with the floating green apple obscures what's right in front of you, capturing a sense of unstoppable, quiet calamity and existential mystery.\"")

content = content.replace("reason: 'It turns raw emotion and psychological turmoil into movement. The swirling night sky doesn't feel static; it vibrates with energy, making you feel the weight of Van Gogh's inner world through vivid blues and burning yellows.'", "reason: \"It turns raw emotion and psychological turmoil into movement. The swirling night sky doesn't feel static; it vibrates with energy, making you feel the weight of Van Gogh's inner world through vivid blues and burning yellows.\"")

content = content.replace("reason: 'It visually translates pure anxiety. The wavy lines of the environment echo the figure's internal panic, making the landscape itself feel like it’s vibrating with terror.'", "reason: \"It visually translates pure anxiety. The wavy lines of the environment echo the figure's internal panic, making the landscape itself feel like it’s vibrating with terror.\"")

content = content.replace("reason: 'A grand celebration of intellect, symmetry, and perspective. Gathering history's greatest philosophers into one perfectly proportioned architectural space gives it incredible depth and monumental scale.'", "reason: \"A grand celebration of intellect, symmetry, and perspective. Gathering history's greatest philosophers into one perfectly proportioned architectural space gives it incredible depth and monumental scale.\"")

content = content.replace("wikimediaFile: 'File:Oskar_Rex_-_C'est_fini.jpg',", "wikimediaFile: \"File:Oskar_Rex_-_C'est_fini.jpg\",")

with open('src/app/services/portfolio.ts', 'w') as f:
    f.write(content)
