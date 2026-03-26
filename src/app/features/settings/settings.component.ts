import { Component, inject, signal } from '@angular/core';
import { HasUnsavedChanges } from '../../guards/unsaved-changes.guard';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  imports: [FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements HasUnsavedChanges {
  private changed = signal(false);
  private router = inject(Router);

  selectedTheme = '';

  markAsChanged() {
    console.log('selectedTheme', this.selectedTheme);

    this.changed.set(true);
  }

  hasunsavedChanges(): boolean {
    return this.changed();
  }

  save() {
    this;
    this.changed.set(false);
  }

  goBack() {
    console.log('changed', this.changed);

    this.router.navigate(['/board']);
  }
}
