import { Component, computed, inject } from '@angular/core';
import { CharacterListComponent } from "../../components/dragonball/character-list/character-list";
import { CharacterAddForm } from "../../components/dragonball/character-add-form/character-add-form";
import { DragonballService } from '../../services/dragonball.service';

@Component({
  templateUrl: './dragonball-super.html',
  styleUrl: './dragonball-super.css',
  imports: [CharacterListComponent, CharacterListComponent, CharacterAddForm],
})
export class DragonballSuperComponent {
  dragonballService = inject(DragonballService);
  
  powerClasses = computed(() => {
    return {
      'text-dark': true,
    }
  })
}
