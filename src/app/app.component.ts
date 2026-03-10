import { Component, signal, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div style="padding: 30px; font-family: Arial, sans-serif;">
      <h1>📋 Gerenciador Full Stack</h1>
      
      <input [(ngModel)]="novaTarefa" placeholder="Digite a tarefa para o Java...">
      <button (click)="adicionar()">Enviar para o Backend</button>

      <ul>
        @for (item of lista(); track item.id) {
          <li>{{ item.descricao }}</li>
        }
      </ul>
    </div>
  `
})
export class AppComponent implements OnInit {
  private http = inject(HttpClient); // "Injeta" o serviço de comunicação
  novaTarefa = '';
  lista = signal<any[]>([]);

  // Quando o app inicia, ele busca as tarefas do Java
  ngOnInit() {
    this.carregar();
  }

  carregar() {
    this.http.get<any[]>('http://localhost:8080/api/tarefas')
      .subscribe(dados => this.lista.set(dados));
  }

  adicionar() {
    if (!this.novaTarefa.trim()) return;

    const payload = { descricao: this.novaTarefa };
    
    this.http.post('http://localhost:8080/api/tarefas', payload)
      .subscribe(() => {
        this.carregar(); // Recarrega a lista após salvar no banco
        this.novaTarefa = '';
      });
  }
}