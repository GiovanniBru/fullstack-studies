import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule], // Necessário para o [(ngModel)] funcionar
  template: `
    <div style="padding: 30px; font-family: Arial, sans-serif;">
      <h1>📋 Minhas Tarefas - Angular 20</h1>
      
      <div style="margin-bottom: 20px;">
        <input [(ngModel)]="novaTarefa" placeholder="O que vamos programar hoje?">
        <button (click)="adicionar()">Adicionar</button>
      </div>

      <ul style="list-style: none; padding: 0;">
        @for (item of lista(); track item) {
          <li style="background: #f4f4f4; margin: 5px 0; padding: 10px; border-left: 5px solid #007bff;">
            {{ item }}
          </li>
        } @empty {
          <p>Nenhuma tarefa na lista. Aproveite o café! ☕</p>
        }
      </ul>
    </div>
  `
})
export class AppComponent {
  novaTarefa = signal('');
  lista = signal<string[]>([]);

  adicionar() {
    if (this.novaTarefa().trim()) {
      // No Angular 20 usamos o .update para atualizar Signals
      this.lista.update(atual => [...atual, this.novaTarefa()]);
      this.novaTarefa.set(''); // Limpa o input
    }
  }
}