import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-legendary-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './legendary-item.html',
  styleUrl: './legendary-item.scss'
})
export class LegendaryItemComponent {
  mace = {
    name: "Plus Ultra",
    iconUrl: "https://minecraft.wiki/images/Mace_JE1_BE1.png",
    rarityColor: "#FFAA00", // Gold/Legendary
    enchantments: ["Breach IV", "Wind Burst I", "Fire Aspect II", "Unbreaking III", "Mending"],
    lore: [
      "Forged from a dense Heavy Core encrusted in pitch-black netherite, Plus Ultra",
      "is the physical embodiment of going beyond limits—an absolute execution tool",
      "designed to turn gravity itself into a weapon of total spatial destruction.",
      "It exists solely to deliver an inescapable drop hit, transforming a high-altitude",
      "dive into a world-shattering impact that shatters any defensive stance on the SMP.",
      " ",
      "When paired with your elytra (Throughout Heaven and Earth, I alone am the Honoured One),",
      "you dive from the stratosphere at Mach 3, channeling all kinetic momentum straight",
      "into the head of the weapon. The moment it connects, Breach IV completely bypasses",
      "and shreds through the target’s netherite armor, allowing your falling speed to deal",
      "maximum raw, armor-penetrating damage. As the blow lands, Wind Burst I detonates",
      "beneath you, giving you an immediate upward lift to re-position, stay mobile,",
      "and prepare for the next assault."
    ]
  };
}
