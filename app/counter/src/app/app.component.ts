import { Component } from '@angular/core';
import { ConnectionStore, WalletStore } from '@heavy-duty/wallet-adapter';
import { ProgramStore } from '@heavy-duty/ng-anchor';
import { CounterStore } from './counter.store';

@Component({
  selector: 'app-root',
  template: `
    <header>
      <h1>Counter</h1>
      <hd-wallet-multi-button></hd-wallet-multi-button>
    </header>
    <main>
      <section>
        <header>
          <h2>My counters</h2>

          <button mat-raised-button color="primary" (click)="onReload()">
            Reload
          </button>
          <button
            mat-raised-button
            color="primary"
            (click)="onInitCounter()"
            [disabled]="(connected$ | ngrxPush) === false"
          >
            New
          </button>
        </header>

        <mat-list role="list">
          <mat-list-item
            *ngFor="let counter of counters$ | ngrxPush"
            role="listitem"
            class="mat-elevation-z4"
            style="height: auto; width: 450px; margin-bottom: 1rem; padding: 0.5rem 1rem; background-color: rgba(255, 255, 255, 0.05)"
          >
            <div style="width: 100%;">
              <p style="text-align: center">{{ counter.id }}</p>
              <div
                style="display: flex; justify-content: center; align-items: center"
              >
                <p
                  style="font-size: 2rem; font-weight: 800; margin-right: 0.5rem; margin-bottom: 0"
                >
                  {{ counter.data }}
                </p>
                <button
                  mat-mini-fab
                  color="accent"
                  (click)="onIncrementCounter(counter.id)"
                >
                  <mat-icon>add</mat-icon>
                </button>
              </div>
            </div>
          </mat-list-item>
        </mat-list>
      </section>
    </main>
  `,
  providers: [WalletStore, ConnectionStore, ProgramStore, CounterStore],
})
export class AppComponent {
  readonly counters$ = this._counterStore.counters$;
  readonly connected$ = this._walletStore.connected$;

  constructor(
    private readonly _programStore: ProgramStore,
    private readonly _connectionStore: ConnectionStore,
    private readonly _walletStore: WalletStore,
    private readonly _counterStore: CounterStore
  ) {}

  ngOnInit() {
    this._connectionStore.setEndpoint('http://localhost:8899');
    this._programStore.loadConnection(this._connectionStore.connection$);
    this._programStore.loadWallet(this._walletStore.anchorWallet$);
  }

  onReload() {
    this._counterStore.reload();
  }

  onInitCounter() {
    this._counterStore.initCounter();
  }

  onIncrementCounter(counterId: string) {
    this._counterStore.incrementCounter(counterId);
  }
}
