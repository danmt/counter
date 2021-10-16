import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  ConnectionStore,
  WALLET_CONFIG,
  WalletStore,
} from '@danmt/wallet-adapter-angular';
import { WalletUiModule } from '@danmt/wallet-adapter-angular-material-ui';
import { PROGRAM_CONFIGS, ProgramStore } from '@heavy-duty/ng-anchor';
import {
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getSolletWallet,
} from '@solana/wallet-adapter-wallets';
import { environment } from 'src/environments/environment';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import * as counterIdl from '../assets/json/counter.json';
import { AppComponent } from './app.component';
import { ReactiveComponentModule } from '@ngrx/component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    ReactiveComponentModule,
    WalletUiModule,
  ],
  providers: [
    {
      provide: WALLET_CONFIG,
      useValue: {
        wallets: [
          getPhantomWallet(),
          getSlopeWallet(),
          getSolletWallet(),
          getSolflareWallet(),
        ],
        autoConnect: true,
      },
    },
    {
      provide: PROGRAM_CONFIGS,
      useValue: {
        counter: {
          id: environment.counterProgramId,
          idl: counterIdl,
        },
      },
    },
    WalletStore,
    ConnectionStore,
    ProgramStore,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
