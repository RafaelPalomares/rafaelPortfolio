import re
import json

data = """
    {
      title: 'Mona Lisa',
      artist: 'Leonardo da Vinci',
      wikipediaTitle: 'Mona_Lisa',
      copyright: 'Quelle: Gwengoat / Getty Images',
      reason: 'Ever since childhood, seeing her in person was a dream waiting to be fulfilled. Standing before her this spring was pure joy—an unforgettable moment where years of anticipation finally met reality. Beyond that personal connection, her subtle, impossible-to-pin-down expression and sfumato depth make her the ultimate masterpiece.'
    },
    {
      title: 'The Son of Man',
      artist: 'René Magritte',
      wikipediaTitle: 'The_Son_of_Man',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e5/Magritte_TheSonOfMan.jpg',
      copyright: 'Quelle: STR New / Reuters',
      reason: 'It nails that surreal, mysterious aura—reminiscent of the eerie, calm authority of Wonder of U from JoJo\'s Bizarre Adventure. The suited man with the floating green apple obscures what\'s right in front of you, capturing a sense of unstoppable, quiet calamity and existential mystery.'
    },
    {
      title: 'The Starry Night',
      artist: 'Vincent van Gogh',
      wikipediaTitle: 'The_Starry_Night',
      copyright: 'Quelle: Fine Art / Corbis via Getty Images',
      reason: 'It turns raw emotion and psychological turmoil into movement. The swirling night sky doesn\'t feel static; it vibrates with energy, making you feel the weight of Van Gogh\'s inner world through vivid blues and burning yellows.'
    },
    {
      title: 'Sunflowers',
      artist: 'Vincent van Gogh',
      wikipediaTitle: 'Sunflowers_(Van_Gogh_series)',
      reason: 'A masterclass in texture and warmth. It takes a simple subject and gives it raw, textured vitality—showing beauty in different stages of life and decay with thick, confident impasto strokes.'
    },
    {
      title: 'The Kiss',
      artist: 'Gustav Klimt',
      wikipediaTitle: 'The_Kiss_(Klimt)',
      reason: 'The golden radiance and geometric patterns create a sense of timeless love. It feels less like a standard painting and more like an icon glowing from within, blending intimacy with decorative splendor.'
    },
    {
      title: 'The Great Wave off Kanagawa',
      artist: 'Hokusai',
      wikipediaTitle: 'The_Great_Wave_off_Kanagawa',
      reason: 'The composition is legendary: the overwhelming force of nature framing Mount Fuji in the background. It perfectly captures tension, scale, and the contrast between momentary chaos and permanent stability.'
    },
    {
      title: 'The Scream',
      artist: 'Edvard Munch',
      wikipediaTitle: 'The_Scream',
      reason: 'It visually translates pure anxiety. The wavy lines of the environment echo the figure\'s internal panic, making the landscape itself feel like it’s vibrating with terror.'
    },
    {
      title: 'The Birth of Venus',
      artist: 'Sandro Botticelli',
      wikipediaTitle: 'The_Birth_of_Venus',
      reason: 'Pure classical elegance and mythological grace. The flowing lines, soft colors, and effortless movement give it an ethereal, dreamlike quality that stands out across art history.'
    },
    {
      title: 'The Persistence of Memory',
      artist: 'Salvador Dalí',
      wikipediaTitle: 'The_Persistence_of_Memory',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg',
      reason: 'It distorts reality in the best way possible. The melting clocks in a stark, barren landscape capture the fluid, nonsensical nature of time and dreams.'
    },
    {
      title: 'The School of Athens',
      artist: 'Raphael',
      wikipediaTitle: 'The_School_of_Athens',
      reason: 'A grand celebration of intellect, symmetry, and perspective. Gathering history\'s greatest philosophers into one perfectly proportioned architectural space gives it incredible depth and monumental scale.'
    },
    {
      title: 'The Coronation of Napoleon',
      artist: 'Jacques-Louis David',
      wikipediaTitle: 'Coronation_of_Napoleon',
      reason: 'Pure theatrical propaganda on a massive scale. The sheer detail, grand lighting, and meticulous crowd rendering make you feel the weight of empire and political drama.'
    },
    {
      title: 'Napoleon Crossing the Alps',
      artist: 'Jacques-Louis David',
      wikipediaTitle: 'Napoleon_Crossing_the_Alps',
      copyright: 'Quelle: Print Collector / Print Collector/Getty Images',
      reason: 'The ultimate image of power, motion, and heroism. The rearing horse, dramatic cloak, and ideal posture scream unshakeable confidence and historical destiny.'
    },
    {
      title: 'Napoleon I on his Imperial Throne',
      artist: 'Jean-Auguste-Dominique Ingres',
      wikipediaTitle: 'Napoleon_I_on_his_Imperial_Throne',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Ingres%2C_Napoleon_on_his_Imperial_throne.jpg',
      reason: 'It presents Napoleon almost as a deity or Roman emperor. The rigid symmetry, opulent robes, and cold gaze create a breathtaking display of absolute authority.'
    },
    {
      title: "C'est fini (It is finished)",
      artist: 'Oskar Rex',
      wikimediaFile: 'File:Oskar_Rex_-_C\'est_fini.jpg',
      reason: 'A haunting contrast to the imperial portraits. Showing Napoleon isolated, looking out at the ocean on Saint Helena, it captures the melancholic end of an era and the quiet weight of fallen ambition.'
    }
"""

with open('src/app/services/portfolio.ts', 'r') as f:
    content = f.read()

# Replace the artGallery array content
pattern = r'(artGallery:\s*\[).*?(  \],\n\n  socials:)'
new_content = re.sub(pattern, rf'\1\n{data}\2', content, flags=re.DOTALL)

with open('src/app/services/portfolio.ts', 'w') as f:
    f.write(new_content)
